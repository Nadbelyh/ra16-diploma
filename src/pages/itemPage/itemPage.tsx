import * as React from "react";
import withRouter from "../../withRouter";

import { AppState } from "../../store";
import { connect } from "react-redux";
import { getItemByIdRequest } from "../../store/item/actions";
import { Item } from "../../models/item";
import { RouteComponentProps } from "../../models/common";
import Waiter from "../../components/waiter/waiter";

interface MatchParams {
  id: number;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

interface StateFromProps {
  isFetching?: boolean;
  error?: string;
  item: Item;
}

interface DispatchFromProps {
  getItem: (id: number) => Promise<any>;
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
    this.props.getItem(id);
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

  render() {
    const { item, isFetching } = this.props;
    const { count } = this.state;
    const sizes = item?.sizes?.filter((s) => s.available === true);
    return (
      <div>
        <div className="row">
          <Waiter show={isFetching} />
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "40px",
            fontWeight: 600,
          }}
        >
          {item?.title}
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={item?.images[0]}
            className="img-fluid"
            alt=""
            style={{ width: "30%" }}
          />
          <div style={{ width: "40%" }}>
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
              }}
            >
              <div>Размеры в наличии: </div>
              {sizes?.map((size) => (
                <div key={size.size}>{size.size}</div>
              ))}
            </div>
            <div style={{ display: sizes?.length === 0 ? "none" : "" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <div>Количество: </div>
                <button
                  style={{ width: "30px" }}
                  onClick={() => {
                    this.onChangeCount(false);
                  }}
                >
                  -
                </button>
                <div>{count}</div>
                <button
                  style={{ width: "30px" }}
                  onClick={() => {
                    this.onChangeCount(true);
                  }}
                >
                  +
                </button>
              </div>
              <button style={{ width: "100%" }}>В корзину</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({
  getItem: (id: number) => dispatch(getItemByIdRequest(id)),
});

const mapStateToProps = (state: AppState): StateFromProps => ({
  isFetching: state.item.isFetching,
  error: state.item.error,
  item: state.item.data,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(ItemPage));
