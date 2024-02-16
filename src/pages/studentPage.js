import React from "react";
import "../styles/pages/studentPage.module.scss";
import styles from "../styles/pages/studentPage.module.scss";
import Coursetable from "../components/courseTable";
import Button from "../components/button";

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
          <h1>Curriculum: Spring 2024</h1>
          <div className={styles.viewbutton}>
            <Button>Switch</Button>
          </div>
          <div className={styles.tableview}>
            <Coursetable></Coursetable>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPage;

function openNav()
{
  document.getElementById("sidebarid").style.width = "10%";
  document.getElementById("sidebarid").style.opacity = "1";
  document.getElementById("btn1").style.rotate = "90deg";
  document.getElementById("btn1").style.opacity = "0";
}
function closeNav()
{
  document.getElementById("sidebarid").style.width = "0";
  document.getElementById("sidebarid").style.opacity = "0";
  document.getElementById("btn1").style.rotate = "0deg";
  document.getElementById("btn1").style.opacity = "1";
}