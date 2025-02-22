import React from 'react';
import { FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Header.css';

export const Header = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem("email"); // Remove email from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="header">
      <h2>Dashboard</h2>
      <div className="header-right">
        <input type="search" placeholder="Search..." className="search-input" />

        <button className="notification-btn">
          <FaBell className="bell-icon" />
        </button>

        {/* Logout on Avatar Click */}
        <div className="profile-avatar" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <img
            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            alt="User Avatar"
          />
        </div>
      </div>
    </header>
  );
};
