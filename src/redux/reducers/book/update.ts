import {
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
} from "../../constants";

export const bookUpdateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case BOOK_UPDATE_REQUEST:
      return { loading: true };
    case BOOK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
