import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

export class DefaultLayout extends React.Component {
  render() {
    return (
      <div className="default-layout">
        <div className="default-layout-div">
          {" "}
          <Header />
        </div>
        <div className="default-layout-stretch">
          <Outlet />
        </div>
        <div className="default-layout-div">
          {" "}
          <Footer />
        </div>
      </div>
    );
  }
}
