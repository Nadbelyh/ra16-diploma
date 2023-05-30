import Routes from "./routers";
// tslint:disable-next-line:no-submodule-imports
import "materialize-css/dist/css/materialize.min.css";
import "./assets/style/app.scss";
import M from "materialize-css";

import {
  BrowserRouter,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import history from "./history";
import { connect } from "react-redux";
import { AppState } from "./store";
import React from "react";
M.AutoInit();

interface StateFromProps {
  isFetching?: boolean;
  error?: string;
}

interface DispatchFromProps {}

type AppProps = StateFromProps & DispatchFromProps;

class App extends React.Component<AppProps> {
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      <HistoryRouter history={history}>
        <main>
          <Routes />
        </main>
      </HistoryRouter>
    );
  }
}

const mapStateToProps = (state: AppState): StateFromProps => ({
  // isFetching: state.userSelf.isFetching,
  // error: state.userSelf.error,
});

const connector = connect(mapStateToProps);

export default connector(App);
