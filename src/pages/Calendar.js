import React from "react";
import styles from "../styles/pages/calendar.module.scss";
import Button from "../components/button";
import DailySchedule from "../components/DailySchedule"; // assuming Schedule component is located in the same directory
import MonthlySchedule from "../components/MonthlySchedule";
import WeeklySchedule from "../components/WeeklySchedule";
import { useState } from "react";

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState("Daily");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const renderScheduleView = () => {
    switch (currentView) {
      case "Daily":
        return <DailySchedule />;
      case "Weekly":
        return <WeeklySchedule />;
      case "Monthly":
        return <MonthlySchedule />;
      default:
        return <DailySchedule />;
    }
  };

  return (
    <div className={styles.Home}>
      <div className={styles.header}>
        <div className={styles.views}>
          <h2>CALENDAR</h2>
          <div className={styles.buttons}>
            <Button onClick={() => changeView("Daily")}>Day</Button>
            <Button onClick={() => changeView("Weekly")}>Week</Button>
            <Button onClick={() => changeView("Monthly")}>Month</Button>
          </div>
        </div>
      </div>
      <div className={styles.calendarCenter}>
        <div className={styles.calendarContainer}>
          {renderScheduleView()} {/* Render the current view */}
        </div>{" "}
      </div>
    </div>
  );
}
