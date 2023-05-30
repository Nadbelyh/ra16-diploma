import * as React from "react";

export default class BannerPage extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div className="row">
          <div className="col">
            <div className="banner">
              <img
                src="./img/banner.jpg"
                className="img-fluid"
                alt="К весне готовы!"
              ></img>
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
