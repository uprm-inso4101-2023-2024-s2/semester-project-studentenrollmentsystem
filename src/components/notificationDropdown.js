import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/components/navbar.module.scss";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 3, message: 'Enrollment process will start soon!', read: false },
    { id: 2, message: 'Remember to select your courses for next semster.', read: false },
    { id: 1, message: 'Welcome to the S.E.A webpage!', read: true }, // Example of a read notification
  ]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: !notification.read } : notification
    );
    setNotifications(updatedNotifications);
  };

  const handleDismissNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  return (
    <div className={styles.notificationDropdownContainer}>
      <div className={styles.notificationDropdown}>
        <div className={styles.notificationIcon} onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faBell} />
          {notifications.some(notification => !notification.read) && (
            <span className={styles.notificationCount}>
              {notifications.filter(notification => !notification.read).length}
            </span>
          )}
        </div>
        {isOpen && (
          <div className={`${styles.notificationList} ${styles.scrollableList}`}>
            {notifications.map(notification => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${notification.read ? styles.read : ''}`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <span className={styles.notificationIcon}>
                  {notification.read ? (
                    <FontAwesomeIcon icon={faCheckSquare} className={styles.blueIcon} />
                  ) : (
                    <FontAwesomeIcon icon={faSquare} className={styles.blueIcon} />
                  )}
                </span>
                <span>{notification.message}</span>
                <button
                  className="dismiss-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the notification from being clicked when dismissing
                    handleDismissNotification(notification.id);
                  }}
                >
                  Dismiss
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
