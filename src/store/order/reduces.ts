import {
  OrderState,
  OrderAction,
  ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from "./types";

const initialState: OrderState = {
  isFetching: false,
  data: undefined,
  error: undefined,
};

export default function OrderReducer(
  state: OrderState = initialState,
  action: OrderAction
): OrderState {
  switch (action.type) {
    case ORDER_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: null,
      };
    default:
      return state;
  }
}
