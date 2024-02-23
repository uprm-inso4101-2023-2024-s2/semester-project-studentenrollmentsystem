import React from 'react'
import styles from "../styles/components/searchBar.module.scss"

export default function SearchBar({data}) {  
  const[searchData, setSearchData] = React.useState([]);
  const[searchResults, setSearchResults] = React.useState([]);
  React.useEffect(()=>{
    setSearchData(data);
    setSearchResults(data);
  },[data]);

  const search = (keyword) => {
    keyword = keyword.toUpperCase();
    const results = searchData.filter(
      (course) =>
        course.course.includes(keyword) ||
        course.degree.includes(keyword) ||
        course.code.includes(keyword) ||
        course.name.includes(keyword)
    );  
    setSearchResults(results);
  };

  return (
    <div className={styles.searchBar}>
      <input id="searchInput" type="text" placeholder="Search for Something: "
        onChange={(e)=>search(e.target.value)}/>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Degree</th>
            <th># Credits</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((course, index) => (
            <tr key={index}>
              <td>{course.course}</td>
              <td>{course.degree}</td>
              <td>{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}