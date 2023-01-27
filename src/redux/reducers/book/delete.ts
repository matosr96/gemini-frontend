import {
  BOOK_DELETE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
} from "../../constants";

export const bookDeleteReducer = (state = {}, action: any) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
