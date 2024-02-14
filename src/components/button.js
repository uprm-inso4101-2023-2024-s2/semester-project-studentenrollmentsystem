import React from 'react';
import styles from "../styles/components/button.module.scss"

export default function Button({ onClick, children }) {
  return (
    <div className={styles.button}>
    <div onClick={onClick}>
      {children}
    </div>
    </div>
  );
}
