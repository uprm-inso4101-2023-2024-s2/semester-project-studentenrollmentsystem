import React, { useState, useEffect } from "react";
import styles from "../styles/pages/free-electives.module.scss";
import { db } from "../firebase"; // Ensure you have a module to export your Firebase configurations
import { collection, query, onSnapshot } from "firebase/firestore";

export default function FreeElectives() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [courses, setCourses] = useState([]);

  // Fetch courses from Firestore
  useEffect(() => {
    const q = query(collection(db, "electives"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const coursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Courses fetched:", coursesData); // Log the fetched courses data
      setCourses(coursesData);
      setFilteredCourses(coursesData); // Initialize filteredCourses with all courses
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to handle search input
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = courses.filter(
      (course) =>
        course.curso.toLowerCase().includes(searchTerm) ||
        course.descripcion.toLowerCase().includes(searchTerm) ||
        (course.prerequisitos &&
          course.prerequisitos.toLowerCase().includes(searchTerm))
    );

    setFilteredCourses(filtered);
  };

  // Calculate pagination details
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredCourses.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  // Function to handle changing the number of entries per page
  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  // Pagination controls
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={styles.Home}>
      <h1>Free Electives</h1>
      <div className={styles.TopControls}>
        <input
          type="text"
          placeholder="Search course..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.SearchBar}
        />
        <label htmlFor="showEntries">Show entries:</label>
        <select
          id="showEntries"
          value={entriesPerPage}
          onChange={handleEntriesPerPageChange}
          className={styles.ShowEntries}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className={styles.TableContainer}>
        <table className={styles.Table}>
          <thead>
            <tr>
              <th>CURSO</th>
              <th>DESCRIPCION</th>
              <th>CRS</th>
              <th>PREREQUISITOS</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((course, index) => (
              <tr key={index}>
                <td>{course.title || "N/A"}</td>
                <td>{course.description || "N/A"}</td>
                <td>{course.credits || "N/A"}</td>
                <td>{course.prerequisites || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.Pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentEntries.length < entriesPerPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
