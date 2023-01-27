import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./welcome.module.css";
import profile from "../../assets/profile.svg";
import { PartialInstitution } from "../../types/institution";
import { Link, useNavigate } from "react-router-dom";
import { institutionList } from "../../redux/actions";
import SigninInstitutionModal from "./components/modalSigninInstitution/signin-institution";

const Welcome = () => {
  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo } = signinUser;
  const { uuid, name, photo, lastname } = userInfo;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listInstitution = useSelector((state: any) => state.listInstitution);
  const { loading, error, data } = listInstitution;

  const [storeSelected, setStoreSelected] = useState<PartialInstitution>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [password, setPassword] = useState("");

  console.log(data);

  const storeHandler = (institution: PartialInstitution) => {
    setOpenModal(true);
    setStoreSelected(institution);
  };

  useEffect(() => {
    dispatch(institutionList(uuid) as any);
    
  }, []);

  return (
    <>
      <div className={styles.contaiener_welcome}>
        <div className={styles.container_form_welcome}>
          <div className={styles.header_form_welcome}>
            <h1>Bienvenid@</h1>
          </div>
          <div className={styles.body_form_welcome}>
            <div className={styles.container_picture_welcome}>
              <img src={photo === "" ? profile : photo} alt="profile-picture" />
            </div>
            <h3>
              {name} {lastname}
            </h3>
            <button>
              <Link to={"/register_institution"}>Registrar institucion</Link>
            </button>

            <div className={styles.institutions_list_welcome}>
              {data != undefined ? (
                <div className={styles.container_list_institutions}>
                  <div className={styles.info_list}>
                    <h5>ENTRAR A INSTITUCION</h5>
                  </div>
                  <button className={styles.btn_list} onClick={() => setOpenModal(!openModal)}>{data?.name}</button>
                </div>
              ) : (
                "No hay instituciones registradas"
              )}
            </div>
          </div>
        </div>
      </div>

      <SigninInstitutionModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        institutionSelectede={data}
      />
    </>
  );
};

export default Welcome;
