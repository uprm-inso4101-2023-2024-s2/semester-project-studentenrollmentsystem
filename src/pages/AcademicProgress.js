import styles from "../styles/pages/AcademicProgress.module.scss";
import React from "react";

export default function AcademicProgress() {
  const progressData = {
    program: "Software Engineering",
    minor: "Project Managment",
    completedCredits: 90,
    totalCredits: 153,
    progress: 25,
    startDate: "August 1, 2021",
    courses: [
      { name: "Introduction to Computer Programming", completed: false },
      { name: "Data Structures and Algorithm", completed: true },
      { name: "Software Engineering", completed: true },
    ],
  };

  return (
    <body className={styles.AcademicProgress}>
      <div className={styles.header}>
        <h1>ACADEMIC PROGRESS</h1>
      </div>

      <div className={styles["academic-progress-component"]}> {/* Updated class name */}
        <header>
          <h2>Bachelor of {progressData.program}</h2>
        </header>

        <section className={styles["program-details"]}> {/* Updated class name */}
          <div className={styles["program-info"]}> {/* Updated class name */}
            <h2>Minor in {progressData.minor}</h2>
            <button onClick={() => window.location.href = 'https://www.uprm.edu/cse/wp-content/uploads/sites/153/2022/07/Curriculum_INSO_BS-2.pdf'}> View Curriculum</button>
          </div>

          <div className={styles["total-credits"]}> {/* Adjusted to match SCSS */}
            <h2>Total Credits</h2>
            <p>{progressData.totalCredits}</p>
          </div>

          <div className={styles["credits"]}> {/* This className was already correct */}
            <h2>Taken Credits</h2>
            <p>{progressData.completedCredits}</p>
          </div>

          <div className={styles["progress"]}> {/* This className was already correct */}
            <h2>Progress</h2>
            <progress value={(progressData.completedCredits / progressData.totalCredits) * 100} max="100"></progress>
            <span>{Math.round((progressData.completedCredits / progressData.totalCredits) * 100)}%</span>
          </div>
        </section>

        <hr />

        <section className={styles["academic-progress"]}> {/* Updated class name */}
          <h2>Courses</h2>
          <p>View your curriculum and track your progress in each course.</p>

          <div className={styles["filters"]}> {/* Assuming you want this styled as well */}
            <button>Filter</button>
            <button>Completed</button>
            <button>Not Completed</button>
          </div>
          {/*`make the courses view as a table not a list*/}
          {progressData.courses.map(course => (
            <div className={styles["course"]} key={course.name}>
              <h3>{course.name}</h3>
              <span>{course.completed ? "Completed" : "Not Completed"}</span>
            </div>
          ))}
        </section>
      </div>
    </body>
  );
}
