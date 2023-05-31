import * as React from "react";
import withRouter from "../../withRouter";

import { AppState } from "../../store";
import { connect } from "react-redux";
import { getItemByIdRequest } from "../../store/item/actions";
import { CartItem, Item } from "../../models/item";
import { RouteComponentProps } from "../../models/common";
import Waiter from "../../components/waiter/waiter";
import {
  addCartItemRequest,
  updateCartItemRequest,
} from "../../store/cart/actions";

interface MatchParams {
  id: number;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

interface StateFromProps {
  isFetching?: boolean;
  error?: string;
  item: Item;
  cartItems: CartItem[];
}

interface DispatchFromProps {
  getItem: (id: number) => Promise<any>;
  addCartItem: (item: CartItem) => Promise<any>;
  updateCartItem: (
    itemId: number,
    oldSize: string,
    count: number
  ) => Promise<any>;
}

interface ItemPageState {
  item: Item;
  count: number;
}

type ItemPageProps = MatchProps & StateFromProps & DispatchFromProps;

export class ItemPage extends React.Component<ItemPageProps, ItemPageState> {
  constructor(props: ItemPageProps) {
    super(props);

    this.state = {
      item: null,
      count: 1,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getItem(id).then(() => {
      this.setState({
        item: this.props.item,
      });
    });
  }

  onChangeCount = (isIncrement: boolean): void => {
    if (isIncrement) {
      if (this.state.count >= 10) return;
      this.setState({
        count: this.state.count + 1,
      });
    } else {
      if (this.state.count <= 1) return;
      this.setState({
        count: this.state.count - 1,
      });
    }
  };

  onChangeSize = (size: string): void => {
    const { item } = this.state;
    item.selectedSize = size;
    this.setState({
      item: item,
    });
  };

  onOrder = (): void => {
    const item = {
      id: this.props.item.id,
      title: this.props.item.title,
      price: this.props.item.price,
      count: this.state.count,
      total: this.state.count * this.props.item.price,
      size: this.props.item.selectedSize,
    };
    const oldItem = this.props.cartItems.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (oldItem != undefined) {
      this.props.updateCartItem(item.id, oldItem.size, item.count);
    } else {
      this.props.addCartItem(item);
    }
  };

  render() {
    const { item, isFetching } = this.props;
    const { count } = this.state;
    const sizes = item?.sizes?.filter((s) => s.available === true);
    return (
      <div style={{ padding: "20px" }}>
        <Waiter show={isFetching} />
        <div style={{ display: this.props.isFetching ? "none" : "" }}>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "40px",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            {item?.title}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={item?.images[0]}
              className="img-fluid"
              alt=""
              style={{ width: "40%", alignSelf: "flex-start" }}
            />
            <div
              style={{
                width: "60%",
              }}
            >
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item?.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item?.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item?.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item?.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item?.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item?.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "20px",
                  justifyContent: "center",
                }}
              >
                <div>Размеры в наличии: </div>
                {sizes?.map((size) => (
                  <div
                    className={
                      item?.selectedSize === size.size
                        ? "size size_active"
                        : "size"
                    }
                    onClick={() => {
                      this.onChangeSize(size.size);
                    }}
                    key={size.size}
                  >
                    {size.size}
                  </div>
                ))}
              </div>
              <div style={{ display: sizes?.length === 0 ? "none" : "" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "20px",
                    justifyContent: "center",
                  }}
                >
                  <div>Количество: </div>
                  <button
                    style={{ marginLeft: "20px" }}
                    className="countButton"
                    onClick={() => {
                      this.onChangeCount(false);
                    }}
                  >
                    -
                  </button>
                  <div className="countLable">{count}</div>
                  <button
                    className="countButton"
                    onClick={() => {
                      this.onChangeCount(true);
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  style={{ width: "100%" }}
                  disabled={item?.selectedSize === undefined ? true : false}
                  className="orderButton"
                  onClick={() => {
                    this.onOrder();
                  }}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({
  getItem: (id: number) => dispatch(getItemByIdRequest(id)),
  addCartItem: (item: CartItem) => dispatch(addCartItemRequest(item)),
  updateCartItem: (itemId: number, oldSize: string, count: number) =>
    dispatch(updateCartItemRequest(itemId, oldSize, count)),
});

const mapStateToProps = (state: AppState): StateFromProps => ({
  isFetching: state.item.isFetching,
  error: state.item.error,
  item: state.item.data,
  cartItems: state.cartItems.data,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(ItemPage));
