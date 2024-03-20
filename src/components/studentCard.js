import React, { useState } from "react";
import styles from "../styles/components/studentCard.module.scss";

const StudentCard = ({
  className,
  initialStudentName,
  initialMajor,
  initialGpa,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentName, setStudentName] = useState(initialStudentName);
  const [major, setMajor] = useState(initialMajor);
  const [gpa, setGpa] = useState(initialGpa);
  const [profileImage, setProfileImage] = useState(
    "your_initial_image_url_here"
  );

  const saveEdits = () => {
    setIsEditing(false);
    if (onSave) {
      onSave({ studentName, major, gpa });
    }
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
        {" "}
        {/* New container */}
        <div className={styles.studentImage}>
          <input
            type="file"
            id="profile-image-upload"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageChange}
          />
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
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="GPA"
              />
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="Major"
              />
            </>
          ) : (
            <>
              <div>{studentName || "STUDENT NAME"}</div>
              <div>{gpa || "GPA"}</div>
              <div>{major || "MAJOR"}</div>
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
      )}{" "}
    </div>
  );
};
export default StudentCard;
