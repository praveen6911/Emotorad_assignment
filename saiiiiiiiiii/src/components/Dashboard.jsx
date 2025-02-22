import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { StatsCard } from './StatsCard';
import { ActivitiesChart } from './ActivitiesChart';
import  {ProductsChart}  from './ProductsChart';
import { AddProfile } from './AddProfile';
import { ProfilePopup } from './ProfilePopup';
import { activityData, productData, statsCards } from './data';
import Profile from './Profile';

import '../styles/Dashboard.css'

const Dashboard =  () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
    setActiveTab('basic');
  };

  

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleNext = () => setActiveTab('social');
  const handleBack = () => setActiveTab('basic');
  const handleDone = () => setShowProfilePopup(false);

  return (
    <div className="dashboard-container">
    <div style={{position:"fixed"}}>
    <Sidebar />
    </div>
      
      
      <main className="main-content">
        <Header />

        <div className="stats-grid">
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>

        <ActivitiesChart data={activityData} />

        <div className="bottom-grid">
          <ProductsChart data={productData} />
          
          <AddProfile onAddProfile={toggleProfilePopup} />

        </div>
        <div>
        <Profile />
        </div>
      </main>
     

      <ProfilePopup 
        showProfilePopup={showProfilePopup}
        activeTab={activeTab}
        onClose={toggleProfilePopup}
        onTabChange={handleTabChange}
        onNext={handleNext}
        onBack={handleBack}
        onDone={handleDone}
      />
    </div>
  );
};

export default Dashboard;