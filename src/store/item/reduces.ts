import {
  ItemState,
  ItemAction,
  ITEM_FAIL,
  ITEM_REQUEST,
  ITEM_SUCCESS,
  ITEM_CLEAR,
} from "./types";

const initialState: ItemState = {
  isFetching: false,
  data: undefined,
  error: undefined,
};

export default function ItemReducer(
  state: ItemState = initialState,
  action: ItemAction
): ItemState {
  switch (action.type) {
    case ITEM_FAIL:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case ITEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: null,
      };
    case ITEM_CLEAR:
      return {
        ...state,
        isFetching: false,
        data: undefined,
      };
    default:
      return state;
  }
}
