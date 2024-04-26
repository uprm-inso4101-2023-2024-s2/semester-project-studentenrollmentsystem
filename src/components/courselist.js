import React from 'react';
import Grid from './grid'; // Import the generic Grid component
import Card from './card.js';
import styles from '../styles/components/courselist.module.scss'; // Path to your CourseList CSS module

const CourseList = ({ courses }) => {
    return (
        <div className={styles.body}>
            {courses.map((course) => (
               <Card
               key={course.id}
               imageUrl={course.image}
               courseName={course.title}
               instructor={course.instructor}
               description={course.description} // Extracting instructor assuming format "Instructor, Credits"
               credits={course.credits}
               buttontext='Section Details'
               reviewButtonText = 'Reviews'
               className={styles.cards}
                />
            ))}
        </div>
    );
};

export default CourseList;
