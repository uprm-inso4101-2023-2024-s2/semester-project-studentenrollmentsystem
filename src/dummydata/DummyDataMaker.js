import React from "react";
import styles from "./datamaker.module.scss";
import Button from "../components/button";
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
      case "Other":
        return (
          <div>To be Implemented</div>
        );
      default: 
        return <CourseMaker />;
    }
  }

  return (
    <div className={styles.Home}>
      <div className={styles.header}>
        <div className={styles.views}>
          <h2>Dummy Data Maker</h2>
          <div className={styles.buttons}>
            <Button onClick={() => changeMaker("Courses")}>Courses</Button>
            <Button onClick={() => changeMaker("Other")}>Other</Button>
          </div>
        </div>
      </div>
      <div className={styles.dataMakerCenter}>
        <div className={styles.dataMakerContainer}>
          {renderDataMaker()}
        </div>
      </div>
    </div>
  );
}
