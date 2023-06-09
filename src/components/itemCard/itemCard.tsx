import * as React from "react";

import { Item } from "../../models/item";
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

type ObjectProps = ItemCardProps & StateFromProps;

export default class ItemCard extends React.Component<
  ObjectProps,
  ItemCardState
> {
  constructor(props: ObjectProps) {
    super(props);
    this.state = {
      image: undefined,
    };
  }

  goItemPage = (id: number): void => {
    history.push(`/catalog/${id}`);
  };

  render() {
    const { item } = this.props;
    return (
      <div className="item-card">
        <img src={item?.images[0]} className="image" />
        <div className="item-card__title">{item.title}</div>
        <div className="item-card__title">{`${item.price} руб.`}</div>
        <button
          className="item-card__button"
          onClick={() => {
            this.goItemPage(item.id);
          }}
        >
          Заказать
        </button>
      </div>
    );
  }
}
