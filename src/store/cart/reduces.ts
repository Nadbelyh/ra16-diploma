import {
  CartState,
  CartAction,
  CART_ITEM_ADD,
  CART_ITEM_DELETE,
  CART_ITEM_UPDATE,
} from "./types";

const initialState: CartState = {
  data: [],
  isFetching: false,
};

export default function cartReducer(
  state: CartState = initialState,
  action: CartAction
): CartState {
  switch (action.type) {
    case CART_ITEM_ADD:
      // eslint-disable-next-line no-case-declarations
      const items = [];
      items.push(action.payload);
      return {
        ...state,
        data: [...state.data, ...items],
      };
    case CART_ITEM_DELETE:
      return {
        ...state,
        data: state.data.filter((i) => action.payload !== i),
      };
    case CART_ITEM_UPDATE:
      return {
        ...state,
        data: state.data?.map((i) => {
          if (action.payload[0] === i.id && action.payload[1] === i.size) {
            const item = i;
            item.count = item.count + action.payload[2];
            return item;
          }
          return i;
        }),
      };
    default:
      return state;
  }
}
