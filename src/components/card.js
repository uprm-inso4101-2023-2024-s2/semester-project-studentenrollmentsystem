import React, { useState, useEffect} from 'react';
import styles from "../styles/components/card.module.scss";
import modstyle from "../styles/components/modal.module.scss";
import table from "../styles/components/courseTable.module.scss";
import Data from "../data/dummy_data/dummycoursedetails.csv";
import Papa from "papaparse"
import ReviewsModal from './ReviewsModal';

export default function Card({courseName, credits, instructor, imageUrl, description, buttontext = 'Click Me', reviewButtonText = 'Reviews'}){ 
  const [modal, setModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  
  //Dummy Data
  const sections = ['Section 1', 'Section 2']; 
  const reviews = ['Review 1', 'Review 2'];

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [data,setData] = useState([])
  useEffect(()=> {
      const fetchData = async()=> {
          const response = await fetch(Data);
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder("utf-8");
          const csvData = decoder.decode(result.value);
          const parsedData = Papa.parse(csvData, {header:true, skipEmptyLines:true}).data;
          setData(parsedData);
      };
      fetchData();
  }, []);
  
  return(
    <>
    {modal && (
      <div className={modstyle.modal}>
        <div onClick={toggleModal} className={modstyle.overlay}></div>
        <div className={modstyle.modalcontent}>
          <h2>Course Details</h2>
          <h3 className={styles.courseName}>{courseName}</h3>
          {data.length ? (
                <table className={table.Coursetable}>
                    <thead>
                        <tr>
                        <th>Sections</th>
                        <th>Hour</th>
                        <th>Days</th>
                        <th>Spaces Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row,index)=>(
                            <tr key ={index}>
                                <td>{row.Section}</td>
                                <td>{row.Hour}</td>
                                <td>{row.Days}</td>
                                <td>{row.Spaces}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
          <button className={modstyle.close-modal} onClick={toggleModal}>
            Back
          </button>
          
        </div>
      </div>
    )}


    <div className={styles.card}>
        <img src={imageUrl} alt="Card" className={styles.image} />
        <div className={styles.content}>
          <h2 className={styles.courseName}>{courseName}</h2>
          <h1 className={styles.instructor}>{instructor}</h1>
          <p className={styles.description}>{description}</p>
          <p className={styles.credits}>{credits}</p>
          <button onClick={toggleModal} className={styles.button}>{buttontext}</button>
          
          <button className={styles.button} onClick={() => setShowReviewsModal(true)}>{reviewButtonText}</button>
          {showReviewsModal && <ReviewsModal onClose={() => setShowReviewsModal(false)} reviews={reviews} courseName={courseName} />}
        </div>
      </div>
    </>        
    );     
}