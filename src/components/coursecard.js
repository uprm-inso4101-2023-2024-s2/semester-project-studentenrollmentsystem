// CourseCard component
// CourseCard component
import React from 'react';
import Card from './card.js'; // Make sure the import path is correct
import styles from "../styles/components/coursecard.module.scss";

export default function CourseCard({
  imageUrl,
  courseName,
  instructor,
  description,
  credits,
  buttontext
}) {
  return (
    <Card
      className={styles.courseCard}
      imageUrl={imageUrl}
      imageClassName={styles.courseImage}
      title={courseName}
      titleClassName={styles.title} // Pass additional class name for title
      buttontext={buttontext}
      buttonClassName={styles.button} // Pass additional class name for button
    >
      {/* Course-specific content as children of Card */}
      <div className={styles.courseInfo}>
        <h1 className={styles.instructor}>{instructor}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.credits}>{credits} credits</p>
      </div>
    </Card>
  );
}

