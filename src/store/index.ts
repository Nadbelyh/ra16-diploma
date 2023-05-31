import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import topSalesReducer from "./topSales/reduces";
import itemReducer from "./item/reduces";
import itemsReducer from "./items/reduces";
import cartReducer from "./cart/reduces";
import orderReducer from "./order/reduces";

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  item: itemReducer,
  cartItems: cartReducer,
  items: itemsReducer,
  order: orderReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = (initialState?: AppState) => {
  const middlewares = [thunkMiddleware];
  const preloadedState = composeWithDevTools(applyMiddleware(...middlewares));
  return createStore(rootReducer, initialState, preloadedState);
};

export const store = configureStore();
