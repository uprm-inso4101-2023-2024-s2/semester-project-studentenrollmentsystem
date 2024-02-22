import React from 'react';
import CourseList from '../components/courselist.js'; // Adjust the import path as needed
import styles from '../styles/pages/offeredcourses.module.scss';

function OfferedCourses() {
    const offeredCourses = [
        { id: 1, image: '/logo512.png', title: 'Web Development', description: 'Learn the fundamentals of web development'},
        { id: 2, image: '/logo512.png', title: 'Data Structures', description: 'Learn the fundamentals of data structures'},
        { id: 3, image: '/logo512.png', title: 'Machine Learning', description: 'Learn the fundamentals of machine learning'},
        // Add more courses as needed
    ];

    return (
        <div className={styles.offeredCourses}>
            <div className={styles.header}>
                <h2>OFFERED COURSES</h2>
            </div>
            <CourseList courses={offeredCourses} />
        </div>
    );
}

export default OfferedCourses;