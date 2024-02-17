import React from "react";
import styles from "../styles/pages/studentPage.module.scss"
import courseTable from "../components/courseTable";

function StudentPage() {
  return (
    <>
      <div className={styles.topbar} id="topbarid">
        <span className={styles.btntitle}>
          Perfil Estudiantil
        </span>
        <span className={styles.user}>
          <img src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" className={styles.userimg}></img>
        </span>
      </div>

      <div className={styles.mainpage}>
        <div className={styles.profileside}>
          <h1>Profile</h1>
        </div>
        <div className={styles.curriculumside}>
          <h1>Curriculum</h1>
        </div>
      </div>
    </>
  );
}

export default StudentPage;