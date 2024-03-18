import React from 'react';
import styles from '../styles/components/sectionsModal.module.scss'; // Assume you have a corresponding SCSS file for styling

const SectionsModal = ({ onClose, sections }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Available Sections</h2>
        {/* Display sections here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SectionsModal;
