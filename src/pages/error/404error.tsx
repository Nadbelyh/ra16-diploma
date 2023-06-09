import * as React from "react";
import Banner from "../../components/banner/banner";

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <Banner />
          </div>
          <section className="top-sales">
            <h2 className="text-center">Страница не найдена</h2>
            <p>Извините, такая страница не найдена!</p>
          </section>
        </div>
      </div>
    );
  }
}
