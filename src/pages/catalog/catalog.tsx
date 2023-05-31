import * as React from "react";
import withRouter from "../../withRouter";

import "../../assets/style/catalog.scss";
import { AppState } from "../../store";
import { connect } from "react-redux";
import api from "../../api";
import { Category } from "../../models/category";
import { CartItem, Item } from "../../models/item";
import ItemCard from "../../components/itemCard/itemCard";
import { isEqual } from "lodash";
import { getItemsRequest } from "../../store/items/actions";
import Waiter from "../../components/waiter/waiter";

interface StateFromProps {
  items: Item[];
  cartItems: CartItem[];
  isFetching?: boolean;
  error?: string;
}

interface DispatchFromProps {
  getItems: (param: string) => Promise<any>;
}

interface CatalogState {
  categories: Category[];
  items: Item[];
  selectCategoryId: number;
  isDisplayInput: boolean;
  inputText: string;
  isDisplayOffsetButton: boolean;
}

type CatalogProps = StateFromProps & DispatchFromProps;

export class CatalogPage extends React.Component<CatalogProps, CatalogState> {
  constructor(props: CatalogProps) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const inputText = params.get("inputText");

    this.state = {
      categories: [],
      items: [],
      selectCategoryId: 0,
      isDisplayInput: inputText !== "",
      inputText: inputText,
      isDisplayOffsetButton: true,
    };
  }

  componentDidMount() {
    const categories = [];
    api.getCategories().then((response) => {
      categories.push({ id: 0, title: "Все", isSelected: true });
      for (let i = 0; i < response.data.length; i++) {
        categories.push(response.data[i]);
      }
      this.setState({
        categories: categories,
      });
    });

    const inputText = this.state.inputText;

    const param =
      inputText !== "" && inputText !== null ? `q=${this.state.inputText}` : "";
    this.props.getItems(param).then(() => {
      this.setState({
        items: this.props.items,
        isDisplayInput: param !== "",
      });
    });
  }

  componentDidUpdate(prevProps: CatalogProps) {
    if (!isEqual(this.props, prevProps)) {
      const params = new URLSearchParams(window.location.search);
      const inputText = params.get("inputText");
      if (inputText !== this.state.inputText) {
        this.setState(
          {
            items: this.props.items,
            inputText: inputText,
          },
          () => {
            this.getItems();
          }
        );
      }
    }
  }

  selectCategory = (id: number): void => {
    const { categories } = this.state;
    const newCategories = categories?.map((i) => {
      if (i.id === id) {
        return { ...i, isSelected: true };
      }
      return { ...i, isSelected: false };
    });

    this.setState(
      {
        categories: newCategories,
        selectCategoryId: id,
      },
      () => {
        this.getItems();
      }
    );
  };

  getItems = (): void => {
    let param: string;
    if (this.state.selectCategoryId === 0) {
      param =
        this.state.inputText !== "" && this.state.inputText !== null
          ? `q=${this.state.inputText}`
          : ``;
    } else {
      param =
        this.state.inputText !== "" && this.state.inputText !== null
          ? `categoryId=${this.state.selectCategoryId}&q=${this.state.inputText}`
          : `categoryId=${this.state.selectCategoryId}`;
    }
    this.props.getItems(param).then(() => {
      this.setState({
        items: this.props.items,
        isDisplayOffsetButton: this.props.items.length >= 6,
      });
    });
  };

  getOffset = (): void => {
    let param: string;
    const offset = Math.round(this.state.items.length / 6) * 6;
    if (this.state.selectCategoryId === 0) {
      param =
        this.state.inputText !== "" && this.state.inputText !== null
          ? `offset=${offset}&q=${this.state.inputText}`
          : `offset=${offset}`;
    } else {
      param =
        this.state.inputText !== "" && this.state.inputText !== null
          ? `categoryId=${this.state.selectCategoryId}&offset=${offset}&q=${this.state.inputText}`
          : `categoryId=${this.state.selectCategoryId}&offset=${offset}`;
    }
    this.props.getItems(param).then(() => {
      if (this.props.items.length === 0 || this.props.items.length < 6) {
        this.setState({
          isDisplayOffsetButton: false,
        });
      }
      const { items } = this.state;
      for (let i = 0; i < this.props.items.length; i++) {
        items.push(this.props.items[i]);
      }
      this.setState({
        items: items,
      });
    });
  };

  render() {
    return (
      <div>
        <Waiter show={this.props.isFetching} />
        <div
          className="catalog"
          style={{ display: this.props.isFetching ? "none" : "" }}
        >
          <input
            className="searchCatalogInput"
            readOnly={true}
            placeholder="Поиск"
            value={this.state.inputText}
            style={{
              display: this.state.isDisplayInput ? "" : "none",
            }}
          ></input>
          <div className="filter">
            {this.state.categories?.map((category) => (
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
            {this.state.items?.map((item, index) => (
              <ItemCard item={item} key={index}></ItemCard>
            ))}
          </div>
          <button
            style={{
              width: "200px",
              display: this.state.isDisplayOffsetButton ? "" : "none",
            }}
            onClick={() => {
              this.getOffset();
            }}
          >
            Загрузить еще
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): DispatchFromProps => ({
  getItems: (param: string) => dispatch(getItemsRequest(param)),
});

const mapStateToProps = (state: AppState): StateFromProps => ({
  isFetching: state.items.isFetching,
  error: state.items.error,
  cartItems: state.cartItems.data,
  items: state.items.data,
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withRouter(connector(CatalogPage));
