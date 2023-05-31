import * as React from "react";
import Catalog from "../catalog/catalog";
import TopSales from "../../components/topSales/topSales";
import Banner from "../../components/banner/banner";

export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <Banner></Banner>
            <section className="top-sales">
              <h2 className="text-center">Хиты продаж!</h2>
              <TopSales></TopSales>
            </section>
            <section className="top-sales">
              <h2 className="text-center">Каталог</h2>
              <Catalog></Catalog>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
