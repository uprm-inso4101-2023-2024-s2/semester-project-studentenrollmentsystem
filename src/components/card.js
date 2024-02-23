import React from 'react';
import styles from "../styles/components/card.module.scss";

const Card = ({
  className,
  imageUrl,
  title,
  titleClassName,
  children,
  buttontext = 'Click Me',
  buttonClassName,
  imageClassName,
  onButtonClick
}) => {
  // Use provided class names or default to module styles if not provided
  const cardClassName = className || styles.card;
  const titleClass = titleClassName || styles.title;
  const buttonClass = buttonClassName || styles.button;
  const imageClass = imageClassName || styles.image;

  return (
    <div className={cardClassName}>
      <img src={imageUrl} alt={title} className={imageClass} />
      <div className={styles.content}>
        <h2 className={titleClass}>{title}</h2>
        {children}
        {buttontext && (
          <button onClick={onButtonClick} className={buttonClass}>
            {buttontext}
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
