import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import styles from "../styles/components/navbar.module.scss";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Function to fetch notifications from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (querySnapshot) => {
      const fetchedNotifications = [];
      querySnapshot.forEach((doc) => {
        fetchedNotifications.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(fetchedNotifications);
    });

    return () => unsubscribe();
  }, []);

   // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle notification click (mark as read)
  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: !notification.read } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Function to handle dismissing notification
  const handleDismissNotification = async (id) => {
    try {
      // Remove notification from Firebase
      await deleteDoc(doc(db, "notifications", id));
      // Update local state to reflect the removal
      const updatedNotifications = notifications.filter(notification => notification.id !== id);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error dismissing notification: ", error);
    }
  };

  // Line  78 return notifs from Firebase however currently id is being used as the message which would need to be adjusted in the querySnapshot for the Effect function.
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
                <span>{notification.id} {notification.message}</span>
                <button
                  className="dismiss-button"
                  onClick={(e) => {
                    e.stopPropagation();
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
