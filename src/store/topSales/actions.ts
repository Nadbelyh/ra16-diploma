import { Dispatch } from "react";
import api from "../../api";
import { ItemAction, ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAIL } from "./types";

export function getTopSalesRequest() {
  return (dispatch: Dispatch<ItemAction>): Promise<any> => {
    dispatch({ type: ITEMS_REQUEST });

    return api
      .getTopSales()
      .then((response) => {
        dispatch({
          type: ITEMS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((response) => {
        dispatch({
          type: ITEMS_FAIL,
          payload: response.message,
        });
      });
  };
}
