import React, { useState, useEffect } from "react";
import styles from "../styles/pages/studentPage.module.scss";
import Button from "../components/button";
import Coursetable from "../components/courseTable";
import Coursetable2 from "../components/courseTable2";
import Scheduletable from "../components/scheduleTable";

function StudentPage() {
  const [isTable1Visible, setIsTable1Visible] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isTable2Visible, setIsTable2Visible] = useState(false);

  const [profileImage, setProfileImage] = useState("https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg");
  const [name, setName] = useState("pedro");
  const [depa, setDepa] = useState("INSO");
  const [gpa, setGpa] = useState("4.00");
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isProfileSwitchOn, setIsProfileSwitchOn] = useState(false);
  
  const [bio, setBio] = useState("Talk about you...");
  const [editedBio, setEditedBio] = useState("");
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [customLink1, setCustomLink1] = useState("");
  const [customLink2, setCustomLink2] = useState("");
  const [showAcademicCalendar, setShowAcademicCalendar] = useState(false);
  const [customButtonText, setCustomButtonText] = useState(["", ""]);

  useEffect(() => {
    const setTitleToButton = () => {
      const pageTitle = document.title;
      if (customLink1) {
        setCustomButtonText((prev) => {
          const updatedArray = [...prev];
          updatedArray[0] = pageTitle;
          return updatedArray;
        });
      }
      if (customLink2) {
        setCustomButtonText((prev) => {
          const updatedArray = [...prev];
          updatedArray[1] = pageTitle;
          return updatedArray;
        });
      }
    };
    setTitleToButton();
  }, [customLink1, customLink2]);

  const toggleIsTable1 = () => {
    setIsTable1Visible((current) => !current);
    setIsDropdownVisible(false); // Close the dropdown when switching tables
    setIsTable2Visible(false); // Close Coursetable2 when switching tables
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((current) => !current);
    //setIsTable2Visible(false); // Close Coursetable2 when opening the dropdown
  };

  const toggleIsTable2 = () => {
    setIsTable2Visible((current) => !current);
    setIsDropdownVisible(false); // Close the dropdown when switching tables
    setIsTable1Visible(false); // Hide Coursetable when opening Coursetable2
  };

  const handleProfileEdit = () => {
    setIsProfileEditing(true);
  };

  const handleProfileSwitchToggle = () => {
    setIsProfileSwitchOn((prev) => !prev);
  };

  const handleBioEdit = () => {
    setIsBioEditing(true);
    setEditedBio(bio);
  };

  const handleChange = (e) => {
    setBio(e.target.value);
  };

  const handleSaveBio = () => {
    setIsBioEditing(false);
    console.log("Bio saved:", bio);
  };

  const handleCancelBio = () => {
    setIsBioEditing(false);
    setBio(editedBio);
  };

  const handleCustomButtonClick = (linkState, setLinkState, index) => {
    if (linkState) {
      window.open(linkState, "_blank");
    } else {
      const link = prompt("Enter the link:");
      if (link) {
        setLinkState(link);
        setCustomButtonText((prev) => {
          const updatedArray = [...prev];
          updatedArray[index - 1] = document.title;
          return updatedArray;
        });
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Name:", name);
    console.log("Depa:", depa);
    console.log("GPA:", gpa);
    console.log("Total Remaining:", totalRemaining);
    console.log("Total Credits:", totalCredits);
    setIsProfileEditing(false);
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
    <div className={styles.StudentPage}>
      <label htmlFor="profile-image-upload" className={styles.newProfileIcon} onClick={() => document.getElementById('profile-image-upload').click()}>
        <img
          src={profileImage || "/default-profile-icon.png"}
          className={styles.profileIcon}
          alt="profile"
        />
      </label>

      <div className={styles.topbar} id="topbarid">
        <span className={styles.btntitle} onClick={() => window.scrollTo(0, 0)}>
          Perfil Estudiantil
        </span>
        <span className={styles.user}>
          <label htmlFor="profile-image-upload">
            <img
              src={profileImage || "/default-profile-icon.png"}
              className={styles.userimg}
              alt="user"
            />
          </label>
        </span>
      </div>

      <input
        id="profile-image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <div className={styles.mainpage}>
        <div className={styles.profileside}>
          <h1>Profile</h1>
          <form>
            {isProfileSwitchOn ? (
              <>
                <label htmlFor="totalRemaining"className={styles.movedRight}>Total Remaining:</label>
                <input
                  type="text"
                  id="totalRemaining"
                  value={totalRemaining}
                  onChange={(e) => setTotalRemaining(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="totalCredits"className={styles.movedRight}>Total Credits:</label>
                <input
                  type="text"
                  id="totalCredits"
                  value={totalCredits}
                  onChange={(e) => setTotalCredits(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="totalCredits"className={styles.movedRight}style={{ visibility: 'hidden' }}>Total Credits:</label>
                <input
                  style={{ visibility: 'hidden' }}
                  type="text"
                  id="totalCredits"
                  value={totalCredits}
                  onChange={(e) => setTotalCredits(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
              </>
            ) : (
              <>
                <label htmlFor="name"className={styles.movedRight}>Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="depa"className={styles.movedRight}>Depa:</label>
                <input
                  type="text"
                  id="depa"
                  value={depa}
                  onChange={(e) => setDepa(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
                <label htmlFor="gpa"className={styles.movedRight}>GPA:</label>
                <input
                  type="text"
                  id="gpa"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  readOnly={!isProfileEditing}
                  className={styles.movedRight}
                />
              </>
            )}

            <div className={styles.switchContainer}>
              <div onClick={handleProfileSwitchToggle} className={styles.switch}>
                <span className={styles.slider} />
                <img
                  src="/switch_icon.png"
                  alt="Switch Icon"
                  className={`${styles.switchIcon} ${isProfileSwitchOn ? styles.switchOn : styles.switchOff}`}
                />
              </div>
            </div>
          </form>

          {isProfileEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleProfileEdit}>Edit</button>
          )}
        </div>

        <div className={styles.curriculumside}>
          <h1>Curriculum: Spring 2024</h1>

          <div className={styles.viewbutton}>
            <Button onClick={toggleDropdown}>Past Semesters</Button>
            <Button onClick={toggleIsTable1}>Switch Views</Button>
            {isDropdownVisible && (
              <div className={styles.additionalButtons}>
                <Button onClick={toggleIsTable2}>Fall Semester 2023</Button>
                {/* Add more buttons as needed */}
              </div>
            )}
          </div>

          <div className={styles.tableview}>
            {isTable1Visible && !isTable2Visible && <Coursetable />}
            {isTable2Visible && <Coursetable2 />}
            {!isTable1Visible && !isTable2Visible && <Scheduletable />}
          </div>
        </div>
      </div>

      <div className={styles["green-square-container"]}>
        <div className={styles["green-square"]}>
          <p className={styles["bio-title"]}>Bio</p>

          {isBioEditing ? (
            <div className={styles["green-square"]}>
              <textarea
                value={bio}
                onChange={handleChange}
                className={styles["bio-textarea"]}
              ></textarea>

              <button className={styles["save-button"]} onClick={handleSaveBio}>
                Save
              </button>
              <button className={styles["save-button"]} onClick={handleCancelBio}>
                Cancel
              </button>
            </div>
          ) : (

            <div onClick={handleBioEdit}>
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

          {customLink1 ? customButtonText[0] || "Custom Button 1" : "Set Custom Link 1"}

        </button>
        <button
          className={`${styles["custom-button"]} ${styles["hover-highlight"]}`}
          onClick={() => handleCustomButtonClick(customLink2, setCustomLink2, 2)}
        >

          {customLink2 ? customButtonText[1] || "Custom Button 2" : "Set Custom Link 2"}
        </button>
      </div>
    </div>
  );
}

export default StudentPage;
