import React, { useState } from "react";
import styles from "../styles/pages/homePage.module.scss";
import News from "../components/news";
import { Link } from "react-router-dom";
import Button from "../components/button";
import AcademicSchedule from "../components/AcademicSchedule";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Papa from "papaparse";
import { db } from "../firebase"; // Import db for Firestore operations

export default function HomePage({ events, onAddEvent }) {
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        results.data.forEach(async (row) => {
          try {
            const docRef = await addDoc(collection(db, "electives"), row);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      },
    });
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "left",
          marginLeft: "8%",
          fontSize: "500%",
          marginTop: "3%",
        }}
      >
        IMPORTANT NOTICES
      </h1>
      <h3
        style={{
          textAlign: "left",
          marginLeft: "8%",
          fontSize: "150%",
          marginTop: "-3%",
        }}
      >
        Log in to your account to check your registration turn
      </h3>

      <div className={styles.body}>
        <div className={styles.links}>
          <div className={styles.news}>
            <News />
          </div>
          <div className={styles.menu}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <h1
                style={{
                  fontSize: "175%",
                  marginBottom: "0%",
                  cursor: "pointer",
                }}
              >
                • Registration Adjustments
              </h1>
            </Link>
            <Link to="/calendar" style={{ textDecoration: "none" }}>
              <h1 style={{ fontSize: "175%", color: "black" }}>• Calendar</h1>
            </Link>
            <Link to="/offered-courses" style={{ textDecoration: "none" }}>
              <h1 style={{ fontSize: "175%", color: "black" }}>
                • Course Offerings
              </h1>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 style={{ fontSize: "175%", color: "black" }}>
                • Digital Service Platform
              </h1>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h1 style={{ fontSize: "175%", color: "black" }}>• Admissions</h1>
            </Link>
            <div>
              <button
                className={styles.boton}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#308751")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#40976A")
                }
              >
                Enroll Now
              </button>
            </div>
            <input type="file" onChange={handleFileUpload} accept=".csv" />
          </div>
        </div>

        <div className={styles.calendarcontainer}>
          <div>
            <h3>PROJECTED CALENDAR</h3>
            <AcademicSchedule
              events={localEvents}
              onAddEvent={handleAddEvent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
