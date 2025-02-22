import React from 'react';

export const AddProfile = ({ onAddProfile }) => (
  <div className="add-profile-container">
    <button className="add-profile-button" onClick={onAddProfile}>
      <div className="add-profile-content">
        <div className="add-profile-icon">+</div>
        <span>Add Profile</span>
      </div>
    </button>
  </div>
);