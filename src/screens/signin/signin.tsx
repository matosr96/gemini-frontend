import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../../redux/actions";
import styles from "./signin.module.css";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo, loading, success, error } = signinUser;

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(userSignin(user.username, user.password) as any);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/welcome", { replace: true });
    }
  }, [error, success, navigate, dispatch]);

  return (
    <div className={styles.container_signin}>
      <div className={styles.container_form_signin}>
        <div className={styles.header_signin}>
          <h2>Iniciar Sesion</h2>
        </div>
        <form className={styles.form_signin} onSubmit={onSubmit}>
          <div className={styles.container_input}>
            <span>Email</span>
            <input
              name="username"
              id="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.container_input}>
            <span>Password</span>
            <input
              name="password"
              id="password"
              type={"password"}
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button> Acceder </button>
        </form>
        <div className={styles.footer_signin}>
          <span>No tienes una cuenta,  </span><p><Link to={"/signup"}>registrate aqui</Link></p> 
        </div>
      </div>
    </div>
  );
};

export default Signin;
