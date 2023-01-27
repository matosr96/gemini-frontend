import swal from "sweetalert";
import axios from "axios";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../../constants";
import { API_URL } from "../../../api";
import { PartialUser } from "../../../types";

export const userSignup = (props: PartialUser) => async (dispatch: any) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: props,
  });

  try {
    const { data } = await axios.post(`${API_URL}/user-signup`, props);
    if (data?.uuid) {
      swal("Registro Exitoso", {
        icon: "success",
        buttons: ["Iniciar Sesion"],
        dangerMode: true,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "/";
    } else {
      window.location.href = "/";
    }
  } catch (error: any) {
    if (error.response.data.error) {
      swal(error.response.data.error, {
        icon: "warning",
        buttons: ["OK!"],
        dangerMode: true,
      });
    }
  }
};
