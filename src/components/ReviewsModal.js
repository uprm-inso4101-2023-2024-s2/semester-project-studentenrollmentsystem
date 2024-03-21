import React, { useState } from 'react';
import styles from '../styles/components/reviewsModal.module.scss'; // Your CSS module for styling the modal

const ReviewsModal = ({ onClose, reviews }) => {
  const [newReview, setNewReview] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to process the new review, like updating state or sending to server
    console.log(newReview);
    setNewReview(""); // Reset input after submit
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>Course Reviews</h2>
        <div className={styles.reviewsList}>
          {/* Map through reviews and display them here */}
          {reviews.map((review, index) => (
            <div key={index} className={styles.reviewItem}>
              <p>{review}</p> {/* Display review text */}
              {/* You can add more details like rating, author, etc. */}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className={styles.reviewInput}
            placeholder="Leave a review..."
          />
          <button type="submit" className={styles.submitButton}>Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;
