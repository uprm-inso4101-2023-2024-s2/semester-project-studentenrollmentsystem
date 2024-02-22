import React from 'react';
import styles from "../styles/components/button2.module.scss"

export default function Button2({ onClick, children }) {
  return (
    <div className={styles.button}>
    <div onClick={onClick}>
      {children}
    </div>
    </div>
  );
}
