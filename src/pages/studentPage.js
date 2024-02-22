import React, { useState } from "react";
import styles from "../styles/pages/studentPage.module.scss";

function StudentPage() {
  const [profileImage, setProfileImage] = useState("https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg");
  const [name, setName] = useState("pedro");
  const [depa, setDepa] = useState("INSO");
  const [gpa, setGpa] = useState("4.00");
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

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
    setIsEditing(false);
  };

  const handleSwitchToggle = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <>
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

      {/* Input field for uploading profile image */}
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
            {isSwitchOn ? (
              <>
                <label htmlFor="totalRemaining">Total Remaining:</label>
                <input
                  type="text"
                  id="totalRemaining"
                  value={totalRemaining}
                  onChange={(e) => setTotalRemaining(e.target.value)}
                  readOnly={!isEditing}
                />
                <label htmlFor="totalCredits">Total Credits:</label>
                <input
                  type="text"
                  id="totalCredits"
                  value={totalCredits}
                  onChange={(e) => setTotalCredits(e.target.value)}
                  readOnly={!isEditing}
                />
              </>
            ) : (
              <>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!isEditing}
                />
                <label htmlFor="depa">Depa:</label>
                <input
                  type="text"
                  id="depa"
                  value={depa}
                  onChange={(e) => setDepa(e.target.value)}
                  readOnly={!isEditing}
                />
                <label htmlFor="gpa">GPA:</label>
                <input
                  type="text"
                  id="gpa"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  readOnly={!isEditing}
                />
              </>
            )}

            {/* Switch button */}
            <div className={styles.switchContainer}>
              {/* Use a clickable container for the image */}
              <div onClick={handleSwitchToggle} className={styles.switch}>
                {/* Remove the default switch appearance */}
                <span className={styles.slider} />
                {/* Add the image/icon to act as the switch button */}
                <img
                  src="/switch_icon.png"
                  alt="Switch Icon"
                  className={`${styles.switchIcon} ${isSwitchOn ? styles.switchOn : styles.switchOff}`}
                />
              </div>
            </div>
          </form>

          {/* Edit/Save button */}
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>

        <div className={styles.curriculumside}>
          <h1>Curriculum</h1>
        </div>
      </div>
    </>
  );
}

export default StudentPage;
