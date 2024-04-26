import React from "react";
import FeedbackForm from "../components/feedbackInout";
import styles from "../styles/pages/feedback.module.scss";

function FeedBackPage() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <FeedbackForm />
      </header>
    </div>
  );
}

export default FeedBackPage;
