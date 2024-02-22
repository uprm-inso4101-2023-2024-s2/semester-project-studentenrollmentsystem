import React from "react";
import styles from "../styles/pages/studentPage.module.scss";
import { useState } from "react";
import Button from "../components/button";
import Button2 from "../components/button2";
import Button3 from "../components/button3";
import Coursetable from "../components/courseTable";
import Coursetable2 from "../components/courseTable2";
import Scheduletable from "../components/scheduleTable";

function StudentPage() {
  const [isTable1Visible, setIsTable1Visible] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isTable2Visible, setIsTable2Visible] = useState(false);

  const toggleIsTable1 = () => {
    setIsTable1Visible((current) => !current);
    setIsDropdownVisible(false); // Close the dropdown when switching tables
    setIsTable2Visible(false); // Close Coursetable2 when switching tables
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((current) => !current);
    //setIsTable2Visible(false); // Close Coursetable2 when opening the dropdown
  };

  const toggleIsTable2 = () => {
    setIsTable2Visible((current) => !current);
    setIsDropdownVisible(false); // Close the dropdown when switching tables
    setIsTable1Visible(false); // Hide Coursetable when opening Coursetable2
  };

  return (
    <>
      <div className={styles.topbar} id="topbarid">
        <span className={styles.btntitle}>Perfil Estudiantil</span>
        <span className={styles.user}>
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
            className={styles.userimg}
            alt="user"
          ></img>
        </span>
      </div>

      <div className={styles.mainpage}>
        <div className={styles.profileside}>
          <h1>Profile</h1>
        </div>
        <div className={styles.curriculumside}>
          <h1>Curriculum: Spring 2024</h1>

          <div className={styles.viewbutton}>
            <Button onClick={toggleIsTable1}>Switch</Button>
            <Button2 onClick={toggleDropdown}>Past Semesters</Button2>
            {isDropdownVisible && (
              <div className={styles.additionalButtons}>
                <Button3 onClick={toggleIsTable2}>Fall Semester 2023</Button3>
                {/* Add more buttons as needed */}
              </div>
            )}
          </div>

          <div className={styles.tableview}>
            {isTable1Visible && !isTable2Visible && <Coursetable />}
            {isTable2Visible && <Coursetable2 />}
            {!isTable1Visible && !isTable2Visible && <Scheduletable />}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPage;