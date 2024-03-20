import React from "react";
import styles from "../styles/pages/homePage.module.scss";
import News from "../components/news";
import logo from "../img/uprm.png";
import { Link } from "react-router-dom";import Button from "../components/button";
import AcademicSchedule from "../components/AcademicSchedule";

export default function HomePage() {
  return (
    <div>
      <h1 style={{textAlign: "left", marginLeft: "8%", fontSize: "500%", marginTop:"3%"}}>IMPORTANT NOTICES</h1>
      <h3 style={{textAlign: "left", marginLeft: "8%", fontSize: "150%", marginTop:"-3%"}}>Log in to your account to check your registration turn</h3>
      
      <div className = {styles["flex"]}>
        <News/>
        <div className={styles["menu"]}>
          <Link to="/" style={{textDecoration: "none", color: "black"}}>
            <h1 style={{fontSize: "175%", marginBottom: "0%", cursor: "pointer"}}>• Registration Adjustments</h1>
          </Link>
          <Link to="/calendar" style={{textDecoration: "none"}}>
            <h1 style={{fontSize: "175%", color: "black"}}>• Calendar</h1>
          </Link>
          <Link to="/offered-courses" style={{textDecoration: "none"}}>
            <h1 style={{fontSize: "175%", color: "black"}}>• Course Offerings</h1>
          </Link>
          <Link to="/" style={{textDecoration: "none"}}>
            <h1 style={{fontSize: "175%", color: "black"}}>• Digital Service Platform</h1>
          </Link>
          <Link to="/" style={{textDecoration: "none"}}>
            <h1 style={{fontSize: "175%", color: "black"}}>• Admissions</h1>
          </Link>
          
          <button 
            className={styles["boton"]}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#308751"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#40976A"}
          >
            Enroll Now
          </button>

          <h2 style={{ marginLeft: "-30%", marginBottom: "0%" }}>External Resources</h2>
          <ul style={{ listStyleType: "circle", textAlign: "left", marginLeft: "0%", marginTop: "2%" }}>
            <li><a href="https://www.uprm.edu/mateng/academic-calendar-2/">Academic Google Calendar</a></li>
            <li><a href="https://portal.upr.edu/rum/portal.php?a=rea_login">Portal UPRM</a></li>
            <li><a href="https://home.uprm.edu/index.php?l=0">Home UPRM</a></li>
            <li><a href="https://www.uprm.edu/admisiones/">Admissions Office</a></li>
            <li><a href="https://www.uprm.edu/cms/index.php/page/1648">Emergency Contacts</a></li>
          </ul>
          
          <div>
            <h3 style={{ marginLeft: "0%", marginBottom: "0%" }}>PROJECTED CALENDAR</h3>
            {/* Render the calendar component here */}
            <AcademicSchedule events={[]} />
          </div>
        </div>
        
      </div>
      <div className={styles["uprm-logo"]}>
        <img
          src={logo}
          alt="UPRM Logo"
          className={styles["uprm-logo"]}
        />
      </div>
    </div>
  );
}

