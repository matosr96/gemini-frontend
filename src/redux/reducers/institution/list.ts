import {
  INSTITUTION_LIST_FAIL,
  INSTITUTION_LIST_REQUEST,
  INSTITUTION_LIST_SUCCESS,
} from "../../constants";

export const listInstitutionsReducer = (state = {}, action: any) => {
  switch (action.type) {
    case INSTITUTION_LIST_REQUEST:
      return { loading: true };
    case INSTITUTION_LIST_SUCCESS:
      return { loading: false, data: action.payload };
    case INSTITUTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
