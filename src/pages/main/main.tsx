import * as React from "react";
import withRouter from "../../withRouter";

//import "../../assets/style/events.scss";
import { AppState } from "../../store";
import { connect } from "react-redux";
import Catalog from "../catalog/catalog";
import TopSales from "../../components/topSales/topSales";
import Banner from "../../components/banner/banner";

interface StateFromProps {}

interface DispatchFromProps {}

interface MainState {}

type MainProps = StateFromProps & DispatchFromProps;

export class MainPage extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
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
              <h2 className="text-center">Хиты продаж</h2>
              <TopSales></TopSales>
            </section>
            <section className="top-sales">
              <h2 className="text-center">Каталог</h2>
              <Catalog></Catalog>
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
export default withRouter(connector(MainPage));
