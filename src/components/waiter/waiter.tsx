import * as React from "react";
import "../../assets/style/waiter.scss";

interface WaiterProps {
  show: boolean;
}

export default class Waiter extends React.Component<WaiterProps> {
  render() {
    const { show } = this.props;
    return (
      <div>
        {show && (
          <div className="local-loader">
            <svg className="local-loader__icon">
              <circle cx="20" cy="20" r="18" />
            </svg>
          </div>
        )}
      </div>
    );
  }
}
