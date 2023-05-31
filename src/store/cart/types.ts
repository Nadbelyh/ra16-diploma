import { AsyncState } from "../../models/common";
import { CartItem } from "../../models/item";

export interface CartState extends AsyncState<CartItem[]> {
  data?: CartItem[];
}

export const CART_ITEM_ADD = "CART_ITEM_ADD";
export const CART_ITEM_DELETE = "CART_ITEM_DELETE";
export const CART_ITEM_UPDATE = "CART_ITEM_UPDATE";

interface AddCartItemAction {
  type: typeof CART_ITEM_ADD;
  payload: CartItem;
}

interface DeleteCartItemAction {
  type: typeof CART_ITEM_DELETE;
  payload: CartItem;
}

interface UpdateCartItemAction {
  type: typeof CART_ITEM_UPDATE;
  payload: [number, string, number];
}

export type CartAction =
  | AddCartItemAction
  | DeleteCartItemAction
  | UpdateCartItemAction;
