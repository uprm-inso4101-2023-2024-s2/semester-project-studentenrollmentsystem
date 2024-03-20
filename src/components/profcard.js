import React from 'react';
import styles from "../styles/components/profcard.module.scss";

export default function Profcard({profName, profOffice, imageUrl, profDescrip, profPhone, profEmail}){
    return(
        <div className={styles.profcard}>
        <img src={imageUrl} alt="Profcard" className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.profName}>{profName}</h2>
          <h1 className={styles.profOffice}>{profOffice}</h1>
          <p className={styles.profDescrip}>{profDescrip}</p>
          <p className={styles.profPhone}>{profPhone}</p>
          <p className={styles.profEmail}>{profEmail}</p>
        </div>
      </div>
    ); 
}