import React from "react";
import "../styles/pages/studentPage.css"

function StudentPage() {
  return (
    <>
      <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet"></link>
      <div className="topbar" id="topbarid">
        <i className="bx bx-menu" id="btn1" onMouseEnter={openNav} onMouseLeave={closeNav}>
        </i>
        <span className="btntitle">
          Perfil Estudiantil
        </span>
        <span className="user">
          <img src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg" className="user-img"></img>
        </span>
        <nav className="list" id="listid">
        </nav>
      </div>
        
      <div className="main-page">
        <div className="profile-side">
          <h1>Profile</h1>
        </div>
        <div className="curriculum-side">
          <h1>Curriculum</h1>
        </div>
      </div>
    </>
  );
}

export default StudentPage;

function openNav()
{
  document.getElementById("btn1").style.rotate = "90deg";
  document.getElementById("topbarid").style.height = "10vh";
}
function closeNav()
{
  document.getElementById("btn1").style.rotate = "0deg";
  document.getElementById("topbarid").style.height = "100%";
}