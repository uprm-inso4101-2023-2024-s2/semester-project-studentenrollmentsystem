import React, { useState } from "react";
import styles from "../styles/pages/scheduledrafts.module.scss";

export default function ScheduleDrafts() {
  const [drafts, setDrafts] = useState([{ id: 0, courses: [] }]);
  
  function addCourse(draftId) {
    const courseCodeInput = document.getElementById(`coursecode-${draftId}`).value.trim();
    const sectionInput = document.getElementById(`section-${draftId}`).value.trim();

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

    setDrafts(prevDrafts => {const updatedDrafts = prevDrafts.map(draft => {
      if (draft.id === draftId) {
          const updatedCourses = draft.courses.slice();
          updatedCourses.push(newCourse);
          return { id: draft.id, courses: updatedCourses };
        }
        return draft;
      });
      return updatedDrafts;
    });
  }

  function removeCourse(draftId, index) {
    setDrafts(prevDrafts => {
      const updatedDrafts = prevDrafts.map(draft => {
        if (draft.id === draftId) {
          const updatedCourses = draft.courses.slice();
          updatedCourses.splice(index, 1);
          return { id: draft.id, courses: updatedCourses };
        }
        return draft;
      });
      return updatedDrafts;
    });
  }

  function addNewSchedule() {
    setDrafts(prevDrafts => {
      const newDraft = { id: prevDrafts.length, courses: [] };
      return prevDrafts.concat(newDraft);
    });
  }

  function removeSchedule(id) {
    setDrafts(prevDrafts => prevDrafts.filter(draft => draft.id !== id));
  }

  function renderTables() {
    const tables = [];
    for (let i = 0; i < drafts.length; i++) {
      const draft = drafts[i];
      tables.push(
        <div key={draft.id} className={styles.tableContainer}>
          <table>
            <div className={styles.scheduleContainer}>
              <div className={styles.scheduleHeader}>
                <input className={styles.NameSchedule} type="text" placeholder="Name" id={`name-${draft.id}`} />
                <button className={styles.deleteSchedule} onClick={() => removeSchedule(draft.id)}>delete</button>
                <div>
                  <input type="text" placeholder="Course Code" id={`coursecode-${draft.id}`} />
                  <input type="text" placeholder="Section" id={`section-${draft.id}`} />
                  <button className={styles.addCourse} onClick={() => addCourse(draft.id)}>+</button>
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
                      {draft.courses.map((course, index) => (
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
                            <button className={styles.removeCourse} onClick={() => removeCourse(draft.id, index)}>remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className={styles.saveDraft}>Save Draft</button>
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
      <button className={styles.addSchedule} onClick={addNewSchedule}>New Draft</button>
    </div>
  );
}
