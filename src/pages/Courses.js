import React from "react";
import styles from "../styles/pages/courses.module.scss"
import CourseCard from "../components/courseCard"


export default function Courses() {
  return (
    <div className={styles.Courses}>
      <CourseCard 
          courseName="Introduction to Computer Programming" 
          courseCredits="4crs" 
          professorName="Heidy Sierra Gil" 
          thumbnailColor="bg-blue-500" 
        />
        <CourseCard 
          courseName="CIIC4010 " 
          courseCredits="4crs" 
          professorName="Bienvenido Vélez" 
          thumbnailColor="bg-blue-500" 
        />
    </div>
  );
}


