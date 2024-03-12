import React from "react";
import styles from "./datamaker.module.scss";
import CourseMaker from "./CourseMaker";

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
        return <div>To be Implemented</div>
      case "Other":
        return <div>To be Implemented</div>
      default:
        return <CourseMaker />;
    }
  }

  // Add component to see current courses.
  const renderDataView = () => {
    return (
      <div>Data View</div>
    );
  }

  return (
    <div className={styles.DataMaker}>
      <div className={styles.header}>
        <div className={styles.views}>
          <div className={styles.views}>
            <h2>Dummy Data Maker</h2>
            <div className={styles.buttons}>
              <button onClick={() => changeMaker("Courses")}>Courses</button>
              <button onClick={() => changeMaker("Proffessors")}>Proffessors</button>
              <button onClick={() => changeMaker("Other")}>Other</button>
            </div>
          </div>
          <p>Dummy Data Maker Description</p>
        </div>
        <div className={styles.dataMakerCenter}>{renderDataMaker()}</div>
      </div>
      <div className={styles.dataMakerCenter}>
        <div className={styles.dataMakerContainer}>
          {renderDataView()}
        </div>
      </div>
    </div>
  );
}
