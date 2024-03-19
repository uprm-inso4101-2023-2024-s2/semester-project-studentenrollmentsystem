import React from "react";
import styles from "../styles/pages/homePage.module.scss";
import News from "../components/news";
import logo from "../img/uprm.png";
import { Link } from "react-router-dom";

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

