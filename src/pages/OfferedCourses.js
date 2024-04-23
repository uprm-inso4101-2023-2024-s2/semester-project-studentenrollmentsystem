import React, { useState, useEffect } from "react";
import CourseList from "../components/courselist.js"; // Adjust the import path as needed
import styles from "../styles/pages/offeredcourses.module.scss";
import Card from "../components/card.js";
import TuitionNotification from "../components/TuitionNotification.js";

function OfferedCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const offeredCourses = [
    {
      id: 1,
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG",
      title: "Advanced Programming",
      description: "Advanced programming techniques applied to the solution of engineering problems.",
      instructor: "Bienvenido Velez",
      credits: "4 credits",
    },
    {
      id: 2,
      image: "/logo512.png",
      title: "Data Structures",
      description: "Learn the fundamentals of data structures",
    },
    {
      id: 3,
      image: "/logo512.png",
      title: "Machine Learning",
      description: "Learn the fundamentals of machine learning",
    },
    {
      id: 4,
      image: "/logo512.png",
      title: "Algorithm Analysis",
      description: "Learn the fundamentals of machine learning",
    },
    {
      id: 5,
      image: "/logo512.png",
      title: "Computer Data Bases",
      description: "Learn the fundamentals of machine learning",
    },
    {
      id: 6,
      image: "/logo512.png",
      title: "Operating Systems",
      description: "Learn the fundamentals of machine learning",
    },
    {
      id: 7,
      image: "/logo512.png",
      title: "Intro to Software Engineering",
      description: "Learn the fundamentals of software engineering",
    },
    // Add more courses as needed
  ];
  

  // Update the filteredCourses based on the search query
  useEffect(() => {
    if (searchQuery.length === 0) {
      setFilteredCourses(offeredCourses);
    } else {
      const filtered = offeredCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery]);

  return (
    <div className={styles.body}>
      <TuitionNotification />
      <div className={styles.offeredCourses}>
        <div className={styles.header}>
          <h2>OFFERED COURSES</h2>
          <input
            type="text"
            placeholder="Search courses by title..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
        </div>
        <CourseList courses={filteredCourses} />
      </div>
    </div>
  );
}

export default OfferedCourses;
