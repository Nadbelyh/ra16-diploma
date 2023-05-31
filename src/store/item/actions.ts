import { Dispatch } from "react";
import api from "../../api";
import { ItemAction, ITEM_SUCCESS, ITEM_REQUEST, ITEM_FAIL } from "./types";

export function getItemByIdRequest(id: number) {
  return (dispatch: Dispatch<ItemAction>): Promise<any> => {
    dispatch({ type: ITEM_REQUEST });

    return api
      .getItemById(id)
      .then((response) => {
        dispatch({
          type: ITEM_SUCCESS,
          payload: response.data,
        });
      })
      .catch((response) => {
        dispatch({
          type: ITEM_FAIL,
          payload: response.message,
        });
      });
  };
}
