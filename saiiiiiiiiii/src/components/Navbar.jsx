import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Dashboard</h2>
      <input type="text" placeholder="Search..." />
      <div className="profile">
        <span>🔔</span>
        <img src="https://via.placeholder.com/30" alt="User" />
      </div>
    </div>
  );
};

export default Navbar;
