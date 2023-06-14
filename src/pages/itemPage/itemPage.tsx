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
import { isEqual } from "lodash";

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
    let cart = JSON.parse(localStorage.getItem("cart") as string);
    if (cart === null) cart = [];
    this.state = {
      item: null,
      count: 1,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    let cart = JSON.parse(localStorage.getItem("cart") as string);
    if (cart === null) cart = [];
    if (this.props.cartItems.length === 0) {
      for (let i = 0; i < cart.length; i++) {
        this.props.addCartItem(cart[i]);
      }
    }

    this.props.getItem(id).then(() => {
      this.setState({
        item: this.props.item,
      });
    });
  }

  componentDidUpdate(prevProps: ItemPageProps) {
    if (!isEqual(this.props.cartItems, prevProps.cartItems)) {
      localStorage.setItem("cart", JSON.stringify(this.props.cartItems));
    }
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
      <div className="item-page__container">
        <Waiter show={isFetching} />
        {!this.props.isFetching && (
          <div>
            <div className="item-page__title">{item?.title}</div>
            <div className="item-page__info">
              <img
                src={item?.images[0]}
                className="item-page__img-fluid"
                alt=""
              />
              <div className="item-page__table">
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
                <div className="item-page__sizes">
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
                {sizes?.length !== 0 && (
                  <div>
                    <div className="item-page__count">
                      <div>Количество: </div>
                      <button
                        className="countButton first"
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
                      disabled={item?.selectedSize === undefined ? true : false}
                      className="orderButton"
                      onClick={() => {
                        this.onOrder();
                      }}
                    >
                      В корзину
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
