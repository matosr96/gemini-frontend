import axios from "axios";
import { API_URL } from "../../../api";
import { PartialBook } from "../../../types/book/books";
import {
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
} from "../../constants";

export const bookUpdate =
  (uuid: string, props: PartialBook) => async (dispatch: any) => {
    dispatch({ type: BOOK_UPDATE_REQUEST, payload: { props } });
    try {
      const { data } = await axios.put(`${API_URL}/books/${uuid}`, { data: props });
      dispatch({ type: BOOK_UPDATE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: BOOK_UPDATE_FAIL, payload: err });
    }
  };
