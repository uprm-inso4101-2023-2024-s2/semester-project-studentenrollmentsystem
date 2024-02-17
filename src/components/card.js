import React from 'react';
import styles from "../styles/components/card.module.scss";

export default function Card({ imageUrl, title, description }){
    return(
        <div className={styles.card}>
        {/* Comment out the line bellow if you don't plan on inserting an image to your card. */}
        <img src={imageUrl} alt="Card" className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        {/* Comment out the line bellow if you don't plan on using a button for your card. */}
          <button className={styles.button}>Click Me</button>
        </div>
      </div>
    ); 
}