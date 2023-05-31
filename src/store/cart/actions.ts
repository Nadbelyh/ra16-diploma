import { Dispatch } from "react";
import { CartItem } from "../../models/item";
import {
  CART_ITEM_ADD,
  CART_ITEM_DELETE,
  CART_ITEM_UPDATE,
  CartAction,
} from "./types";

export function addCartItemRequest(item: CartItem) {
  return (dispatch: Dispatch<CartAction>): void => {
    dispatch({
      type: CART_ITEM_ADD,
      payload: item,
    });
  };
}

export function deleteCartItemRequest(item: CartItem) {
  return (dispatch: Dispatch<CartAction>): void => {
    dispatch({
      type: CART_ITEM_DELETE,
      payload: item,
    });
  };
}

export function updateCartItemRequest(
  itemId: number,
  oldSize: string,
  count: number
) {
  return (dispatch: Dispatch<CartAction>): void => {
    dispatch({
      type: CART_ITEM_UPDATE,
      payload: [itemId, oldSize, count],
    });
  };
}
