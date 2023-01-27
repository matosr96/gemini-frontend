import { PartialBook } from "../../../types/book/books";
import {
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
} from "../../constants";
import axios from "axios";
import { API_URL } from "../../../api";

export const bookCreate = (props: PartialBook) => async (dispatch: any) => {
  dispatch({ type: BOOK_CREATE_REQUEST, payload: { ...props } });
  try {
    const { data } = await axios.post(`${API_URL}/books`, {
      ...props,
    });
    dispatch({ type: BOOK_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: BOOK_CREATE_FAIL, payload: err });
  }
};
