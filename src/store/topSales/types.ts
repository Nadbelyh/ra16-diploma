import { AsyncState } from "../../models/common";
import { Item } from "../../models/item";

export interface ItemState extends AsyncState<Item[]> {
  data?: Item[];
}

export const ITEMS_FAIL = "ITEMS_FAIL";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEMS_SUCCESS = "ITEMS_SUCCESS";

interface ErrorItemAction {
  type: typeof ITEMS_FAIL;
  payload: string;
}

interface RequestItemAction {
  type: typeof ITEMS_REQUEST;
}

interface SuccessItemAction {
  type: typeof ITEMS_SUCCESS;
  payload: Item[];
}

export type ItemAction =
  | RequestItemAction
  | SuccessItemAction
  | ErrorItemAction;
