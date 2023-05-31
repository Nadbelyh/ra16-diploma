import { AsyncState } from "../../models/common";
import { Item } from "../../models/item";

export interface ItemsState extends AsyncState<Item[]> {
  data?: Item[];
}

export const ITEMS_FAIL = "ITEMS_FAIL";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEMS_SUCCESS = "ITEMS_SUCCESS";

interface ErrorItemsAction {
  type: typeof ITEMS_FAIL;
  payload: string;
}

interface RequestItemsAction {
  type: typeof ITEMS_REQUEST;
}

interface SuccessItemsAction {
  type: typeof ITEMS_SUCCESS;
  payload: Item[];
}

export type ItemsAction =
  | RequestItemsAction
  | SuccessItemsAction
  | ErrorItemsAction;
