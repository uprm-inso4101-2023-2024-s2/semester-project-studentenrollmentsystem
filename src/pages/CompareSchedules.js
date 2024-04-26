import React, { useState, useEffect } from 'react';
import styles from '../styles/pages/compareSchedules.module.scss';
import DailySchedule from '../components/DailySchedule';  // Adjust this if you have different schedule types
import { Link } from 'react-router-dom';
import { db } from '../firebase'; // Adjust the path to where your Firebase config and exports are
import { collection, getDocs } from 'firebase/firestore';

export default function CompareSchedules() {
  const userId = 'user123'; // Ensure this matches the user ID used in CalendarPage
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const schedulesCol = collection(db, `users/${userId}/schedules`);  // Adjust path according to your Firestore schema
      const scheduleSnapshot = await getDocs(schedulesCol);
      const loadedSchedules = scheduleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(loadedSchedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  return (
    <div className={styles.comparePage}>
      <h1>Compare Schedules</h1>
      <div className={styles.schedulesContainer}>
        {schedules.map((schedule, index) => (
          <div key={index} className={styles.scheduleContainer}>
            <h3>{schedule.name}</h3>
            <DailySchedule events={schedule.events} />
          </div>
        ))}
      </div>
      <Link to="/">Back to Calendar</Link>
    </div>
  );
}
