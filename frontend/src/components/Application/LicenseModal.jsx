import React from "react";

const LicenseModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="license" />
      </div>
    </div>
  );
};

export default LicenseModal;
