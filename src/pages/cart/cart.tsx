import * as React from "react";
import withRouter from "../../withRouter";

import { AppState } from "../../store";
import { connect } from "react-redux";
import { Item } from "../../models/item";
import Banner from "../../components/banner/banner";

interface StateFromProps {
  items?: Item[];
}

interface DispatchFromProps {}

interface CartState {
  price: number;
}

type CartProps = StateFromProps & DispatchFromProps;

export class CartPage extends React.Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);

    this.state = {
      price: 0,
    };
  }

  render() {
    const { items } = this.props;
    const { price } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col">
            <Banner></Banner>
          </div>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            {items?.length ? (
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
                  {items.map((item, i) => (
                    <tr key={item.id}>
                      <td scope="row">{i + 1}</td>
                      <td>
                        <a href="/products/1.html">{item.title}</a>
                      </td>
                      <td>{item.selectedSize}</td>
                      <td>{item.count}</td>
                      <td>{item.price}</td>
                      <td>{item.price && item.price * item.count}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          // onClick={() => {
                          //   deleteHandle(item.id, item.sizes);
                          // }}
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
                  className="btn btn-danger btn-block btn-lg"
                  // onClick={() => {
                  //   navigate("/catalog");
                  // }}
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
                    id="phone"
                    placeholder="Ваш телефон"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
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
                <button type="submit" className="btn btn-outline-secondary">
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

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({});

const mapStateToProps = (state: AppState): StateFromProps => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(CartPage));
