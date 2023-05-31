import { Dispatch } from "react";
import api from "../../api";
import { ItemsAction, ITEMS_REQUEST, ITEMS_SUCCESS, ITEMS_FAIL } from "./types";

export function getItemsRequest(param: string) {
  return (dispatch: Dispatch<ItemsAction>): Promise<any> => {
    dispatch({ type: ITEMS_REQUEST });

    return api
      .getItems(param)
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
