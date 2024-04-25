import React, { useState, useEffect } from "react";
import styles from "../styles/components/studentCard.module.scss";
import { db } from "../firebase";
import { collection, getDocs, where, query, doc, updateDoc} from 'firebase/firestore';
import { imageDb } from "../firebase";
import { ref , uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const dummyUser = {
  uid: '9BoWZai194eJdTOW9gwzzN2ro3w2',
};

const StudentCard = ({
  className,
  initialStudentName,
  initialMajor,
  initialGpa,
  initialMissingCredits,
  initialCreditsTaken,
}) => {

  const [studentName, setStudentName] = useState(initialStudentName);
  const [major, setMajor] = useState(initialMajor);
  const [gpa, setGpa] = useState(initialGpa);
  const [missingCredits, setMissingCredits] = useState(initialMissingCredits);
  const [creditsTaken, setCreditsTaken] = useState(initialCreditsTaken);
  // eslint-disable-next-line
  const [counselorName, setCounselorName] = useState("");
  // eslint-disable-next-line
  const [counselorPhone, setCounselorPhone] = useState("");
  // eslint-disable-next-line
  const [counselorEmail, setCounselorEmail] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [img, setImg] = useState(null); // State to store uploaded image
  const [profilePicUrl, setProfilePicUrl] = useState(""); // State to store profile picture URL

  const userCollectionRef = collection(db, "students");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(userCollectionRef, where("id", "==", dummyUser.uid));
        const docSnap = await getDocs(q);
        

        docSnap.forEach((doc) => {
          const data = doc.data();
          setStudentName(data.name || initialStudentName);
          setMajor(data.major || initialMajor);
          setGpa(data.gpa || initialGpa);
          setMissingCredits(data.missingCredits || initialMissingCredits);
          setCreditsTaken(data.creditsTaken || initialCreditsTaken);
          setCounselorName(data.counselorName || "");
          setCounselorPhone(data.counselorPhone || "");
          setCounselorEmail(data.counselorEmail || "");
          setStudentNumber(data.studentNumber || "");
          if (data.profilePicUrl) {
            setProfilePicUrl(data.profilePicUrl);
          }
        });
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };
  
    fetchData();
    // eslint-disable-next-line
  }, [dummyUser.uid, initialStudentName, initialMajor, initialGpa, initialMissingCredits, initialCreditsTaken]);


  const handleClick = async () => {
    if (!img) {
      console.error("No image selected.");
      return;
    }

    try {
      const imgRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imgRef, img);

      // Get download URL of the uploaded image
      const imgUrl = await getDownloadURL(imgRef);
      const q = query(userCollectionRef, where("id", "==", dummyUser.uid));
      const docSnap = await getDocs(q);
      const filteredData = docSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const id = filteredData[0].id;
      updateProfile(id, imgUrl)

      setProfilePicUrl(imgUrl);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

    const updateProfile = async (id, im) => {
      const profDoc = doc(db, "students", id);
      await updateDoc(profDoc, { profilePicUrl: im });
  };

  return (
    <div className={`${styles.studentCard} ${className || ""}`.trim()}>
      <div className={styles.contentContainer}>
      <div className={styles.studentImage} style={{ backgroundImage: `url(${profilePicUrl})` }}>
          
        </div>
        <div className={styles.studentInfo}>
          <div>Name: {studentName}</div>
          <div>Student Number: {studentNumber}</div>
          <div>Major: {major}</div>
          <div>GPA: {gpa}</div>
          <div>Missing Credits: {missingCredits}</div>
          <div>Credits Taken: {creditsTaken}</div>

          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          <button onClick={handleClick}>Upload</button>

          {/* 
          <div>Counselor Name: {counselorName}</div>
          <div>Counselor Email: {counselorEmail}</div>
          <div>Counselor Phone: {counselorPhone}</div> 
          */}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
