import { applyMiddleware, compose, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";
import * as RR from "react-redux";
import { reducer } from "./store/combine-reducer";

const initialState = {
  signinUser: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo") || "")
      : "",
  },
  signinInstitution: {
    InstitutionInfo: localStorage.getItem("InstitutionInfo")
      ? JSON.parse(localStorage.getItem("InstitutionInfo") || "")
      : "",
  },
  userSignup: {},
};

const composeEnhancer = compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

type StoreEvent = any;
interface Store {
  reviews: string;
}
export const useSelector: RR.TypedUseSelectorHook<Store> = RR.useSelector;
export const useDispatch = () => RR.useDispatch<Dispatch<StoreEvent>>();
export default store;
