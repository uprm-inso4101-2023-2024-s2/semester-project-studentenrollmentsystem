import React from "react";
import CourseList from "../components/courselist.js"; // Adjust the import path as needed
import styles from "../styles/pages/offeredcourses.module.scss";
import Card from "../components/card.js";
import TuitionNotification from "../components/TuitionNotification.js";

function OfferedCourses() {
  const offeredCourses = [
    {
      id: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG",
      title: "Advance Programming",
      description:
        "Advanced programming techniques applied to the solution of engineering problems.",
      instructor: "Bienvenido Velez",
      credits: "4 credits",
    },
    {
      id: 2,
      image: "/logo512.png",
      title: "Data Structures",
      description: "Learn the fundamentals of data structures",
    },
    {
      id: 3,
      image: "/logo512.png",
      title: "Machine Learning",
      description: "Learn the fundamentals of machine learning",
    },
    // Add more courses as needed
  ];

  return (
    <body>
      <TuitionNotification />
      <div className={styles.offeredCourses}>
        <div className={styles.header}>
          <h2>OFFERED COURSES</h2>
        </div>
        <CourseList courses={offeredCourses} />
      </div>
    </body>
  );
}

export default OfferedCourses;
