import React from 'react';
import styles from "../styles/components/footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Student Enrollment System. All rights reserved.</p>
      <h3>External Resources</h3>
      <ul style={{ listStyleType: "none", textAlign: "center"}}>
        <li><a href="https://www.uprm.edu/mateng/academic-calendar-2/">Academic Google Calendar</a></li>
        <li><a href="https://portal.upr.edu/rum/portal.php?a=rea_login">Portal UPRM</a></li>
        <li><a href="https://home.uprm.edu/index.php?l=0">Home UPRM</a></li>
        <li><a href="https://www.uprm.edu/admisiones/">Admissions Office</a></li>
        <li><a href="https://www.uprm.edu/cms/index.php/page/1648">Emergency Contacts</a></li>
      </ul>
      <p>For support, email us at: support@enrollmentsystem.edu</p>
    </footer>
  );
};

export default Footer;
