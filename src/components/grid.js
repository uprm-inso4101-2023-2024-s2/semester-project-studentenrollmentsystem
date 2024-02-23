import React from 'react';
import styles from '../styles/components/grid.module.scss'; // Path to your Grid CSS module

const Grid = ({ children }) => {
    return <div className={styles.grid}>{children}</div>;
};

export default Grid;
