
import styles from "../styles/pages/AcademicProgress.module.scss";
import React from "react";

export default function AcademicProgress() {


  // Dummy Data
  const progressData = {
    program: "Software Engineering",
    minor: "Project Managment",
    creditsCompleted: 90,
    progress: 25,
    startDate: "August 1, 2021",
    courses: [
      { name: "Introduction to Computer Programming", completed: false },
      { name: "Data Structures and Algorithm", completed: true },
      { name: "Software Engineering", completed: true },
    ],
  };



  return (
    <div className="academic-progress-component">  {/* Align text to the left */}
      <header>
        <h1>Bachelor of {progressData.program}</h1>
      </header>
      
      <section className="program-details" style={{ display: 'block' }}> {/* Ensure block display */}

        <div className="program-info">
        {/*later deal with the case when the student doesnt have any major */}
          <h2>Minor in {progressData.minor}</h2>
          <button onClick={() => window.location.href = 'https://www.uprm.edu/cse/wp-content/uploads/sites/153/2022/07/Curriculum_INSO_BS-2.pdf'}> View Curriculum</button>

        </div>

        <div className="152">
          <h2>Total Credits</h2>
          <p>{progressData.status}</p>
        </div>

        <div className="credits">
          <h2>Taken Credits</h2>
          <p>{progressData.credits}</p>
        </div>

        <div className="start-date">
          <h2>Start Date</h2>
          <p>{progressData.startDate}</p>
        </div>

        <div className="progress">
          <h2>Progress</h2>
          <progress value={progressData.progress} max="100"></progress>
          <span>{progressData.progress}%</span>
        </div>
      </section>
      
      <hr />
      
      <section className="academic-progress">
        <h2>Academic Progress</h2>
        <p>View your curriculum and track your progress in each course.</p>
        
        <div className="filters">
          <button>Curriculum</button>
          <button>Completed</button>
          <button>Not Completed</button>
        </div>
        
        {progressData.courses.map(course => (
          <div className="course" key={course.name} style={{ display: 'block', marginBottom: '10px' }}> {/* Adjust display and margin for courses */}
            <h3>{course.name}</h3>
            <span>{course.completed ? "Completed" : "Not Completed"}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
