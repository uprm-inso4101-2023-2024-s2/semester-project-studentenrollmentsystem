import React from 'react';
import styles from "../styles/components/card.module.scss";

export default function Card({courseName, credits, instructor, imageUrl}){
    return(
        <div className={styles.card}>
        <img src={imageUrl} alt="Card" className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.courseName}>{courseName}</h2>
          <h1 className={styles.instructor}>{instructor}</h1>
          <p className={styles.credits}>{credits}</p>
          <button className={styles.button}>Enroll Now</button>
        </div>
      </div>
    ); 
}