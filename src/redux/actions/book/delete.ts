import {
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
} from "../../constants";
import axios from "axios";
import { API_URL } from "../../../api";

export const bookDelete = (uuid: string) => async (dispatch: any) => {
  dispatch({ type: BOOK_DELETE_REQUEST, payload: uuid });
  try {
    const { data } = await axios.delete(`${API_URL}/books/${uuid}`);
    dispatch({ type: BOOK_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: BOOK_DELETE_FAIL, payload: err });
  }
};
