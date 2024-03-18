import React, { useState } from "react";
import styles from "../styles/pages/scheduledrafts.module.scss";


export default function ScheduleDrafts() {
  const [drafts, setDrafts] = useState(1); 

  const [courses, setCourses] = useState([
    {
      credits: 4,
      courseCode: "TEST1234",
      section: "78b",
      courseName: "INTRODUCTION TO SOFTWARE ENGINEERING",
      hours: "10:30am - 11:20am",
      days: "LWV",
      professor: "Marko Schutz",
      additionalInfo: "TBA"
    }
  ]);

  function addCourse() {
    const courseCodeInput = document.getElementById("coursecode").value.trim();
    const sectionInput = document.getElementById("section").value.trim();
    

  
    const newCourse = {
      credits: 0,   
      courseCode: courseCodeInput,
      section: sectionInput, 
      courseName: "", 
      hours: "", 
      days: "", 
      professor: "", 
      additionalInfo: "" 
    };
    const updatedCourses = courses.concat(newCourse);
    setCourses(updatedCourses);
  }
  

  function removeCourse(index) {
    const updatedCourses = courses.slice(); 
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  }

  function addNewSchedule() {
    setDrafts(prevDrafts => prevDrafts + 1); 
  }

  

  function renderTables() {
    const tables = [];
    for (let i = 0; i < drafts; i++) {
      tables.push(
        <div key={i} className={styles.tableContainer}>
          <table>
          <div className={styles.scheduleContainer}>
        <div className={styles.scheduleHeader}>
          <input className={styles.NameSchedule} type="text" placeholder="Name" id="name"/>
          <button className={styles.deleteSchedule}>delete</button> 
          {/* ^have to add functionallity^ */}
          <div>
            <input type="text" placeholder="Course Code" id="coursecode"/>
            <input type="text" placeholder="Section" id="section"/>
            <button className={styles.addCourse} onClick={addCourse}>+</button>
          </div>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>Credits</th>
                  <th>Course Code</th>
                  <th>Section</th>
                  <th>Course Name</th>
                  <th>Hours</th>
                  <th>Days</th>
                  <th>Professor</th>
                  <th>Additional Info</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.credits}</td>
                    <td>{course.courseCode}</td>
                    <td>{course.section}</td>
                    <td>{course.courseName}</td>
                    <td>{course.hours}</td>
                    <td>{course.days}</td>
                    <td>{course.professor}</td>
                    <td>{course.additionalInfo}</td>
                    <td>
                      <button className={styles.removeCourse} onClick={() => removeCourse(index)}>remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className={styles.saveDraft} >Save Draft</button>
            {/* ^have to add functionallity^ */}
          </div>
        </div>
      </div>
          </table>
        </div>
      );
    }
    return tables;
  }


  return (
    <div>
      {renderTables()}
      <button className={styles.addSchedule} >New Draft</button>
      {/* ^fixing so each table is independant */}
    </div>
  );
}
