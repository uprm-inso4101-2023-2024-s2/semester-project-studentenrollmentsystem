import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/components/navbar.module.scss";
import { Link } from "react-router-dom";
import profileImage from "../img/profile.png"; // Import your profile image

export default function Navbar() {
  // Determine if NavBar menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const navbarRef = useRef(null); //  useRef creates a reference object that can be attached to a Document Object Model (DOM) element for direct manipulation. Here, it will be used to access the <nav> element and its properties in the component.

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeNavItem = () => { //Function to be called when a navItem is clicked on
    //Close navbar 
    setIsOpen(false);
  }
  useEffect(() => {
    const closeMenu = (e) => { // If navbar is open, and the click is not in the navbar, close the navbar
      if (isOpen && navbarRef.current && !navbarRef.current.contains(e.target)) { // use navbar ref to check if the click is on the navbar or sub elements
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeMenu); // Add event listener to detect the clicks

    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update current date and time every second

    
    return () => {
      document.removeEventListener("click", closeMenu); // Cleanup event listener to prevent memory leaks
      clearInterval(intervalId);
      
    };
  }, [isOpen]); // Dependency array to re-run if 'isOpen' changes

  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      <div className={styles.logo} onClick={closeNavItem}>
          <img src='rum.png' alt="Logo" className={styles.logoImage} />
      </div>

      <div className={styles.logo} onClick={closeNavItem}>
        <Link to="/" className={styles.logoLink}>
          <span>MATRICULA UPRM</span>
        </Link>
      </div>


      <div className={`${styles.dateAndTime} ${styles.dateAndTimeCustom}`}>
      {currentDateTime.toLocaleString()}
    </div>
        <Link to="/">STUDENT ENROLLMENT SYSTEM</Link>
      </div>      

      <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
        <li onClick={closeNavItem}>
          <Link to="/" >Home</Link>
        </li>
        <li onClick={closeNavItem}>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li onClick={closeNavItem}>
          <Link to="/studentpage">StudentPage</Link>
        </li>
        <li onClick={closeNavItem}>
          <Link to="/offered-courses">Courses Offered</Link>
        </li>
        <li onClick={closeNavItem}>
          <Link to="/filter-test">Filter-test</Link>
        </li>
        <li onClick={closeNavItem}>
          <Link to="/professor-info">Professors Info</Link>
          
          <Link to="/free-electives">Free Electives</Link>

        </li>
      </ul>
      <div className={styles.profile}>
        <Link to="/login">
          <img src={profileImage} alt="Profile" className={styles.profileImage} />
        </Link>
      </div>
    </nav>
  );
}
