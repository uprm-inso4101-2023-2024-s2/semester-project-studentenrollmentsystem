import React from "react";
import styles from "./styles/datamaker.module.scss";
import CourseMaker from "./components/CourseMaker";
import DataView from "./components/DataView";

export default function DummyDataMakerPage() {
  const [currentMaker, setCurrentMaker] = React.useState("Courses");
  const changeMaker = (view) => {
    setCurrentMaker(view);
  };

  const renderDataMaker = () => {
    switch (currentMaker) {
      case "Courses": 
        return <CourseMaker />
      case "Proffessors":
        return <div>Proffesor Maker: To be Implemented.</div>
      case "Other":
        return <div>To be Implemented.</div>
      default:
        return <CourseMaker />;
    }
  }

  return (
    <div className={styles.DataMaker}>
      <div className={styles.header}>
        <div className={styles.upperCont}>
          <div><h2>Dummy Data Maker</h2></div>
          <div className={styles.buttonBox}>
            <button className={styles.buttons}
              onClick={() => changeMaker("Courses")}>Courses</button>
            <button className={styles.buttons}
              onClick={() => changeMaker("Proffessors")}>Proffessors</button>
            <button className={styles.buttons}
              onClick={() => changeMaker("Other")}>Other</button>
          </div>
        </div>
        <div className={styles.buttonCont}>
          <div className={styles.description}>
            Simple interface allows the creation of dummy data to be used within
            this page. Please be sure to run in a separate terminal the
            `DataMakerServer` by running `node DataMakerServer.js` in the
            `src/dummydata` folder.
          </div>
        </div>
      </div>
      <div className={styles.toolSpace}>
        <div className={styles.leftCont}>
          {renderDataMaker()}
        </div>
        <div className={styles.rightCont}>
          <DataView />
        </div>
      </div>
    </div>
  );
}
