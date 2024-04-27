import React from "react";
import styles from "../styles/pages/courseAdvisor.module.scss";
import { suggestCourseOrder } from "../functionality/course_suggestion.js";
import { plannedCourseworkPerSemester } from "../functionality/course_suggestion.js";

export default function CourseAdvisorPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [program, setProgram] = React.useState("CIIC");
  const [creditsPerSemester, setCreditsPerSemester] = React.useState(16);

  // Dummy Data.
  const programData = ["CIIC"];
  const sortedCurriculum = suggestCourseOrder(program);

  const nthPageEntries = plannedCourseworkPerSemester(sortedCurriculum, creditsPerSemester);

  const handleProgramInput = (event) => {
    setProgram(event.target.value);
  }

  const handleCreditsPerSemester = (event) => {
    setCreditsPerSemester(parseInt(event.target.value));
    setCurrentPage(1);
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h1>Course Advisor</h1>
      <div className={styles.Contents}>
        <div className={styles.InfoBox}>
          <p className={styles.Text}>
            Course Advisor offers a comprehensive list of recommended courses
            provided your major/degree and desired amount of credits per
            semester. Please note that it'll be recommended to take courses and
            its corequisites at the same time.
          </p>
        </div>
        <div className={styles.ControlBox}>
          <div className={styles.leftBox}>
            <h5>Select Study Program: </h5>
            <div className={styles.ProgramSelector}>
              <select className={styles.Input} onChange={handleProgramInput}>
                {programData.map((program, index) => (
                  <option key={index} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
            <h5>Enter Amount of Credits per Semester: </h5>
            <div className={styles.CreditSelector}>
              <input
                type="number"
                min="0"
                max="21"
                placeholder="0-21"
                value={creditsPerSemester}
                onChange={handleCreditsPerSemester}
              />
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.PageControl}>
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span> Semester: {currentPage} </span>
              <button onClick={handleNextPage} disabled={nthPageEntries.length <= currentPage}>
                Next
              </button>
            </div>
          </div>
        </div>
        <div className={styles.TableContainer}>
          <table className={styles.Table}>
            <thead>
              <tr>
                <th>CURSO</th>
                <th>DESCRIPCION</th>
                <th>CRS</th>
              </tr>
            </thead>
            <tbody>
              {nthPageEntries[currentPage - 1].map((course, index) => (
                <tr key={index}>
                  <td>{course.code}</td>
                  <td>{course.name}</td>
                  <td>{course.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
