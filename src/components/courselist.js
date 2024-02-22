import React from 'react';
import Grid from './grid'; // Import the generic Grid component
import styles from '../styles/components/courselist.module.scss'; // Path to your CourseList CSS module

const CourseList = ({ courses }) => {
    return (
        <Grid>
            {courses.map((course) => (
                <div key={course.id} className={styles.courseItem}>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                </div>
            ))}
        </Grid>
    );
};

export default CourseList;
