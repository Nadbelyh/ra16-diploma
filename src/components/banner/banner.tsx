import * as React from "react";

export default class BannerPage extends React.Component {
  render() {
    return (
      <div className="banner-container">
        <div className="row">
          <div className="banner">
            <img
              src="./img/banner.jpg"
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
        </div>
      </div>
    );
  }
}
