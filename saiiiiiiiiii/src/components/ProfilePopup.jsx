import React from 'react';
import { X } from 'lucide-react';
import { ProfileForm } from './ProfileForm';

export const ProfilePopup = ({ 
  showProfilePopup, 
  activeTab, 
  onClose, 
  onTabChange, 
  onNext, 
  onBack, 
  onDone 
}) => (
  showProfilePopup && (
    <div className="profile-popup-overlay">
      <div className="profile-popup">
        <div className="popup-header">
          <h2>Add New Profile</h2>
          <button className="close-button" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <div className="profile-tabs">
          <div 
            className={`profile-tab ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => onTabChange('basic')}
          >
            Basic
          </div>
          <div 
            className={`profile-tab ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => onTabChange('social')}
          >
            Social
          </div>
        </div>
        
        <div className="profile-tab-content">
          <ProfileForm 
            activeTab={activeTab}
            onNext={onNext}
            onBack={onBack}
            onDone={onDone}
          />
        </div>
      </div>
    </div>
  )
);