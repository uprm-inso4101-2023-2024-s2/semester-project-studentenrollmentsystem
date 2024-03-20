import React, { useEffect, useState } from "react";
import styles from "../styles/components/tuitionNotification.module.scss";

// Mock function to fetch tuition due date from an API
const fetchTuitionDueDate = async () => {
  // Replace with actual API call
  return "2024-07-02T13:00:00"; // Example date
};

const TuitionNotification = () => {
  const [dueDate, setDueDate] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isVisible, setIsVisible] = useState(true); // Controls the overall visibility
  const [shouldAnimate, setShouldAnimate] = useState(true); // Controls the animation

  useEffect(() => {
    const getTuitionDueDate = async () => {
      const dueDateStr = await fetchTuitionDueDate();
      setDueDate(new Date(dueDateStr).toLocaleString());
      calculateTimeLeft(dueDateStr);
    };

    getTuitionDueDate();

    // Start fade out animation before completely hiding the notification
    const startFadeOut = setTimeout(() => {
      setShouldAnimate(false);
    }, 4500); // Start fade out 0.5s before hiding to allow for animation

    // Completely hide the notification after a set time
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(startFadeOut);
      clearTimeout(timer);
    };
  }, []);

  const calculateTimeLeft = (dueDateStr) => {
    const today = new Date();
    const due = new Date(dueDateStr);
    const timeDiff = due - today;

    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiff = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    setTimeLeft({
      days: daysDiff,
      hours: hoursDiff,
      minutes: minutesDiff,
    });
  };

  //When the timer expires, the notification is hidden
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.background} ${
        shouldAnimate ? styles.visible : styles.hidden
      }`}
    >
      <p className={styles.title}>REMINDER:</p>
      <p className={styles.message}>Tuition is due on {dueDate}. </p>
      <p className={styles.timeLeft}>
        {timeLeft.days} Days, {timeLeft.hours} Hours, {timeLeft.minutes} Minutes
        Left
      </p>
    </div>
  );
};

export default TuitionNotification;
