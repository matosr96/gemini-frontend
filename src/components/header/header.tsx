import React from "react";
import { useSelector } from "react-redux";
import styles from "./header.module.css";
import profile from "../../assets/profile.svg";

const Header = () => {
  const signinUser = useSelector((state: any) => state.signinUser);
  const { userInfo } = signinUser;
  const { uuid, name, photo, lastname, username } = userInfo;

  const listInstitution = useSelector((state: any) => state.listInstitution);
  const { loading, error, data } = listInstitution;

  return (
    <div className={styles.container_header}>
      <div className={styles.header_name_institution}>
        <h3> {data?.name}</h3>
      </div>

      <div className={styles.header_sections}>
        <ul>
          <li>
            <a href="/inventary">Inventarios</a>
          </li>
          <li>
            <a href="/inventary">Prestamos</a>
          </li>
        </ul>
      </div>

      <div className={styles.user_header_info}>
        <div className={styles.name_header}>
          <div>
            {name} {lastname}
          </div>
          <span>{username}</span>
        </div>
        <img src={photo === "" ? profile : photo} alt="profile-picture" />{" "}
      </div>
    </div>
  );
};

export default Header;
