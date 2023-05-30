import * as React from "react";
import { NavLink } from "react-router-dom";
import { AppState } from "../store";
import { connect } from "react-redux";
import "../assets/style/footer.scss";

export class Footer extends React.Component {
  getStyle = (props: { isActive: boolean }): string | undefined => {
    return props.isActive ? "tabs__menu__link active" : "tabs__menu__link";
  };

  render() {
    return (
      <div className="footer">
        <div className="info">
          <div className="label">Информация</div>
          <ul id="slide-out" className="footer_menu">
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
              <NavLink to="/contacts" className={this.getStyle}>
                Контакты
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="pay">
          <div className="label">Принимаем к оплате</div>
          <div className="footer_sprite"></div>
          <div>
            2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
            аксессуаров. Все права защищены.Доставка по всей России!
          </div>
        </div>
        <div className="contacts">
          <div className="label">Контакты</div>
          <div className="footer_sprite"></div>
          <a className="footer-contacts-phone" href="tel:+7-495-790-35-03">
            +7 495 79 03 5 03
          </a>
          <div>Ежедневно: с 09-00 до 21-00</div>
          <a className="footer-contacts-email" href="mailto:office@bosanoga.ru">
            office@bosanoga.ru
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const connector = connect(mapStateToProps);
export default connector(Footer);
