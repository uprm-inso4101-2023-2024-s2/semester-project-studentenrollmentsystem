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
  const[code, setCode] = React.useState([]);

  const[courseData, setCourseData] = React.useState([]);
  React.useEffect(()=>{
    setCourseData(courseList);
    setFilteredData(courseList);
  },[]);

  const applyFilters = () => {
    const filteredCourseData = courseData
      .filter(x => x.degree == (degree == '' ? x.degree : degree))
      .filter(y => y.credits == (credits == '' ? y.credits : credits))
      .filter(z => z.name == (keyword == '' ? z.name : keyword))
      .filter(w => w.code == (code == '' ? w.code : code));
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
          <option value="">Degree</option>
          <option value="CIIC">CIIC</option>
          <option value="INGE">INGE</option>
          <option value="INSO">INSO</option>
          <option value="MATE">MATE</option>
        </select>
        <select onChange={(e)=>setCredits(e.target.value)}>
          <option value=""># Credits</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <select onChange={(e)=>setCode(e.target.value)}>
          <option value="">Course Code</option>
          <option value="3016">3016</option>
          <option value="3031">3031</option>
          <option value="4010">4010</option>
          <option value="4020">4020</option>
          <option value="4101">4101</option>
        </select>

        <button onClick={()=>applyFilters()}>Apply Filters</button>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Degree</th>
              <th>Course Code</th>
              <th># Credits</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((course, index) => (
              <tr key={index}>
                <td>{course.course}</td>
                <td>{course.degree}</td>
                <td>{course.code}</td>
                <td>{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}