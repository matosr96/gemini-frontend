import { combineReducers } from "redux";
import {
  bookCreateReducer,
  bookDeleteReducer,
  bookListReducer,
  bookUpdateReducer,
  institutionSigninReducer,
  institutionSignupReducer,
  listInstitutionsReducer,
  userSigninReducer,
  userSignupReducer,
} from "../reducers";

export const reducer = combineReducers({
  signinUser: userSigninReducer,
  signupUser: userSignupReducer,
  
  signinInstitution: institutionSigninReducer,
  signupInstitution: institutionSignupReducer,
  listInstitution: listInstitutionsReducer,

  createBook: bookCreateReducer,
  listBook: bookListReducer,
  updateBook: bookUpdateReducer,
  deleteBook: bookDeleteReducer
});
