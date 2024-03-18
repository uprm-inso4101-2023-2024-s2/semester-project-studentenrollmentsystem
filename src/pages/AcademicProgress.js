import React from "react";

export default function AcademicProgress() {
 
 
  // Dummy Data   
  const progressData = {
    program: "Computer Science",
    status: "Enrolled",
    credits: 120,
    startDate: "August 1, 2021",
    progress: 25,
    courses: [
      { name: "Introduction to Computer Programming", completed: false },
      { name: "Data Structures and Algorithm", completed: true },
      { name: "Software Engineering", completed: true },
    ],
  };

  return (
    <div>
      <header>
        <h1>Bachelor of Software Engineering</h1>
        <p>Concentration:</p>
      </header>
      
      <section className="program-details">
        <div className="program-info">
          <h2>Program</h2>
          <p>{progressData.program}</p>
          <button>View Curriculum</button>
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
          <div className="course" key={course.name}>
            <h3>{course.name}</h3>
            <span>{course.completed ? "Completed" : "Not Completed"}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
