import React from "react";
import "../styles/Card.css";

const Card = ({ title, value, change }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
      <span>{change}</span>
    </div>
  );
};

export default Card;
