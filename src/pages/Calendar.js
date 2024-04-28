import React, { useState, useEffect } from 'react';
import styles from '../styles/pages/calendar.module.scss';
import Button from '../components/button';
import DailySchedule from '../components/DailySchedule';
import WeeklySchedule from '../components/WeeklySchedule';
import MonthlySchedule from '../components/MonthlySchedule';
import AcademicSchedule from '../components/AcademicSchedule';
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, getDocs, addDoc, updateDoc, doc, arrayUnion, deleteDoc } from 'firebase/firestore';

export default function CalendarPage() {
  const userId = 'user123'; // This should be dynamically assigned based on user session/login
  const [currentView, setCurrentView] = useState('Daily');
  const [schedules, setSchedules] = useState([]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartHour, setEventStartHour] = useState('');
  const [eventEndHour, setEventEndHour] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const querySnapshot = await getDocs(collection(db, `users/${userId}/schedules`));
    const loadedSchedules = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSchedules(loadedSchedules);
  };

  const handleInsertEvent = async () => {
    if (currentScheduleIndex < 0 || currentScheduleIndex >= schedules.length) {
      console.error("Current schedule index is out of bounds.");
      return; // Exit the function if the index is invalid
    }

    const newEvent = {
      id: Date.now().toString(),
      name: eventName,
      date: eventDate,
      startHour: eventStartHour,
      endHour: eventEndHour,
      description: eventDescription,
    };

    const scheduleDocRef = doc(db, `users/${userId}/schedules`, schedules[currentScheduleIndex].id);
    await updateDoc(scheduleDocRef, {
      events: arrayUnion(newEvent)
    });

    // Optimistically update the local state
    const updatedSchedules = schedules.map((schedule, index) => {
      if (index === currentScheduleIndex) {
        return { ...schedule, events: [...schedule.events, newEvent] };
      }
      return schedule;
    });

    setSchedules(updatedSchedules);
    setEventName('');
    setEventDate('');
    setEventStartHour('');
    setEventEndHour('');
    setEventDescription('');
  };


  const handleAddSchedule = async () => {
    const newSchedule = { name: `Schedule ${schedules.length + 1}`, events: [] };
    const docRef = await addDoc(collection(db, `users/${userId}/schedules`), newSchedule);
    setSchedules([...schedules, { ...newSchedule, id: docRef.id }]);
  };

  const handleRemoveSchedule = async () => {
    if (schedules.length > 1) {
      const scheduleIdToRemove = schedules[currentScheduleIndex].id;
      await deleteDoc(doc(db, `users/${userId}/schedules`, scheduleIdToRemove));
      const updatedSchedules = schedules.filter((_, index) => index !== currentScheduleIndex);
      setSchedules(updatedSchedules);
      setCurrentScheduleIndex(0);
    }
  };

  const handleScheduleChange = (e) => {
    setCurrentScheduleIndex(Number(e.target.value));
  };

  const changeView = (view) => {
    setCurrentView(view);
  };

  const renderScheduleView = () => {
    const eventsData = schedules[currentScheduleIndex]?.events || [];
    switch (currentView) {
      case 'Daily':
        return <DailySchedule key={currentScheduleIndex} events={eventsData} />;
      case 'Weekly':
        return <WeeklySchedule key={currentScheduleIndex} events={eventsData} />;
      case 'Monthly':
        return <MonthlySchedule key={currentScheduleIndex} events={eventsData} />;
      case 'Academic':
        return <AcademicSchedule key={currentScheduleIndex} events={eventsData} />;
      default:
        return <DailySchedule key={currentScheduleIndex} events={eventsData} />;
    }
  };

  return (
    <div className={styles.Home}>
      <div className={styles.header}>
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
        </div>
      </div>
      <div className={styles.calendarCenter}>
        <div className={styles.inputLocation}>
          <h2>Event Details</h2>
          <div className={styles.actualInput}>
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" className={styles.dateInput} />
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="Pick a date" className={styles.dateInput} />
            <input type="time" value={eventStartHour} onChange={(e) => setEventStartHour(e.target.value)} placeholder="Start Hour" className={styles.hourInput} />
            <input type="time" value={eventEndHour} onChange={(e) => setEventEndHour(e.target.value)} placeholder="End Hour" className={styles.hourInput} />
            <Button onClick={handleInsertEvent}>Insert</Button>
          </div>
        </div>
        <div className={styles.calendarContainer}>
          {renderScheduleView()}
        </div>
      </div>
      <Link to="/compare-schedules" className={styles.compareLink}>Compare Schedules</Link>
    </div>
  );
}
