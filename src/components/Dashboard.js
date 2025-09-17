import React from 'react';
import NewsWidget from './NewsWidget';
import SearchWidget from './SearchWidget';
import CalendarWidget from './CalendarWidget';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-row">
        <SearchWidget />
      </div>
      <div className="dashboard-row">
        <NewsWidget />
        <CalendarWidget />
      </div>
    </div>
  );
}

export default Dashboard;```
