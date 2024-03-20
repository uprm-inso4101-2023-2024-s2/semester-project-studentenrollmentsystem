import React from 'react';
import styles from "../styles/components/smallcard.module.scss";

export default function SmallCard({data, id}) {
  const displayDetails = () => {
    alert(`Course Name: ${data.Course} \nSection: ${data.Section}` +
      `\nCredits: ${data.Credits} \nMeetings: ${data.Meetings}` +
      `\nProffessor: ${data.Proffessor} \nGrade: ${data.Grades}`);
  }

  const displayCreditsBubble = () => {
    let color = "black";
    switch (data.Credits) {
      case "1":
        color = "#dafaed";  // light green.
        break;
      case "2":
        color = "#d0efff";  // light blue.
        break;
      case "3":
        color = "#f9edc8";  // light yellow.
        break;
      case "4":
        color = "#FFDAB9";  // light orange.
        break;
      case "5":
        color = "#ffadb0";  // light red.
        break;
      default:
        color = "black";
    }

    return (
      <div className={styles.bubble} style={{ backgroundColor: color }}>
        {data.Credits}
      </div>
    );
  }

  return (
    <div className={styles.SmallCard}>
      <div className={styles.buttonBox}>
        <button className={styles.button}
        onClick={displayDetails}>Details</button>
      </div>
      <div className={styles.id}>No. {id}</div>
      <div className={styles.courseBox}>{data.Course}</div>
      <div className={styles.creditBox}>
        {displayCreditsBubble()}
      </div>
    </div>
  );
}