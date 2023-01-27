import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../../redux/actions";
import Profile from "./component/inputProfile/profile";
import styles from "./signup.module.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");

  const signupUser = useSelector((state: any) => state.signupUser);
  const {
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister,
  } = signupUser;

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    phone: "",
    photo: imageUrl,
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setUser((prev) => ({ ...prev, photo: imageUrl }));
  };

  const submitRegisterHandler = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(userSignup(user) as any);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (successRegister) {
      navigate("/welcome", { replace: true });
    }
  }, [user, successRegister, navigate]);

  return (
    <div className={styles.container_signup}>
      <div className={styles.container_form_signup}>
        <div className={styles.header_form_signup}>
          <h2>Registro de usuarios</h2>
        </div>
        <form className={styles.form_signup} onSubmit={submitRegisterHandler}>
          <div className={styles.group_signup}>
            <div className={styles.group_info}>
              <div className={styles.container_input}>
                <span>Nombre</span>
                <input
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.container_input}>
                <span>Apellido</span>
                <input
                  name="lastname"
                  id="lastname"
                  value={user.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.container_input}>
                <span>Telefono</span>
                <input
                  name="phone"
                  id="phone"
                  value={user.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.profile_picture_container}>
              <Profile idInput="file-signup" setImageUrl={setImageUrl} />
            </div>
          </div>
          <div className={styles.container_input}>
            <span>Correo electronico</span>
            <input
              name="username"
              id="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.container_input}>
            <span>Contraseña</span>
            <input
              name="password"
              id="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button>Registrar</button>
        </form>
        <div className={styles.footer_signin}>
          <span>ya tienes una cuenta,  </span><p><Link to={"/"}>Inicia sesion</Link></p> 
        </div>
      </div>
    </div>
  );
};

export default Signup;
