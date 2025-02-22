import React from 'react';
import { Layout, RefreshCcw, Calendar, Users, Settings, HelpCircle, MessageCircle } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => (
  <aside className="sidebar">
    <h1 className="logo">Board</h1>
    <nav className="nav-menu">
      <SidebarItem icon={<Layout size={18} />} text="Dashboard" active />
      <SidebarItem icon={<RefreshCcw size={18} />} text="Transactions" />
      <SidebarItem icon={<Calendar size={18} />} text="Schedules" />
      <SidebarItem icon={<Users size={18} />} text="Users" />
      <SidebarItem icon={<Settings size={18} />} text="Settings" />
    </nav>
    <div className="sidebar-footer">
      <SidebarItem icon={<HelpCircle size={18} />} text="Help" />
      <SidebarItem icon={<MessageCircle size={18} />} text="Contact Us" />
    </div>
  </aside>
);