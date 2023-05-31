import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";

export class DefaultLayout extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ flexGrow: "0" }}>
          {" "}
          <Header />
        </div>
        <div style={{ flexGrow: "1" }}>
          <Outlet />
        </div>
        <div style={{ flexGrow: "0" }}>
          {" "}
          <Footer />
        </div>
      </div>
    );
  }
}
