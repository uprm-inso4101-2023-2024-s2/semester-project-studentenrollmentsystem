import React, { useState } from "react";
import styles from "../styles/components/studentCard.module.scss";

const StudentCard = ({
  className,
  initialStudentName,
  initialMajor,
  initialGpa,
  initialMissingCredits, // Add initialMissingCredits prop
  initialCreditsTaken, // Add initialCreditsTaken prop
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentName, setStudentName] = useState(initialStudentName);
  const [major, setMajor] = useState(initialMajor);
  const [gpa, setGpa] = useState(initialGpa);
  const [missingCredits, setMissingCredits] = useState(initialMissingCredits); // Add missingCredits state
  const [creditsTaken, setCreditsTaken] = useState(initialCreditsTaken); // Add creditsTaken state
  const [profileImage, setProfileImage] = useState("your_initial_image_url_here");
  const [counselorName, setCounselorName] = useState("");
  const [counselorPhone, setCounselorPhone] = useState("");
  const [counselorEmail, setCounselorEmail] = useState("");

  const saveEdits = () => {
    setIsEditing(false);
    if (onSave) {
      onSave({ studentName, major, gpa, missingCredits, creditsTaken }); // Include new properties in onSave
    }
  };

  const handleClick = () => {
    // Programmatically click the hidden file input
    document.getElementById("profile-image-upload").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`${styles.studentCard} ${className || ""}`.trim()}>
      <div className={styles.contentContainer}>
        <div className={styles.studentImage}>
          <input
            type="file"
            id="profile-image-upload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
            className={styles.uploadButton}
          />
          <button className={styles.uploadButton} onClick={handleClick}>
            Upload Image
          </button>
        </div>
        <div className={styles.studentInfo}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Student Name"
              />
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Major"
              />
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="GPA"
              />
              <input
                type="number" // Assuming credits are numeric
                value={missingCredits}
                onChange={(e) => setMissingCredits(e.target.value)}
                placeholder="Missing Credits"
              />
              <input
                type="number" // Assuming credits are numeric
                value={creditsTaken}
                onChange={(e) => setCreditsTaken(e.target.value)}
                placeholder="Credits Taken"
              />
              <input
                type="text" // Assuming credits are numeric
                value={creditsTaken}
                onChange={(e) => setCounselorName(e.target.value)}
                placeholder="Counselor Name"
              />
              <input
                type="text" // Assuming credits are numeric
                value={creditsTaken}
                onChange={(e) => setCounselorEmail(e.target.value)}
                placeholder="Counselor E-mail"
              />
              <input
                type="text" // Assuming credits are numeric
                value={creditsTaken}
                onChange={(e) => setCounselorPhone(e.target.value)}
                placeholder="Counselor Phone"
              />
            </>
          ) : (
            <>
              <div>{studentName || "STUDENT NAME"}</div>
              <div>{major || "MAJOR"}</div>
              <div>{gpa || "GPA"}</div>
              <div>{missingCredits || "MISSING CREDITS"}</div>
              <div>{creditsTaken || "CREDITS TAKEN"}</div>
              <div>{counselorName || "COUNSELOR Name"}</div>
              <div>{counselorEmail || "COUNSELOR E-MAIL"}</div>
              <div>{counselorPhone || "COUNSELOR Phone"}</div>
            </>
          )}
        </div>
      </div>
      {isEditing ? (
        <button className={styles.editButton} onClick={saveEdits}>
          Save
        </button>
      ) : (
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default StudentCard;
