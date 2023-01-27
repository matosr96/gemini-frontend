import { API_URL } from "../../../api";
import {
  INSTITUTION_LIST_FAIL,
  INSTITUTION_LIST_REQUEST,
  INSTITUTION_LIST_SUCCESS,
} from "../../constants";
import axios from "axios";

export const institutionList = (uuid: string) => async (dispatch: any) => {
  dispatch({ type: INSTITUTION_LIST_REQUEST });
  try {
    const { data } = await axios.get(`${API_URL}/institutions/${uuid}`);
    dispatch({ type: INSTITUTION_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: INSTITUTION_LIST_FAIL, payload: err });
  }
};
