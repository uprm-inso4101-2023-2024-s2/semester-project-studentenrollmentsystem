import styles from "../styles/pages/course-sugg.module.scss";
import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore"; 
import { db } from "../firebase"; 

export default function CourseSugg() {
  const [ciicData, setCiicData] = useState({});
  const [currentCurriculum, setCurrentCurriculum] = useState("ciic"); // Default curriculum

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ciicRef = doc(db, "programs", currentCurriculum); // Use the selected curriculum
        const docSnap = await getDoc(ciicRef);
        
        if (docSnap.exists) {
          const data = docSnap.data();
          console.log("Fetched data:", data);
          setCiicData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [currentCurriculum]); // Update data when the selected curriculum changes

  console.log("ciicData:", ciicData); // Check the ciicData state in console

  const order = ["y1s1", "y1s2", "y2s1", "y2s2", "y3s1", "y3s2", "y4s1", "y4s2", "y5s1", "y5s2"];

  const [userCompletedCourses, setUserCompletedCourses] = useState(["CCOG 5010/INTD 5010","QUIM3131","MATE3005","MATE3035"]);

  const isCourseCompleted = (curso) => {
    return userCompletedCourses.includes(curso);
  };

  const canTakeCourse = (prerequisites) => {
    if (!prerequisites) return true; // If no prerequisites, can take course
    const prerequisiteCourses = prerequisites.split("or").map((prereq) => prereq.trim());
    return prerequisiteCourses.some((prereq) => userCompletedCourses.includes(prereq));
  };

  const isCourseSuggested = (curso) => {
    return !isCourseCompleted(curso) && canTakeCourse(curso.Prerequisites);
  };

  const handleCurriculumChange = (e) => {
    setCurrentCurriculum(e.target.value); // Update the selected curriculum
  };
  
  return (
    <div className={styles.Home}>
      <h1>Curriculo del Curso</h1>
      <div className={styles.TopControls}>
        <select value={currentCurriculum} onChange={handleCurriculumChange}>
          <option value="ciic">INSO</option>
          <option value="inso">CIIC</option>
          {/* Add more options for each curriculum */}
        </select>
      </div>
      <div className={styles.TableContainer}>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Title</th>
              <th>Prerequisites</th>
              <th>Credits</th>
              <th>Completed?</th>
              <th>Suggested</th>
            </tr>
          </thead>
          <tbody>
            {order.map((semesterKey) => (
              ciicData[semesterKey] && (
                <React.Fragment key={semesterKey}>
                  <tr>
                    <th colSpan="4">{semesterKey}</th>
                  </tr>
                  {Object.values(ciicData[semesterKey]).map((courseData) => (
                    <tr key={courseData.Course} className={isCourseSuggested(courseData) ? styles.highlighted : ''}>
                      <td>{courseData.Course || "-"}</td>
                      <td>{courseData.Title || "-"}</td>
                      <td>{courseData.Prerequisites || "-"}</td>
                      <td>{courseData.Credits || "-"}</td>
                      <td>{isCourseCompleted(courseData.Course) ? "Yes" : "No"}</td>
                      <td>{isCourseCompleted(courseData.Course) ? "Completed" : canTakeCourse(courseData.Prerequisites) ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </React.Fragment>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
