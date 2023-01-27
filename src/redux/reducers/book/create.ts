import {
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
} from "../../constants";

export const bookCreateReducer = (state = {}, action: any) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true };
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
