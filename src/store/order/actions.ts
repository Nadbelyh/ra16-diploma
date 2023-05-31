import { Dispatch } from "react";
import api from "../../api";
import { OrderAction, ORDER_SUCCESS, ORDER_REQUEST, ORDER_FAIL } from "./types";
import { Order } from "../../models/order";

export function sendOrderRequest(order: Order) {
  return (dispatch: Dispatch<OrderAction>): Promise<any> => {
    dispatch({ type: ORDER_REQUEST });

    return api
      .order(order)
      .then((response) => {
        dispatch({
          type: ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((response) => {
        dispatch({
          type: ORDER_FAIL,
          payload: response.message,
        });
      });
  };
}
