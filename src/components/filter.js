import React from 'react'
import styles from "../styles/components/filter.module.scss"

export default function Filter({courseList}) {  
  const toggleFilterMenu = () => {
    var x = document.getElementById("filterMenu");
    x.style.display === "grid" ? x.style.display = "none" :
    x.style.display = "grid";
  };

  // Filters
  const[filteredData, setFilteredData] = React.useState([]);
  const[degree, setDegree] = React.useState([]);
  const[credits, setCredits] = React.useState([]);
  const[keyword, setKeyword] = React.useState([]);

  const[courseData, setCourseData] = React.useState([]);
  React.useEffect(()=>{
    setCourseData(courseList);
    setFilteredData(courseList);
  },[]);

  const applyFilters = () => {
    const filteredCourseData = courseData
      .filter(x => x.degree == (degree == '' ? x.degree : degree))
      .filter(y => y.credits == (credits == '' ? y.credits : credits));
    setFilteredData(filteredCourseData);
  };

  return (
    <div className={styles.filter}>
      <button className={styles.button} onClick={()=>
        toggleFilterMenu()}></button>
      <div id="filterMenu">
        <input type="text" placeholder="Keywords"
          onChange={(e)=>setKeyword(e.target.value)}/>
        <select onChange={(e)=>setDegree(e.target.value)}>
          <option value="">Filter by Degree</option>
          <option value="CIIC">CIIC</option>
          <option value="INSO">INSO</option>
        </select>
        <select onChange={(e)=>setCredits(e.target.value)}>
          <option value=""># Credits</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button onClick={()=>applyFilters()}>Apply Filters</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Degree</th>
              <th># Credits</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((course, index) => (
              <tr key={index}>
                <td>{course.course}</td>
                <td>{course.degree}</td>
                <td>{course.credits}</td>
              </tr>
            ))};
          </tbody>
        </table>
      </div>
    </div>
  );
}