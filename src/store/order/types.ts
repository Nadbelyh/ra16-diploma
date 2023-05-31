import { AsyncState } from "../../models/common";

export interface OrderState extends AsyncState<string> {
  data?: string;
}

export const ORDER_FAIL = "ORDER_FAIL";
export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_SUCCESS = "ORDER_SUCCESS";

interface ErrorOrderAction {
  type: typeof ORDER_FAIL;
  payload: string;
}

interface RequestOrderAction {
  type: typeof ORDER_REQUEST;
}

interface SuccessOrderAction {
  type: typeof ORDER_SUCCESS;
  payload: string;
}

export type OrderAction =
  | RequestOrderAction
  | SuccessOrderAction
  | ErrorOrderAction;
