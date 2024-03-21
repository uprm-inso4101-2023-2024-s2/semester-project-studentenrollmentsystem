import React, { useState } from "react";
import "../styles/components/modal.module.scss";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        See course details
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Course Details</h2>
            <p>
              Dummy data goes here.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
}