import { PartialInstitution } from "../../../types/institution";
import { INSTITUTION_REGISTER_REQUEST, INSTITUTION_REGISTER_SUCCESS } from "../../constants";
import axios from "axios";
import { API_URL } from "../../../api";
import swal from "sweetalert";

export const institutionSignup = (props: PartialInstitution) => async (dispatch: any) => {
    dispatch({
      type: INSTITUTION_REGISTER_REQUEST,
      payload: props,
    });
  
    try {
      const { data } = await axios.post(`${API_URL}/institutions`, props);
      if (data?.uuid) {
        swal("Registro Exitoso", {
          icon: "success",
          buttons: ["Iniciar Sesion"],
          dangerMode: true,
        });
        dispatch({ type: INSTITUTION_REGISTER_SUCCESS, payload: data });
        localStorage.setItem("institutionsInfo", JSON.stringify(data));
       // window.location.href = "/welcome";
      } else {
       // window.location.href = "/welcome";
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
  