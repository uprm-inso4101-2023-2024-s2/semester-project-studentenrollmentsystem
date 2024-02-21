import React from 'react'
import styles from "../styles/components/filter.module.scss"

export default function Filter({courseList}) {  
  const toggleFilterMenu = () => {
    var x = document.getElementById("filterMenu");
    x.style.display === "grid" ? x.style.display = "none" :
    x.style.display = "grid";
  };

  return (
    <div className={styles.filter}>
        <button className={styles.button} onClick={()=>
          toggleFilterMenu()}></button>
        <div id="filterMenu">
          <input type="text" placeholder="Keywords"/>
          <select>
            <option value="">Filter by Degree</option>
            <option value="CIIC">CIIC</option>
            <option value="INSO">INSO</option>
          </select>
          <select>
            <option value=""># Credits</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Apply Filters</button>
        </div>
    </div>
  );
}