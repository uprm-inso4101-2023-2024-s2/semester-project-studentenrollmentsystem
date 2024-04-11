import React, { useState } from 'react';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const submitFeedback = (event) => {
    event.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <div>
      {feedbackSubmitted ? (
        <div>
          <h2>Thank you for your feedback!</h2>
          <p>{feedback}</p>
        </div>
      ) : (
        <form onSubmit={submitFeedback}>
          <h2>Please leave your feedback</h2>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Type your feedback here..."
            required
          />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
}

export default FeedbackForm;
