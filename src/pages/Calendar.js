import React, { useState, useEffect } from 'react';
import styles from '../styles/pages/calendar.module.scss';
import Button from '../components/button';
import DailySchedule from '../components/DailySchedule';
import MonthlySchedule from '../components/MonthlySchedule';
import WeeklySchedule from '../components/WeeklySchedule';
import AcademicSchedule from '../components/AcademicSchedule';

export default function CalendarPage() {
  const [currentView, setCurrentView] = useState('Daily');
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartHour, setEventStartHour] = useState('');
  const [eventEndHour, setEventEndHour] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [schedules, setSchedules] = useState([{ name: 'Schedule 1', events: [] }]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

  useEffect(() => {
    const loadedSchedules = sessionStorage.getItem('schedules');
    if (loadedSchedules) {
      setSchedules(JSON.parse(loadedSchedules));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  const createEventId = () => String(Date.now());

  const handleInsertEvent = () => {
    const newEvent = {
      id: createEventId(),
      name: eventName,
      date: eventDate,
      startHour: eventStartHour,
      endHour: eventEndHour,
      description: eventDescription,
    };

    const updatedSchedules = schedules.map((schedule, index) =>
      index === currentScheduleIndex ? { ...schedule, events: [...schedule.events, newEvent] } : schedule
    );

    setSchedules(updatedSchedules);
    setEventName('');
    setEventDate('');
    setEventStartHour('');
    setEventEndHour('');
    setEventDescription('');
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { name: `Schedule ${schedules.length + 1}`, events: [] }]);
  };

  const handleRemoveSchedule = () => {
    if (schedules.length > 1) {
      const updatedSchedules = [...schedules];
      updatedSchedules.splice(currentScheduleIndex, 1);
      setSchedules(updatedSchedules);
      setCurrentScheduleIndex(Math.min(currentScheduleIndex, updatedSchedules.length - 1));
    }
  };

  const handleScheduleChange = (e) => {
    const index = Number(e.target.value);
    setCurrentScheduleIndex(index);
  };

  const changeView = (view) => {
    setCurrentView(view);
  };

  const renderScheduleView = () => {
    const eventsData = schedules[currentScheduleIndex].events;
    switch (currentView) {
      case 'Daily':
        return <DailySchedule key={currentScheduleIndex} events={eventsData} />;
      case 'Weekly':
        return <WeeklySchedule key={currentScheduleIndex} events={eventsData} />;
      case 'Monthly':
        return <MonthlySchedule key={currentScheduleIndex} events={eventsData} />;
      case 'Academic':
      case 'Schedule':
        return (
          <AcademicSchedule
            key={currentScheduleIndex}
            events={eventsData}
            onAddEvent={(newEvent) => setEvents([...events, { ...newEvent, id: createEventId() }])}
          />
        );
      default:
        return <DailySchedule key={currentScheduleIndex} events={eventsData} />;
    }
  };

  return (
    <div className={styles.Home}>
      <div className={styles.header}>
        <div className={styles.views}>
          <h2>CALENDAR</h2>
          <div className={styles.buttons}>
            <Button onClick={() => changeView('Daily')}>Day</Button>
            <Button onClick={() => changeView('Weekly')}>Week</Button>
            <Button onClick={() => changeView('Monthly')}>Month</Button>
            <button className={styles.addScheduleButton} onClick={handleAddSchedule}>Add Schedule</button>
            <button className={styles.removeScheduleButton} onClick={handleRemoveSchedule}>Remove Schedule</button>
            <select onChange={handleScheduleChange} value={currentScheduleIndex}>
              {schedules.map((schedule, index) => <option key={index} value={index}>{schedule.name}</option>)}
            </select>
            {/* <Button onClick={() => changeView("Academic")}>Academic</Button> */}
          </div>
        </div>
      </div>
      <div className={styles.calendarCenter}>
        <div className={styles.inputLocation}>
          <div className={styles.inputBox}>
            <h2>Class Details</h2>
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
        <div className={styles.calendarContainer}>
          {renderScheduleView()} {/* Render the current view with events */}
        </div>
      </div>
    </div>
  );
}
