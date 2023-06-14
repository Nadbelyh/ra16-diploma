import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppState } from "../store";
import { connect } from "react-redux";
import "../assets/style/menu.scss";
import { CartItem } from "../models/item";
import { isEqual } from "lodash";
import history from "../history";

interface StateFromProps {
  cartItems: CartItem[];
}

interface HeaderState {
  cartCount: number;
  isDisplayInput: boolean;
  inputText: string;
}

export class Header extends React.Component<StateFromProps, HeaderState> {
  constructor(props: StateFromProps) {
    super(props);

    let cart = JSON.parse(localStorage.getItem("cart") as string);
    if (cart === null) cart = [];
    this.state = {
      cartCount: cart.length,
      isDisplayInput: false,
      inputText: null,
    };
  }

  componentDidUpdate(prevProps: StateFromProps) {
    if (!isEqual(this.props.cartItems, prevProps.cartItems)) {
      this.setState({
        cartCount: this.props.cartItems.length,
      });
    }
  }

  onClickSearch = (): void => {
    if (this.state.isDisplayInput === true && this.state.inputText !== null) {
      history.push({
        pathname: "/catalog",
        search:
          "?" +
          new URLSearchParams({
            inputText: this.state.inputText,
          }).toString(),
      });
    }
    this.setState({
      isDisplayInput: !this.state.isDisplayInput,
      inputText: this.state.isDisplayInput ? "" : this.state.inputText,
    });
  };

  getStyle = (props: { isActive: boolean }): string | undefined => {
    return props.isActive ? "tabs__menu__link active" : "tabs__menu__link";
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      inputText: event.currentTarget.value,
    });
  };

  render() {
    return (
      <div className="header">
        <ul id="slide-out" className="menu">
          <li>
            <div
              className="logo"
              onClick={() => {
                history.push(`/`);
              }}
            />
          </li>

          <li>
            <NavLink to="/" className={this.getStyle}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to="/catalog" className={this.getStyle}>
              Каталог
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={this.getStyle}>
              О магазине
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" className={this.getStyle}>
              Контакты
            </NavLink>
          </li>
        </ul>
        <div className="search-container">
          {this.state.isDisplayInput && (
            <input
              className="searchInput"
              value={this.state.inputText}
              onChange={this.onChangeInput}
              placeholder="Поиск"
            />
          )}
          <div
            className="search"
            onClick={() => {
              this.onClickSearch();
            }}
          />
        </div>
        <NavLink to="/cart">
          <div className="cartImage" />
          {this.state.cartCount !== 0 && (
            <div className="cartCount">{this.state.cartCount}</div>
          )}
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  cartItems: state.cartItems.data,
});

const connector = connect(mapStateToProps);
export default connector(Header);
