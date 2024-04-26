import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import styles from '../styles/components/reviewsModal.module.scss';

const ReviewsModal = ({ onClose, courseName }) => {
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]); // State to store fetched reviews

  // Fetch reviews from Firestore when the modal is opened or a new review is added
  useEffect(() => {
    const q = query(collection(db, "reviews"), where("courseName", "==", courseName));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reviewsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      }));
      setReviews(reviewsArray);
    });

    // Unsubscribe from the listener when the modal is closed
    return unsubscribe;
  }, [courseName]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "reviews"), {
        message: newReview,
        courseName, // Attach the courseName to the review
        createdAt: new Date() // You can also store the creation time
      });
      console.log('Review added to Firestore with course name');
      setNewReview(''); // Reset input after submit
    } catch (error) {
      console.error('Error adding review to Firestore:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <h2>Course Reviews</h2>
        <div className={styles.reviewsList}>
          {reviews.map((review) => ( // Map through reviews and display them
            <div key={review.id} className={styles.reviewItem}>
              <p>{review.data.message}</p> {/* Display review text */}
              {/* Add more details if needed */}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className={styles.reviewInput}
            placeholder="Leave a review..."
            required
          />
          <button type="submit" className={styles.submitButton}>Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;
