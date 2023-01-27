import { BOOK_LIST_FAIL, BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS } from "../../constants";

export const bookListReducer = (state = {}, action: any) => {
    switch (action.type) {
      case BOOK_LIST_REQUEST:
        return { loading: true };
      case BOOK_LIST_SUCCESS:
        return { loading: false, data: action.payload };
      case BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };