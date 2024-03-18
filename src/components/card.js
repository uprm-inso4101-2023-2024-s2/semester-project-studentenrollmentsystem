import React, { useState } from 'react';
import styles from "../styles/components/card.module.scss";
import ReviewsModal from './ReviewsModal'; // Import the reviews modal component

export default function Card({ courseName, credits, instructor, imageUrl, description }) {
  const [showSectionsModal, setShowSectionsModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  // Dummy data for sections and reviews, replace with actual data as needed
  const sections = ['Section 1', 'Section 2']; 
  const reviews = ['Review 1', 'Review 2'];

  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="Card" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.courseName}>{courseName}</h2>
        <h1 className={styles.instructor}>{instructor}</h1>
        <p className={styles.description}>{description}</p>
        <p className={styles.credits}>{credits}</p>
        
        <button className={styles.button} onClick={() => setShowSectionsModal(true)}>Available Sections</button>
       
        <button className={styles.button} onClick={() => setShowReviewsModal(true)}>Reviews</button>
      {showReviewsModal && <ReviewsModal onClose={() => setShowReviewsModal(false)} reviews={reviews} />}
      </div>
    </div>
  );
}
