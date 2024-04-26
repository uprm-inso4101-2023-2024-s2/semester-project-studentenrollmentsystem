import React, { useState } from "react";
import { db } from "../firebase"; // Import db for Firestore operations
import { collection, addDoc } from "firebase/firestore";
import styles from "../styles/components/feedbackInput.module.scss";

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const submitFeedback = async (event) => {
    event.preventDefault();
    // Log to see if the function is being called
    console.log("Submitting feedback:", feedback);
    try {
      // Add a new document in the 'feedback' collection
      await addDoc(collection(db, "feedback"), {
        text: feedback,
        // Removed userId
        timestamp: new Date(), // Optional: Adds a timestamp to the feedback
      });
      console.log("Feedback submitted successfully!");
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      {feedbackSubmitted ? (
        <div className={styles.body}>
          <h2>Thank you for your feedback!</h2>
          <p>{feedback}</p>
        </div>
      ) : (
        <form onSubmit={submitFeedback}>
          <h2>Please leave your feedback</h2>
          <div className={styles.body}>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Type your feedback here..."
              required
              className={styles.inputBox}
            />
            <button className={styles.button} type="submit">
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
