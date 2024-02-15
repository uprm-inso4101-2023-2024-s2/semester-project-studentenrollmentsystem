import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/components/navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Determine if NavBar menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

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

    return () => {
      document.removeEventListener("click", closeMenu); // Cleanup event listener to prevent memory leaks
    };
  }, [isOpen]); // Dependency array to re-run if 'isOpen' changes

  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.logo}>
        <Link to="/">MATRICULA UPRM</Link>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
        <li onClick={closeNavItem}>
          <Link to="/home" >Home</Link>
        </li>
        <li onClick={closeNavItem}>
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
}
