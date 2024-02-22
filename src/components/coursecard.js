import React from 'react';
import Card from '../components/card.js';
import styles from '../styles/components/coursecard.module.scss';

function CourseCard({course}) {
    if(!course || !course.image) {
        console.error('CourseCard component received invalid or undefined course data'. course);
        return null;
    }

    return (
        <Card
           imageUrl={course.image}
            title={course.title}
            description={course.description}
            className={styles.courseCard}
        />
    );
}

export default CourseCard;