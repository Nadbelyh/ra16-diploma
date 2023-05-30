import * as React from "react";
import { connect } from "react-redux";

import { Item } from "../../models/item";
import { AppState } from "../../store";
import "../../assets/style/itemCard.scss";
import history from "../../history";

interface ItemCardProps {
  item: Item;
}

interface ItemCardState {
  image?: string;
}

interface StateFromProps {
  isFetching?: boolean;
  error?: string;
}

interface DispatchFromProps {
  order?: (id: number) => Promise<any>;
}

type ObjectProps = ItemCardProps & StateFromProps & DispatchFromProps;

export class ItemCard extends React.Component<ObjectProps, ItemCardState> {
  constructor(props: ObjectProps) {
    super(props);
    this.state = {
      image: undefined,
    };
  }

  // componentDidMount() {}

  goItemPage = (id: number): void => {
    //this.props.order(id);
    history.push(`/catalog/${id}`);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="itemCard">
        <img src={item?.images[0]} className="image"></img>
        <div>{item.title}</div>
        <div>{`${item.price} руб.`}</div>
        <button
          onClick={() => {
            this.goItemPage(item.id);
          }}
        >
          Заказать
        </button>
        {/* <NavLink to={`catalog/${item.id}`} className="button">
          Заказать
        </NavLink> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch): DispatchFromProps => ({});

const mapStateToProps = (state: AppState): StateFromProps => ({
  //   isFetching: state.objectList.isFetching || state.reports.isFetching,
  //   error: state.objectList.error || state.reports.error,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(ItemCard);
