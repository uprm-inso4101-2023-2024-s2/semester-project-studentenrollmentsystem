import React from 'react';
import styles from "../styles/components/card.module.scss";

export default function Card({ imageUrl, title, credits }){
    return(
        <div className={styles.card}>
        <img src={imageUrl} alt="Card" className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.credits}>{credits}</p>
          <button className={styles.button}>Click Me</button>
        </div>
      </div>
    ); 
}