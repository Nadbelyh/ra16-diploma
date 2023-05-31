import {
  TopSalesState,
  TopSalesAction,
  TOP_SALES_SUCCESS,
  TOP_SALES_REQUEST,
  TOP_SALES_FAIL,
} from "./types";

const initialState: TopSalesState = {
  isFetching: false,
  data: undefined,
  error: undefined,
};

export default function topSalesReducer(
  state: TopSalesState = initialState,
  action: TopSalesAction
): TopSalesState {
  switch (action.type) {
    case TOP_SALES_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case TOP_SALES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case TOP_SALES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: undefined,
      };
    default:
      return state;
  }
}
