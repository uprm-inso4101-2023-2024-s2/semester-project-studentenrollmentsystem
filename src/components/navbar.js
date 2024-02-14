import React, { useState } from "react";
import styles from "../styles/components/navbar.module.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  // Determine if NavBar menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.logo}>
        <Link to="/">MATRICULA UPRM</Link>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
      </ul>
    </nav>
  );
}
