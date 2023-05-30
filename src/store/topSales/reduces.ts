import {
  ItemState,
  ItemAction,
  ITEMS_SUCCESS,
  ITEMS_REQUEST,
  ITEMS_FAIL,
} from "./types";

const initialState: ItemState = {
  isFetching: false,
  data: undefined,
  error: undefined,
};

export default function topSalesReducer(
  state: ItemState = initialState,
  action: ItemAction
): ItemState {
  switch (action.type) {
    case ITEMS_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ITEMS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ITEMS_SUCCESS:
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
