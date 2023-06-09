import * as React from "react";
import withRouter from "../../withRouter";

import "../../assets/style/catalog.scss";
import { AppState } from "../../store";
import { connect } from "react-redux";
import api from "../../api";
import { Category } from "../../models/category";
import { CartItem, Item } from "../../models/item";
import ItemCard from "../../components/itemCard/itemCard";
import { getItemsRequest } from "../../store/items/actions";
import Waiter from "../../components/waiter/waiter";

interface StateFromProps {
  items: Item[];
  cartItems: CartItem[];
  isFetching?: boolean;
  error?: string;
}

interface CatalogProp {
  isDisplayInput: boolean;
}

interface DispatchFromProps {
  getItems: (param: string) => Promise<any>;
}

interface CatalogState {
  categories: Category[];
  items: Item[];
  selectCategoryId: number;
  inputText: string;
  isDisplayOffsetButton: boolean;
}

type CatalogProps = StateFromProps & DispatchFromProps & CatalogProp;

export class CatalogPage extends React.Component<CatalogProps, CatalogState> {
  constructor(props: CatalogProps) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const inputText = params.get("inputText");

    this.state = {
      categories: [],
      items: [],
      selectCategoryId: 0,
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
      });
    });
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

  keyEvent = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      this.getItems();
    }
  };

  onChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    this.setState({
      inputText: value,
    });
  };

  render() {
    return (
      <div>
        <Waiter show={this.props.isFetching} />
        {!this.props.isFetching && (
          <div className="catalog">
            {this.props.isDisplayInput && (
              <input
                className="searchCatalogInput"
                placeholder="Поиск"
                onChange={this.onChangeInput}
                onKeyDown={this.keyEvent}
                value={this.state.inputText}
              />
            )}
            <div className="filter">
              {this.state.categories?.map((category) => (
                <div
                  key={category.id}
                  className={
                    category.isSelected ? "category active" : "category"
                  }
                  onClick={() => this.selectCategory(category.id)}
                >
                  {category.title}
                </div>
              ))}
            </div>
            {this.state.items?.length === 0 && (
              <div className="empty__info">Ничего не найдено</div>
            )}
            <div className="items">
              {this.state.items?.map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
            </div>
            {this.state.isDisplayOffsetButton && (
              <button
                className="back-button"
                onClick={() => {
                  this.getOffset();
                }}
              >
                Загрузить еще
              </button>
            )}
          </div>
        )}
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
