import React, { useState } from 'react';
import styles from '../styles/components/linkBox.module.scss'; // Import your SCSS styles

const LinkBox = () => {
  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState('');

  const handleAddLink = () => {
    if (linkInput.trim() !== '') {
      setLinks([...links, linkInput]);
      setLinkInput('');
    }
  };

  const handleLinkInputChange = (e) => {
    setLinkInput(e.target.value);
  };

  return (
    <div className={styles.linkBox}>
      <h2>Stored Links</h2>
      <div className={styles.scrollableContainer}>
        <ul className={styles.linkList}>
          {links.map((link, index) => (
            // Use an anchor tag to make the link clickable and open in a new tab
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={linkInput}
        onChange={handleLinkInputChange}
        placeholder="Enter a link"
        className={styles.linkInput}
      />
      <button className={styles.button} onClick={handleAddLink}>Add Link</button> {/* Button */}
    </div>
  );
};

export default LinkBox;
