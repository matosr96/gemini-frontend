import {
  INSTITUTION_SIGNIN_FAIL,
  INSTITUTION_SIGNIN_REQUEST,
  INSTITUTION_SIGNIN_SUCCESS,
  INSTITUTION_SIGNOUT,
} from "../../constants";

export const institutionSigninReducer = (state = {}, action: any) => {
  switch (action.type) {
    case INSTITUTION_SIGNIN_REQUEST:
      return { loading: true };
    case INSTITUTION_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case INSTITUTION_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case INSTITUTION_SIGNOUT:
      return {};
    default:
      return state;
  }
};
