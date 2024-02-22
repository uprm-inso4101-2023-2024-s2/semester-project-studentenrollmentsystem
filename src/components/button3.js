import React from 'react';
import styles from "../styles/components/button3.module.scss"

export default function Button3({ onClick, children }) {
  return (
    <div className={styles.button}>
    <div onClick={onClick}>
      {children}
    </div>
    </div>
  );
}
