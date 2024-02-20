import React from 'react';
import styles from '../styles/components/image.module.scss'; // Import your CSS module
import portico from "../img/Portico.jpg"; 


const RectangleComponent = () => {
  return (
    <div
      className={styles["vertical-rectangle"]}
      style={{
        backgroundImage: `url(${portico})`,
        width: "25%",
        height: "75%",
        borderRadius: "8%",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)", 
        left: "8%",
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)'
      }}
    ></div>
  );
};

export default RectangleComponent;
