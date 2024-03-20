import React from 'react';
import styles from "../styles/components/footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Student Enrollment System. All rights reserved.</p>
      <p>For support, email us at: support@enrollmentsystem.edu</p>
    </footer>
  );
};

export default Footer;
