import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppState } from "../store";
import { connect } from "react-redux";
import "../assets/style/menu.scss";

interface StateFromProps {}

interface HeaderState {
  cartCount: number;
}

export class Header extends React.Component<StateFromProps, HeaderState> {
  constructor(props: StateFromProps) {
    super(props);

    this.state = {
      cartCount: 0,
    };
  }
  getStyle = (props: { isActive: boolean }): string | undefined => {
    return props.isActive ? "tabs__menu__link active" : "tabs__menu__link";
  };

  render() {
    return (
      <div className="header">
        <ul id="slide-out" className="menu">
          <li>
            <div className="logo"></div>
          </li>
          <li style={{ marginBottom: "20px" }}></li>

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
        <div className="search"></div>
        <NavLink to="/cart">
          <div className="cartImage"></div>
          <div className="cartCount">{this.state.cartCount}</div>
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const connector = connect(mapStateToProps);
export default connector(Header);
