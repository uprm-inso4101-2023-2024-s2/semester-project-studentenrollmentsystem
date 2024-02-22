import React from "react";
import styles from "../styles/pages/courses.module.scss"
import CourseCard from "../components/card"
import Card from "../components/card";


export default function Courses() {
  return (
    <body className={styles.courses}>
    <div className={styles.Courses}>
      <Card 
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG" 
          title="Introduction to Computer Programming" 
          credits ="4 credits" 
        />
    </div>

    <div className={styles.Courses}>
      <Card 
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG" 
          title="Advance Programming" 
          credits ="4 credits" 
        />
    </div>
    </body>

  );
}


