import * as React from "react";
import withRouter from "../../withRouter";

import "../../assets/style/catalog.scss";
import { AppState } from "../../store";
import { connect } from "react-redux";
import { Item } from "../../models/item";
import ItemCard from "../../components/itemCard/itemCard";
import { getTopSalesRequest } from "../../store/topSales/actions";
import Waiter from "../waiter/waiter";

interface StateFromProps {
  isFetching?: boolean;
  error?: string;
  items: Item[];
}

interface DispatchFromProps {
  getTopSales: () => Promise<any>;
}

interface TopSalesState {
  items: Item[];
}

type TopSalesProps = StateFromProps & DispatchFromProps;

export class TopSalesPage extends React.Component<
  TopSalesProps,
  TopSalesState
> {
  constructor(props: TopSalesProps) {
    super(props);

    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    if (this.props.items === undefined) {
      this.props.getTopSales().then(() => {
        this.setState({
          items: this.props.items,
        });
      });
    } else {
      this.setState({
        items: this.props.items,
      });
    }
  }

  render() {
    const { isFetching } = this.props;
    const { items } = this.state;
    return (
      <div>
        <Waiter show={isFetching} />
        <div
          className="topSales"
          style={{ display: this.props.isFetching ? "none" : "" }}
        >
          <div className="items">
            {items?.map((item) => (
              <ItemCard item={item} key={item.id}></ItemCard>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({
  getTopSales: () => dispatch(getTopSalesRequest()),
});

const mapStateToProps = (state: AppState): StateFromProps => ({
  isFetching: state.topSales.isFetching,
  error: state.topSales.error,
  items: state.topSales.data,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(TopSalesPage));
