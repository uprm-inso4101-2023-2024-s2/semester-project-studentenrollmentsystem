import React from "react";
import styles from "../styles/coursemaker.module.scss";
import axios from "axios";

export default function CourseMaker() {
  const[course, setCourse] = React.useState([]);
  const[section, setSection] = React.useState([]);
  const[credits, setCredits] = React.useState([]);
  const[meetings, setMeetings] = React.useState([]);
  const[professor, setProfessor] = React.useState([]);
  const[grade, setGrade] = React.useState([]);

  const saveData = async () => {
    const data =
    `${course},${section},${credits},${meetings},${professor},${grade}\n`;
    if (data.match(/[^,\n]/)) {
      try {
        await axios.post('http://localhost:3001/saveToFile', {text: data});
        console.log('File saved successfully!');
      } catch (error) {
        alert('Error saving file:', error)
        console.error('Error saving file:', error);
      }
    } else {
      alert("At least one field must have a valid input.");
    }
  }

  return (
    <div className={styles.CourseMaker}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2 className={styles.title}>Course Maker</h2>  
        </div>
        <div className={styles.description}>
          Create dummy courses. At least one field must have a valid input.
        </div>
      </div>
      <div className={styles.toolBox}>
        <div className={styles.controlPanel}>
          <div className={styles.inputBox}>
            <input className={styles.input} type="text" placeholder="Course"
              onChange={(e)=>setCourse(e.target.value)}/>
            <input className={styles.input} type="text" placeholder="Section"
              onChange={(e)=>setSection(e.target.value)}/>
            <input className={styles.input} type="text" placeholder="Credits"
              onChange={(e)=>setCredits(e.target.value)}/>
            <input className={styles.input} type="text" placeholder="Meetings"
              onChange={(e)=>setMeetings(e.target.value)}/>
            <input className={styles.input} type="text" placeholder="Professor"
              onChange={(e)=>setProfessor(e.target.value)}/>
            <input className={styles.input} type="text" placeholder="Grade"
              onChange={(e)=>setGrade(e.target.value)}/>
            <button className={styles.input} onClick={()=> saveData()}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}