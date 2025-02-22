import React from 'react';

export const SidebarItem = ({ icon, text, active }) => (
  <div className={`sidebar-item ${active ? 'active' : ''}`}>
    {icon}
    <span>{text}</span>
  </div>
);
