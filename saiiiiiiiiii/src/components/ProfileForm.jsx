import React, { useState } from 'react';
import { createProfile } from '../api';

export const ProfileForm = ({ activeTab, onNext, onBack, onDone }) => {
  // State for basic info
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // State for social links
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    youtube: ''
  });

  
  // Handle basic info changes
  const handleBasicInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle social links changes
  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle next button click with validation
  const handleNext = () => {
    // Basic validation
    if (!basicInfo.name || !basicInfo.email || !basicInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }
    onNext();
  };

  // Handle form submission
  const handleDone = async () => {
    // Combine all form data

    const formData = {
      ...basicInfo,
      // ...socialLinks
      insta_link : socialLinks.instagram,
      youtube_link : socialLinks.youtube

    };
    // const { email, name, phone, youtube_link, insta_link } = formData;

    const res = await createProfile(formData);
    if (res.error) { 
      alert(res.error); // Log the error message instead of setting state
    } else {
      alert(res.message || "Profile created successfully!")
    }
    console.log('Form submitted with data:', formData);
    onDone(formData);
  };



  return (
    <div className="profile-form">
      {activeTab === 'basic' ? (
        <>
          <div className="form-group">
            <label>Enter Name<span className="required">*</span></label>
            <input
              type="text"
              name="name"
              value={basicInfo.name}
              onChange={handleBasicInfoChange}
              placeholder="Eg. John Doe"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Enter Email<span className="required">*</span></label>
            <input
              type="email"
              name="email"
              value={basicInfo.email}
              onChange={handleBasicInfoChange}
              placeholder="Eg. John@xyz.com"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Enter Phone<span className="required">*</span></label>
            <input
              type="tel"
              name="phone"
              value={basicInfo.phone}
              onChange={handleBasicInfoChange}
              placeholder="Eg. 9123456789"
              className="form-input"
            />
          </div>
          <div className="form-actions right">
            <button 
              className="btn-primary" 
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="form-group">
            <label>Instagram Link <span className="optional">(Optional)</span></label>
            <input
              type="url"
              name="instagram"
              value={socialLinks.instagram}
              onChange={handleSocialLinksChange}
              placeholder="Eg. instagram.com/username"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Youtube Link <span className="optional">(Optional)</span></label>
            <input
              type="url"
              name="youtube"
              value={socialLinks.youtube}
              onChange={handleSocialLinksChange}
              placeholder="Eg. youtube.com/username"
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button 
              className="btn-secondary" 
              onClick={onBack}
            >
              Back
            </button>
            <button 
              className="btn-primary" 
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileForm;