import * as React from "react";
import withRouter from "../../withRouter";

import { AppState } from "../../store";
import { connect } from "react-redux";
import { CartItem } from "../../models/item";
import Banner from "../../components/banner/banner";
import { deleteCartItemRequest } from "../../store/cart/actions";
import { isEqual } from "lodash";
import { Order, OrderItem, Owner } from "../../models/order";
import history from "../../history";
import { sendOrderRequest } from "../../store/order/actions";
import Waiter from "../../components/waiter/waiter";

interface DispatchFromProps {
  deleteCartItem?: (item: CartItem) => Promise<any>;
  sendOrder?: (order: Order) => Promise<any>;
}

interface StateFromProps {
  cartItems?: CartItem[];
  isFetching?: boolean;
  error?: string;
}

interface CartState {
  price: number;
  cartItems?: CartItem[];
  owner?: Owner;
}

type CartProps = DispatchFromProps & StateFromProps;

export class CartPage extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);

    const owner = { phone: "", address: "" };
    this.state = {
      price: this.props.cartItems.reduce((p, c) => p + c.total, 0),
      cartItems: this.props.cartItems,
      owner: owner,
    };
  }

  componentDidUpdate(prevProps: StateFromProps) {
    if (!isEqual(this.props.cartItems, prevProps.cartItems)) {
      this.setState({
        cartItems: this.props.cartItems,
        price: this.props.cartItems.reduce((p, c) => p + c.total, 0),
      });
    }
  }

  onDeleteCartItem = (item: CartItem): void => {
    this.props.deleteCartItem(item);
  };

  onOrder = async (): Promise<void> => {
    const items = [] as OrderItem[];
    for (let i = 0; i < this.state.cartItems.length; i++) {
      const item = this.state.cartItems[i];
      const newItem = {} as OrderItem;
      newItem.id = item.price;
      newItem.count = item.count;
      newItem.price = item.price;
      items.push(newItem);
    }
    const order = {} as Order;
    order.owner = this.state.owner;
    order.items = items;

    this.props.sendOrder(order);
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    const id = event.currentTarget.id;
    const { owner } = this.state;
    owner[id] = value;

    this.setState({
      owner: owner,
    });
  };

  render() {
    const { cartItems } = this.state;
    const { price } = this.state;
    return (
      <div>
        <div className="row">
          <Waiter show={this.props.isFetching} />
          <div className="col">
            <Banner></Banner>
          </div>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            {cartItems?.length ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((item, i) => (
                    <tr key={item.id}>
                      <td scope="row">{i + 1}</td>
                      <td>
                        <a href="/products/1.html">{item.title}</a>
                      </td>
                      <td>{item.size}</td>
                      <td>{item.count}</td>
                      <td>{item.price}</td>
                      <td>{item.price && item.price * item.count}</td>
                      <td>
                        <button
                          className=""
                          onClick={() => {
                            this.onDeleteCartItem(item);
                          }}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-right">
                      Общая стоимость
                    </td>
                    <td>{price}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <>
                <h1>У вас нет покупок</h1>
                <button
                  style={{ width: "200px" }}
                  onClick={() => {
                    history.push(`/catalog`);
                  }}
                >
                  Вернуться в католог
                </button>
              </>
            )}
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div
              className="card"
              style={{ maxWidth: "30rem", margin: "0 auto" }}
            >
              <form className="card-body">
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    value={this.state.owner?.phone}
                    onChange={this.onChangeInput}
                    id="phone"
                    placeholder="Ваш телефон"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    value={this.state.owner?.address}
                    id="address"
                    onChange={this.onChangeInput}
                    placeholder="Адрес доставки"
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    Согласен с правилами доставки
                  </label>
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    this.onOrder();
                  }}
                >
                  Оформить
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({
  deleteCartItem: (item: CartItem) => dispatch(deleteCartItemRequest(item)),
  sendOrder: (order: Order) => dispatch(sendOrderRequest(order)),
});

const mapStateToProps = (state: AppState): StateFromProps => ({
  cartItems: state.cartItems.data,
  isFetching: state.order.isFetching,
  error: state.order.error,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(CartPage));
