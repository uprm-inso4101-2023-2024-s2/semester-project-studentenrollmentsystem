import React from 'react';
import styles from '../styles/pages/aboutus.module.scss';

function AboutUs() {
    return (
        <div className={styles.aboutuspage}>
            <div className={styles.header}>
                <h1>About Us</h1>
            </div>
            <div className={styles.content}>
                <p>We are a dedicated team of college students from the University of Puerto Rico at Mayagüez Campus, brought together by our passion for technology and education.</p>
                <p>Our team consists of talented individuals with diverse backgrounds in computer science, engineering, and programming, united in our goal to make a positive impact on our university community.</p>
                <p>At the heart of our mission is the development of a cutting-edge student enrollment program. This program aims to streamline the enrollment process, providing students with a seamless experience from application to registration.</p>
                <p>Through our innovative solutions, we seek to empower both students and administrators, revolutionizing the way enrollment is managed and enhancing the overall educational experience.</p>
                <p>Our journey is fueled by collaboration, creativity, and a commitment to excellence. Together, we strive to create a brighter future for education 
                    at the University of Puerto Rico at Mayagüez Campus and beyond.</p>
 
                <p>If you have any questions or inquiries, feel free to contact us:</p>
                <p>Email: support@enrollmentsystem.edu</p>
                <p>Phone: +1 787-234-5678</p>
                <p>Address: UPR Mayagüez, Mayagüez, Puerto Rico, 00680</p>
            </div>
        </div>
    );
}

export default AboutUs;
