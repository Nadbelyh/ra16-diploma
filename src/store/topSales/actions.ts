import { Dispatch } from "react";
import api from "../../api";
import {
  TopSalesAction,
  TOP_SALES_REQUEST,
  TOP_SALES_SUCCESS,
  TOP_SALES_FAIL,
} from "./types";

export function getTopSalesRequest() {
  return (dispatch: Dispatch<TopSalesAction>): Promise<any> => {
    dispatch({ type: TOP_SALES_REQUEST });

    return api
      .getTopSales()
      .then((response) => {
        dispatch({
          type: TOP_SALES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((response) => {
        dispatch({
          type: TOP_SALES_FAIL,
          payload: response.message,
        });
      });
  };
}
