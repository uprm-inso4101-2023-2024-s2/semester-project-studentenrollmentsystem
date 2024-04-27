import React, { useState, useEffect } from 'react';
import styles from '../styles/pages/calendar.module.scss';
import Button from '../components/button';
import DailySchedule from '../components/DailySchedule';
import MonthlySchedule from '../components/MonthlySchedule';
import WeeklySchedule from '../components/WeeklySchedule';
import AcademicSchedule from '../components/AcademicSchedule';
// import { fbapp } from "../firebase";
// import {getFirestore,collection,getDocs} from 'firebase/firestore';
// import { initializeApp } from "firebase/app";

import { db } from "../firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

import { collectFromHash } from '@fullcalendar/core/internal';

export default function CalendarPage({ events, onAddEvent }) {

  const [localEvents, setLocalEvents] = useState([
    {
      id: 1,
      date: "2024-08-20",
      title: "First Day of Classes",
      description: "Classes begin for the Fall semester.",
    },
    {
      id: 2,
      date: "2024-12-15",
      title: "Final Exams",
      description: "Final examinations week for the Fall semester.",
    },
    // Add more events as needed
  ]);

  const handleAddEvent = (newEvent) => {
    setLocalEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const [currentView, setCurrentView] = useState('Weekly');
  // const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventStartHour, setEventStartHour] = useState('');
  const [eventEndHour, setEventEndHour] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [schedules, setSchedules] = useState([{ name: 'Schedule 1', events: [] }]);
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);
  const [scheduleIds, setScheduleIds] = useState([]);

  useEffect(() => {
    const loadedSchedules = sessionStorage.getItem('schedules');
    if (loadedSchedules) {
      setSchedules(JSON.parse(loadedSchedules));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const scheduleCollection = collection(db, 'schedule');
        const scheduleSnapshot = await getDocs(scheduleCollection);
        const scheduleData = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSchedules(scheduleData);
        setScheduleIds(scheduleSnapshot.docs.map(doc => doc.id));
  
        // This will log each document object to the console
        console.log(scheduleData);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      }
    };
  
    loadSchedules();
  }, []);


  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courseDocRef = doc(db, 'courses', 'Algorithms and Computer Programming');
        const courseSnapshot = await getDoc(courseDocRef);
        if (courseSnapshot.exists()) {
          const courseData = { id: courseSnapshot.id, ...courseSnapshot.data() };
          const { id, start_time, days, end_time } = courseData;
          const extractedData = { id, start_time, days, end_time };
          
          console.log("Course data:", courseData);
          console.log("Extracted data:", extractedData);
        } else {
          console.log("No such course document!");
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };
  
    loadCourses();
  }, []);
  


  const createEventId = () => String(Date.now());

  // const handleInsertEvent = () => {
  //   const newEvent = {
  //     id: createEventId(),
  //     name: eventName,
  //     date: eventDate,
  //     startHour: eventStartHour,
  //     endHour: eventEndHour,
  //     description: eventDescription,
  //   };

  //   const updatedSchedules = schedules.map((schedule, index) =>
  //     index === currentScheduleIndex ? { ...schedule, events: [...schedule.events, newEvent] } : schedule
  //   );

  //   setSchedules(updatedSchedules);
  //   setEventName('');
  //   setEventDate('');
  //   setEventStartHour('');
  //   setEventEndHour('');
  //   setEventDescription('');

  //   renderScheduleView();
  // };

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
          // <AcademicSchedule
          //   key={currentScheduleIndex}
          //   events={eventsData}
          //   onAddEvent={(newEvent) => setEvents([...events, { ...newEvent, id: createEventId() }])}
          // />

          <AcademicSchedule key={currentScheduleIndex} events={localEvents} onAddEvent={handleAddEvent} />
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
              <Button>Insert</Button>
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


// /*********** TEMPORARY  *************/

// const firebaseConfig = {
//   appId: "1:3501973170:web:30e6a542a61888df31f3ab"
// };

// const fbapp = initializeApp(firebaseConfig);
/************************************/

// const db = getFirestore(fbapp); // Initialize service

const colRef = collection(db, 'schedules'); // Reference to collection

getDocs(colRef) // Getting data from collection
  .then((snapshot) => {
    console.log(snapshot.docs)
  })
