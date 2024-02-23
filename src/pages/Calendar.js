import React, { useState } from "react";
import styles from "../styles/pages/calendar.module.scss";
import Button from "../components/button";
import TextInput from "../components/textinput";
import DailySchedule from "../components/DailySchedule";
import MonthlySchedule from "../components/MonthlySchedule";
import WeeklySchedule from "../components/WeeklySchedule";

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState("Daily");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const handleInsertEvent = () => {

  }

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
        <div className={styles.inputLocation}>
          <div className={styles.inputBox}>
            <h2>Event Details</h2>
            <TextInput 

            />
            <TextInput 

            />
            <div className={styles.buttons}>
              <Button onClick={handleInsertEvent}>
                Insert
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.calendarContainer}>
          {renderScheduleView()} {/* Render the current view */}
        </div>
      </div>
    </div>
  );
}
