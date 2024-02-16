import React from "react";
import styles from "../styles/pages/loginPage.module.scss";
import Navbar from "../components/navbar";
import portico from "../img/Portico.jpg"; 

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>

      <div
        className = {styles["vertical-rectangle"]}
        style={{
          backgroundImage: `url(${portico})`,
          width: "30%",
          height: "80%",
          borderRadius: "8%",
          position: "absolute",
          top: "10%",
          left: "5%",
        }}
      ></div>
    </div>
  );
}
