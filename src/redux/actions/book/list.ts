import { API_URL } from "../../../api";
import {
  BOOK_LIST_FAIL,
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
} from "../../constants";
import axios from "axios";

export const bookList = (user: string) => async (dispatch: any) => {
  dispatch({ type: BOOK_LIST_REQUEST });
  try {
    const { data } = await axios.get(`${API_URL}/books/${user}`);
    dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: BOOK_LIST_FAIL, payload: err });
  }
};
