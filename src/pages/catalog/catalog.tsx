import * as React from "react";
import withRouter from "../../withRouter";

import "../../assets/style/catalog.scss";
import { AppState } from "../../store";
import { connect } from "react-redux";
import api from "../../api";
import { Category } from "../../models/category";
import { Item } from "../../models/item";
import { ItemCard } from "../../components/itemCard/itemCard";

interface StateFromProps {}

interface DispatchFromProps {}

interface CatalogState {
  categories: Category[];
  items: Item[];
  selectCategoryId: number;
}

type CatalogProps = StateFromProps & DispatchFromProps;

export class CatalogPage extends React.Component<CatalogProps, CatalogState> {
  constructor(props: CatalogProps) {
    super(props);

    this.state = {
      categories: [],
      items: [],
      selectCategoryId: 0,
    };
  }

  componentDidMount() {
    const categories = [];
    const items = [];
    api.getCategories().then((response) => {
      categories.push({ id: 0, title: "Все", isSelected: true });
      for (let i = 0; i < response.data.length; i++) {
        categories.push(response.data[i]);
      }
      this.setState({
        categories: categories,
        items: items,
      });
    });

    api.getItems().then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        items.push(response.data[i]);
      }
      this.setState({
        categories: categories,
        items: items,
      });
    });
  }

  selectCategory = (id: number): void => {
    const { categories } = this.state;
    const newCategories = categories.map((i) => {
      if (i.id === id) {
        return { ...i, isSelected: true };
      }
      return { ...i, isSelected: false };
    });

    const items = [];
    api.getItemsByCategoryId(id).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        items.push(response.data[i]);
      }
      this.setState({
        selectCategoryId: id,
        categories: newCategories,
        items: items,
      });
    });
  };

  render() {
    return (
      <div>
        <div className="catalog">
          <div className="filter">
            {this.state.categories.map((category) => (
              <div
                key={category.id}
                className={category.isSelected ? "category active" : "category"}
                onClick={() => this.selectCategory(category.id)}
              >
                {category.title}
              </div>
            ))}
          </div>
          <div className="items">
            {this.state.items.map((item) => (
              <ItemCard item={item} key={item.id}></ItemCard>
            ))}
          </div>
          <button
            style={{ width: "200px" }}
            onClick={() => {
              // this.orderItem(item.id);
            }}
          >
            Загрузить еще
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({});

const mapStateToProps = (state: AppState): StateFromProps => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(CatalogPage));
