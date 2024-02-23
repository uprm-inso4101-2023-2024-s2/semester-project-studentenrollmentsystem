import React, { useState } from "react";
import styles from "../styles/pages/calendar.module.scss";
import Button from "../components/button";
import DailySchedule from "../components/DailySchedule";
import MonthlySchedule from "../components/MonthlySchedule";
import WeeklySchedule from "../components/WeeklySchedule";

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState("Daily");
  const [events, setEvents] = useState([]); // State to store events
  const [eventName, setEventName] = useState(""); // New state for event name
  const [eventDate, setEventDate] = useState("");
  const [eventStartHour, setEventStartHour] = useState("");
  const [eventEndHour, setEventEndHour] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const changeView = (view) => {
    setCurrentView(view);
  };

  // Define the createEventId function here
  const createEventId = () => {
    return String(events.length + 1);
  };

  const handleInsertEvent = () => {
    const newEvent = {
      name: eventName,
      date: eventDate,
      startHour: eventStartHour,
      endHour: eventEndHour,
      description: eventDescription,
    };
    setEvents([...events, { ...newEvent, id: createEventId() }]); // Add the new event to the existing events array
    // Clear input fields after insertion
    setEventName("");
    setEventDate("");
    setEventStartHour("");
    setEventEndHour("");
    setEventDescription("");
  };

  const renderScheduleView = () => {
    switch (currentView) {
      case "Daily":
        return (
          <DailySchedule
            events={events}
            onAddEvent={(newEvent) =>
              setEvents([...events, { ...newEvent, id: createEventId() }])
            }
          />
        );
      case "Weekly":
        return (
          <WeeklySchedule
            events={events}
            onAddEvent={(newEvent) =>
              setEvents([...events, { ...newEvent, id: createEventId() }])
            }
          />
        );

      case "Monthly":
        return (
          <MonthlySchedule
            events={events}
            onAddEvent={(newEvent) =>
              setEvents([...events, { ...newEvent, id: createEventId() }])
            }
          />
        );

      default:
        return <DailySchedule events={events} />;
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
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name"
              className={styles.dateInput}
            />
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              placeholder="Pick a date"
              className={styles.dateInput}
            />
            <input
              type="time"
              value={eventStartHour}
              onChange={(e) => setEventStartHour(e.target.value)}
              placeholder="Start Hour"
              className={styles.hourInput}
            />
            <input
              type="time"
              value={eventEndHour}
              onChange={(e) => setEventEndHour(e.target.value)}
              placeholder="End Hour"
              className={styles.hourInput}
            />

            <div className={styles.buttons}>
              <Button onClick={handleInsertEvent}>Insert</Button>
            </div>
          </div>
        </div>
        <div className={styles.calendarCenter}>
          <div className={styles.calendarContainer}>
            {renderScheduleView()} {/* Render the current view with events */}
          </div>
        </div>
      </div>
    </div>
  );
}
