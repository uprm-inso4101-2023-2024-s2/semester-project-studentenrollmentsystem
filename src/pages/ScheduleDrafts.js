import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/pages/scheduledrafts.module.scss"

export default function ScheduleDrafts() {

  function validateSchedule(){
    var courseCode = document.getElementById()
  }
  
  

  
  return(
    <body>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleHeader}>
          <input className={styles.NameSchedule} type="text" placeholder="Name" id="name"></input>
          
          <div>
            <input type="text" placeholder="Course Code" id="addcourse"></input>
            <input type="text" placeholder="Section" id="addsection"></input>
            
          <button className={styles.addCourse}>+</button>
          </div>
          
          
          <div className={styles.tableContainer}>

            
            {/* <table>
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

                  <button className={styles.removeCourse}>remove</button>
                </tr>
              </thead>
              <tbody>
                <td><input type="text" id="credit"></input></td>
                <td><input type="text" id="code"></input></td>
                <td><input type="text" id="section"></input></td>
                <td><input type="text" id="cname"></input></td>
                <td><input type="text" id="hour"></input></td>
                <td><input type="text" id="days"></input></td>
                <td><input type="text" id="professor"></input></td>
                <td><input type="text" id="addinfo"></input></td>
              </tbody>
            </table> */}

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

                  <button className={styles.removeCourse}>remove</button>
                  <button className={styles.editCourse}>edit</button>
                </tr>
              </thead>

              <tbody>
                <td>4</td>
                <td>TEST1234</td>
                <td>78b</td>
                <td>INTRODUCTION TO SOFTWARE ENGINEERING</td>
                <td>10:30am - 11:20am</td>
                <td>LWV</td>
                <td>Marko Schutz</td>
                <td>TBA</td>
              </tbody>

            </table>
          </div>
          </div>
        </div>
        <button className={styles.addSchedule}>New Draft</button>
      </body>
  );
        
}



