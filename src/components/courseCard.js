import React from 'react';

function CourseCard({ courseName, courseCredits, professorName, thumbnailColor }) {
    return (
      <div className="CourseCard">
        <div className="CourseCard-header">
          <div className="CourseCard-thumbnail" style={{ backgroundColor: thumbnailColor }}></div>
          <div className="text-center my-4">
            <h2>{courseName}</h2>
            <p>Course Code: _____</p>
          </div>
        </div>
        <div className="CourseCard-body">
          <div>
            <p>Instructor: {professorName}</p>
          </div>
          <div>
            <p>Credits Hours</p>
            <p>{courseCredits}</p>
          </div>
        </div>
        <div className="CourseCard-footer">
          <button>Enroll</button>
        </div>
      </div>
    )
}

export default CourseCard;
