import React, { useState, useEffect } from "react";
import styles from "../styles/pages/studentPage.module.scss";

function StudentPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Talk about you...");
  const [editedBio, setEditedBio] = useState("");
  const [customLink1, setCustomLink1] = useState("");
  const [customLink2, setCustomLink2] = useState("");
  const [showAcademicCalendar, setShowAcademicCalendar] = useState(false);

  useEffect(() => {
    const setTitleToButton = () => {
      const pageTitle = document.title;
      if (customLink1) {
        setCustomButtonText(1, pageTitle);
      }
      if (customLink2) {
        setCustomButtonText(2, pageTitle);
      }
    };
    setTitleToButton();
  }, [customLink1, customLink2]);

  const [customButtonText, setCustomButtonText] = useState(["", ""]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedBio(bio);
  };

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Bio saved:", bio);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBio(editedBio);
  };

  const handleCustomButtonClick = (linkState, setLinkState, index) => {
    if (linkState) {
      window.open(linkState, "_blank");
    } else {
      const link = prompt("Enter the link:");
      if (link) {
        setLinkState(link);
        setCustomButtonText(index, document.title);
      }
    }
  };

  const generateDummyAcademicCalendar = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const numberOfDaysInMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate();    
    const dummyCalendarData = Array.from({ length: numberOfDaysInMonth }, (_, index) => {
      const date = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), index + 1);     
      return `${date.toLocaleDateString("en-US", { weekday: "long" })} ${date.getDate()} ${date.toLocaleDateString("en-US", { month: "long" })} ${date.getFullYear()} - Event`;
    });

    return (
      <div className={styles.academicCalendar}>
        <h1>Academic Calendar</h1>
        <ul>
          {dummyCalendarData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className={styles.topbar} id="topbarid">
        <span className={styles.btntitle}>Perfil Estudiantil</span>
        <span className={styles.user}>
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
            className={styles.userimg}
            alt="user"
          />
        </span>
      </div>

      <div className={styles.mainpage}>
        <div className={styles.profileside}>
          <h1>Profile</h1>
        </div>
        <div className={styles.curriculumside}>
          <h1>Curriculum</h1>
        </div>
      </div>

      <div className={styles["green-square-container"]}>
        <div className={styles["green-square"]}>
          <p className={styles["bio-title"]}>Bio</p>
          {isEditing ? (
            <div className={styles["green-square"]}>
              <textarea
                value={bio}
                onChange={handleChange}
                className={styles["bio-textarea"]}
              ></textarea>
              <button className={styles["save-button"]} onClick={handleSave}>
                Save
              </button>
              <button className={styles["save-button"]} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <div onClick={handleEdit}>
              <p>{bio}</p>
              <button className={`${styles["edit-button"]} ${styles["hover-highlight"]}`}>
                Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {showAcademicCalendar && generateDummyAcademicCalendar()}

      <button
        className={`${styles["switch"]} ${styles["hover-highlight"]}`}
        onClick={() => setShowAcademicCalendar(!showAcademicCalendar)}
      >
        <img src="/switch_icon.png" alt="Switch Icon" className={styles.switchIcon} />
      </button>

      <div className={styles["button-container-left"]}>
        <button
          className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
          onClick={() => handleCustomButtonClick(customLink1, setCustomLink1, 1)}
        >
          {customLink1 ? customButtonText[1] || "Custom Button 1" : "Set Custom Link 1"}
        </button>
        <button
          className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
          onClick={() => handleCustomButtonClick(customLink2, setCustomLink2, 2)}
        >
          {customLink2 ? customButtonText[2] || "Custom Button 2" : "Set Custom Link 2"}
        </button>
      </div>
    </>
  );
}

export default StudentPage;
