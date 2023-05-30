import * as React from "react";
import withRouter from "../../withRouter";

//import "../../assets/style/events.scss";
import { AppState } from "../../store";
import { connect } from "react-redux";
import Banner from "../../components/banner/banner";

interface StateFromProps {}

interface DispatchFromProps {}

interface ContactsState {}

type ContactsProps = StateFromProps & DispatchFromProps;

export class ContactsPage extends React.Component<
  ContactsProps,
  ContactsState
> {
  constructor(props: ContactsProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner></Banner>
            <section className="top-sales">
              <h2 className="text-center">Контакты</h2>
              <p>
                Наш головной офис расположен в г.Москва, по адресу: Варшавское
                шоссе, д. 17, бизнес-центр W Plaza.
              </p>
              <h5 className="text-center">Координаты для связи:</h5>
              <p>
                Телефон: <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>{" "}
                (ежедневно: с 09-00 до 21-00)
              </p>
              <p>
                Email:{" "}
                <a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({});

const mapStateToProps = (state: AppState): StateFromProps => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(ContactsPage));
