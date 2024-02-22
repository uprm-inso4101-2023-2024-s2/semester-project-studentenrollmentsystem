import React from 'react';
import CourseGrid from '../components/coursegrid';
import styles from '../styles/pages/offeredcourses.module.scss'

function OfferedCourses() {
    const offeredCourses = [
        { id: 1, image: '/logo512.png', title: 'Web Development', description: 'Learn the fundamentals of webdev'},
        { id: 2, title: 'Data Structures', description: 'Learn the fundamentals of data structures', image: '/logo512.png'},
        { id: 3, title: 'Data Structures', description: 'Learn the fundamentals of data structures', image: '/logo512.png'},
        
    ];

    return (
        <div className={styles.offeredCourses}>
            <div className={styles.header}>
                <h2>OFFERED COURSES</h2>
            </div>
            <CourseGrid courses={offeredCourses} />
        </div>
    );
}

export default OfferedCourses;