import React from "react";
import styles from "../styles/pages/calendar.module.scss";
import Navbar from "../components/navbar";
import Button from "../components/button";
import TextInput from "../components/textinput";
import Card from "../components/card";

export default function Calendar() {
  return (
    <div className={styles.Home}>
      <div className={styles.header}>
        <div className={styles.views}>
          <h2>CALENDAR</h2>
          <div className={styles.buttons}>
            <Button>Day</Button>
            <Button>Month</Button>
            <Button>Week</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
