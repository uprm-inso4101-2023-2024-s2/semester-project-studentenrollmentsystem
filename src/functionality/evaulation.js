import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const Evualation = () => {
    const [courses, setCourses] = useState([]);
    const [gpa, setGpa] = useState(0);
    const [creditsTaken, setCreditsTaken] = useState(0);
    const [creditsDue, setCreditsDue] = useState(153); // This is temporary since we don't have the real thing so assume this number that is tthe one from INSO

    useEffect(() => {
        // Load and parse the CSV data
        Papa.parse("/path/to/your/dumbdata.csv", {
            download: true,
            header: true,
            complete: function(results) {
                const coursesData = results.data;
                let totalCredits = 0;
                let totalGradePoints = 0;
                let gradedCredits = 0;

                coursesData.forEach(course => {
                    const grade = convertGradeToPoint(course.Grades);
                    const credits = parseInt(course.Creditos, 10);

                    if (!isNaN(grade)) {
                        totalGradePoints += grade * credits;
                        gradedCredits += credits;
                    }

                    if (!isNaN(credits)) {
                        totalCredits += credits;
                    }
                });

                const calculatedGPA = totalGradePoints / gradedCredits;
                setGpa(!isNaN(calculatedGPA) ? calculatedGPA.toFixed(2) : 0);
                setCreditsTaken(totalCredits);
                setCreditsDue(120 - totalCredits); 
                setCourses(coursesData);
            }
        });
    }, []);

    const convertGradeToPoint = (grade) => {
        const gradeMap = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
        return gradeMap[grade] || NaN; 
    };

    return (
        <div>
            <h1>Student Information</h1>
            <p>GPA: {gpa}</p>
            <p>Credits Taken: {creditsTaken}</p>
            <p>Credits Due: {creditsDue}</p>
        </div>
    );
};

export default Evualation;
