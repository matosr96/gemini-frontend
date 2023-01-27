import {
  INSTITUTION_SIGNIN_FAIL,
  INSTITUTION_SIGNIN_REQUEST,
  INSTITUTION_SIGNIN_SUCCESS,
} from "../../constants";
import axios from "axios";
import { API_URL } from "../../../api";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../constants-definitions/Routes";

export const institutionSignin = (uuid: string, password: string) => async (dispatch: any) => {
  const navigate = useNavigate();

    dispatch({
      type: INSTITUTION_SIGNIN_REQUEST,
      payload: { uuid, password },
    });

    try {
      const { data } = await axios.post(`${API_URL}/institutions-signin`, { uuid, password});
      
      if ( data.message !== "Usuario no existe o esta inactivo" && "Contrasena incorrecta") {
        
        dispatch({ type: INSTITUTION_SIGNIN_SUCCESS, payload: data });
        localStorage.setItem("InstitutionInfo", JSON.stringify(data));
        //navigate(PrivateRoutes.INVENTARY, { replace: true });

      }
    } catch (err: any) {
      const { message } = err.response.data;

      if (message) {
        Swal(message, {
          icon: "warning",
          buttons: ["OK!"],
          dangerMode: true,
        });
      }
      dispatch({
        type: INSTITUTION_SIGNIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
