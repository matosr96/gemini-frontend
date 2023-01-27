import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { institutionSignup } from "../../redux/actions";
import Profile from "../signup/component/inputProfile/profile";
import styles from "./institution.module.css";

const Institution = () => {
  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo } = signinUser;
  const { uuid } = userInfo;

  const signupInstitution = useSelector(
    (state: any) => state.signupInstitution
  );
  const {
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister,
  } = signupInstitution;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [institution, setInstitution] = useState({
    user: uuid,
    name: "",
    nit: 0,
    email: "",
    password: "",
    phone: "",
    photo: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstitution((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setInstitution((prev) => ({ ...prev, photo: imageUrl }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(institutionSignup(institution) as any);
    navigate("/welcome", { replace: true });
  };

  useEffect(() => {
    if (successRegister) {
      navigate("/welcome", { replace: true });
    }
  }, [successRegister, dispatch]);

  return (
    <div className={styles.container_institution}>
      <div className={styles.container_form_institution}>
        <div className={styles.header_signup_institution}>
          <h2>Registrar institucion</h2>
        </div>
        <form
          className={styles.form_signup_institution}
          onSubmit={handleSubmit}
        >
          <div className={styles.group_signup_institution}>
            <div className={styles.group_info_institution}>
              <div className={styles.container_input}>
                <span>Nombre de la institucion</span>
                <input
                  name="name"
                  id="name"
                  value={institution.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.container_input}>
                <span>Correo electronico</span>
                <input
                  name="email"
                  id="email"
                  value={institution.email}
                  onChange={handleChange}
                  required
                />
              </div>
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
            </div>
            <div className={styles.profile_picture_container}>
              <Profile
                idInput="file-signup-institution"
                setImageUrl={setImageUrl}
              />
            </div>
          </div>

          <div className={styles.container_input}>
            <span>Nit (Opcional)</span>
            <input
              name="nit"
              id="nit"
              value={institution.nit}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.container_input}>
            <span>Telefono</span>
            <input
              name="phone"
              id="phone"
              value={institution.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.container_input}>
            <span>Direccion</span>
            <input
              name="address"
              id="address"
              value={institution.address}
              onChange={handleChange}
              required
            />
          </div>
          <button>Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Institution;
