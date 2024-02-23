import React from 'react';
import Grid from './grid'; // Import the generic Grid component
import CourseCard from './coursecard.js';

const CourseList = ({ courses }) => {
    return (
        <Grid>
            {courses.map((course) => (
               <CourseCard
               key={course.id}
               imageUrl={course.image}
               courseName={course.title}
               instructor={course.instructor}
               description={course.description} // Extracting instructor assuming format "Instructor, Credits"
               credits={course.credits}
               buttontext='Available Sections' // Extracting credits
                />
            ))}
        </Grid>
    );
};

export default CourseList;
