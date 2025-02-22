import React from 'react';

export const StatsCard = ({ title, value, change, icon }) => (
  <div className="stat-card">
    <div className="stat-card-header">
      <div className="stat-icon-wrapper">{icon}</div>
      <span className="stat-change">{change}</span>
    </div>
    <h3 className="stat-title">{title}</h3>
    <p className="stat-value">{value}</p>
  </div>
);