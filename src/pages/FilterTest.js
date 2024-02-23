import React from "react";
import Filter from "../components/filter";
import SearchBar from "../components/searchBar";

export default function FilterTestPage() {
  const randList = [
    {course:"INGE-3016", degree:"INGE", code:"3016", credits: "3", name: "Algorithms"},
    {course:"CIIC-4020", degree:"CIIC", code:"4020", credits: "4", name: "Data"},
    {course:"MATE-3031", degree:"MATE", code:"3031", credits: "4", name: "Calc 1"},
    {course:"CIIC-4010", degree:"CIIC", code:"4010", credits: "4", name: "Advanced"},
    {course:"INSO-4101", degree:"INSO", code:"4101", credits: "3", name: "Intro to Software"}
  ];
  
  return (
    <div>
      <SearchBar data={randList}/>
      <Filter courseList={randList}/>
    </div>
  );
}