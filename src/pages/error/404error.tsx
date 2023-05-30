import * as React from "react";
import withRouter from "../../withRouter";

import { AppState } from "../../store";
import { connect } from "react-redux";
import Banner from "../../components/banner/banner";

interface StateFromProps {}

interface DispatchFromProps {}

interface ErrorState {}

type ErrorProps = StateFromProps & DispatchFromProps;

export class ErrorPage extends React.Component<ErrorProps, ErrorState> {
  constructor(props: ErrorProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner></Banner>
          </div>
          <section className="top-sales">
            <h2 className="text-center">Страница не найдена</h2>
            <p>Извините, такая страница не найдена!</p>
          </section>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({});

const mapStateToProps = (state: AppState): StateFromProps => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(ErrorPage));
