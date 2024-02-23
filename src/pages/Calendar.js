import React, { useState } from "react";
import styles from "../styles/pages/calendar.module.scss";
import Button from "../components/button";
import DailySchedule from "../components/DailySchedule";
import MonthlySchedule from "../components/MonthlySchedule";
import WeeklySchedule from "../components/WeeklySchedule";

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState("Daily");
  const [eventDate, setEventDate] = useState("");
  const [eventStartHour, setEventStartHour] = useState("");
  const [eventEndHour, setEventEndHour] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const changeView = (view) => {
    setCurrentView(view);
  };

  const handleInsertEvent = () => {
    // Here you would usually handle the event insertion logic,
    // For example, saving to a state or sending to a server.
    console.log("Inserting event:", {
      eventDate,
      eventStartHour,
      eventEndHour,
      eventDescription,
    });
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
        <div className={styles.inputLocation}>
          <div className={styles.inputBox}>
            <h2>Event Details</h2>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Pick a date"
              className={styles.dateInput} // Corrected from style to className
            />
            <input
              type="time"
              value={eventStartHour}
              onChange={(e) => setEventStartHour(e.target.value)}
              placeholder="Start Hour"
              className={styles.hourInput} // Corrected from style to className
            />
            <input
              type="time"
              value={eventEndHour}
              onChange={(e) => setEventEndHour(e.target.value)}
              placeholder="End Hour"
              className={styles.hourInput} // Corrected from style to className
            />

            <div className={styles.buttons}>
              <Button onClick={handleInsertEvent}>Insert</Button>
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
