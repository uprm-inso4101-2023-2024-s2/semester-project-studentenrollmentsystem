import React from "react";
import styles from "../styles/pages/calendar.module.scss";
import Button from "../components/button";
import TextInput from "../components/textinput";
import Card from "../components/card";
import DailySchedule from "../components/DailySchedule"; // assuming Schedule component is located in the same directory
import MonthlySchedule from "../components/MonthlySchedule";

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

      <div className={styles.calendarContainer}> {/* Add a container for the calendar */}
        <DailySchedule /> 
      </div> 
    </div>    
  );
}
