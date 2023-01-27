import {
  INSTITUTION_REGISTER_FAIL,
  INSTITUTION_REGISTER_REQUEST,
  INSTITUTION_REGISTER_RESET,
  INSTITUTION_REGISTER_SUCCESS,
} from "../../constants";

export const institutionSignupReducer = (state = {}, action: any) => {
  switch (action.type) {
    case INSTITUTION_REGISTER_REQUEST:
      return { loading: true };
    case INSTITUTION_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case INSTITUTION_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case INSTITUTION_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
