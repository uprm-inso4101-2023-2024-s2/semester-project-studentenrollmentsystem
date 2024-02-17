import React from "react";
import styles from "../styles/pages/studentPage.module.scss";
import { useState } from "react";
import Button from "../components/button";
import Coursetable from "../components/courseTable";
import Scheduletable from "../components/scheduleTable";

function StudentPage() {
   const [isTable1, setIsTable1] = useState(true);
   const toggleIsTable1 = () => 
   {
     setIsTable1(current => !current);
   };
  
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
            <Button onClick={toggleIsTable1}>Switch</Button>
          </div>
          <div className={styles.tableview}>
            {<Whichtable which={isTable1}/>}
          </div>
        </div>
      </div>
    </>
  );
}

function Whichtable(props)
{
  const which = props.which;
  return(
  <>
    {which ? <Coursetable/> : <Scheduletable/>}
  </>
  );
}

export default StudentPage;