import React, { useState, useEffect } from "react";
import styles from "../styles/components/spinner.module.scss";

export default function Spinner() {
    const [isActive, setIsActive] = useState(true);

    // Function to toggle the spinner
    const toggleSpinner = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        // Set a timer to activate the spinner after 2 seconds (2000 milliseconds)
        const timer = setTimeout(() => {
            setIsActive(true); // Activate spinner after 2 seconds
        }, 5000);

        // Clean up the timer when the component unmounts or when isActive changes
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        // Render the loading overlay only if isActive is true
        isActive && (
            <div className={styles.loadingOverlay}>
                <div className={styles.spinner}></div>
                <button onClick={toggleSpinner}>Turn Off Spinner</button>
            </div>
        )
    );
}


