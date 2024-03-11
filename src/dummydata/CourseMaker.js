import React from 'react';
import axios from 'axios';

export default function CourseMaker() {
  const[course, setCourse] = React.useState([]);
  const[section, setSection] = React.useState([]);
  const[credits, setCredits] = React.useState([]);
  const[meetings, setMeetings] = React.useState([]);
  const[professor, setProfessor] = React.useState([]);
  const[grade, setGrade] = React.useState([]);

  const saveData = async () => {
    const data = `${course},${section},${credits},${meetings},${professor},${grade}\n`;

    // Appends `data` to "../dummydata/dumbdata.csv".
    try {
      await axios.post('http://localhost:3001/saveToFile', {text: data});
      console.log('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  return (
    <div>
      <input type="text" placeholder="Course"
          onChange={(e)=>setCourse(e.target.value)}/>
      <input type="text" placeholder="Section"
          onChange={(e)=>setSection(e.target.value)}/>
      <input type="text" placeholder="Credits"
          onChange={(e)=>setCredits(e.target.value)}/>
      <input type="text" placeholder="Meetings"
          onChange={(e)=>setMeetings(e.target.value)}/>
      <input type="text" placeholder="Professor"
          onChange={(e)=>setProfessor(e.target.value)}/>
      <input type="text" placeholder="Grade"
          onChange={(e)=>setGrade(e.target.value)}/>
      <button onClick={()=> saveData()}>Save</button>
    </div>
  );
}