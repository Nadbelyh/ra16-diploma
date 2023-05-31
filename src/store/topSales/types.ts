import { AsyncState } from "../../models/common";
import { Item } from "../../models/item";

export interface TopSalesState extends AsyncState<Item[]> {
  data?: Item[];
}

export const TOP_SALES_FAIL = "TOP_SALES_FAIL";
export const TOP_SALES_REQUEST = "TOP_SALES_REQUEST";
export const TOP_SALES_SUCCESS = "TOP_SALES_SUCCESS";

interface ErrorTopSalesAction {
  type: typeof TOP_SALES_FAIL;
  payload: string;
}

interface RequestTopSalesAction {
  type: typeof TOP_SALES_REQUEST;
}

interface SuccessTopSalesAction {
  type: typeof TOP_SALES_SUCCESS;
  payload: Item[];
}

export type TopSalesAction =
  | RequestTopSalesAction
  | SuccessTopSalesAction
  | ErrorTopSalesAction;
