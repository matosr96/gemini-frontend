import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { institutionSignin } from "../../../../redux/actions";
import styles from "./modalsignin.module.css";

interface Props {
  openModal: boolean;
  setOpenModal: Function;
  institutionSelectede: any;
}

const SigninInstitutionModal = ({
  setOpenModal,
  openModal,
  institutionSelectede,
}: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinInstitution = useSelector(
    (state: any) => state.signinInstitution
  );
  const { userInfo, loading, success, error } = signinInstitution;

  const [institution, setInstitution] = useState({
    uuid: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstitution((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const signinInstitutionHandler = () => {
    try {
      dispatch(
        institutionSignin(institutionSelectede.uuid, institution.password) as any
      );
      localStorage.setItem("InstitutionInfo", JSON.stringify(institutionSelectede));
      navigate("/inventary", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/inventary", { replace: true });
    }
  }, [error, success, navigate, dispatch]);

  return (
    <div className={openModal ? styles.open_modal : styles.close_modal}>
      <div className={styles.container_form_signin_institution}>
        <div className={styles.header_signin_institution}>
          <h4>Iniciar sesion</h4>
          <button onClick={() => setOpenModal(!openModal)}>Salir</button>
        </div>
        <form
          className={styles.form_signin_institution}
          onSubmit={signinInstitutionHandler}
        >
          <div className={styles.container_input}>
            <span>Contraseña</span>
            <input
              name="password"
              id="password"
              value={institution.password}
              onChange={handleChange}
              required
            />
          </div>
          <button>Acceder</button>
        </form>
      </div>
    </div>
  );
};

export default SigninInstitutionModal;
