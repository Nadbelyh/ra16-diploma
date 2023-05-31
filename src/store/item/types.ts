import { AsyncState } from "../../models/common";
import { Item } from "../../models/item";

export interface ItemState extends AsyncState<Item> {
  data?: Item;
}

export const ITEM_FAIL = "ITEM_FAIL";
export const ITEM_REQUEST = "ITEM_REQUEST";
export const ITEM_SUCCESS = "ITEM_SUCCESS";
export const ITEM_ADD = "ITEM_ADD";

interface ErrorItemAction {
  type: typeof ITEM_FAIL;
  payload: string;
}

interface RequestItemAction {
  type: typeof ITEM_REQUEST;
}

interface SuccessItemAction {
  type: typeof ITEM_SUCCESS;
  payload: Item;
}

export type ItemAction =
  | RequestItemAction
  | SuccessItemAction
  | ErrorItemAction;
