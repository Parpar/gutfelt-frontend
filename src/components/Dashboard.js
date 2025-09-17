import React from 'react';
import NewsWidget from './NewsWidget';
import SearchWidget from './SearchWidget';
import CalendarWidget from './CalendarWidget';

function Dashboard() {
  return (
    <div className="dashboard-grid">
      <div className="search-widget-container">
        <SearchWidget />
      </div>
      <div className="news-widget-container">
        <NewsWidget />
      </div>
      <div className="calendar-widget-container">
        <CalendarWidget />
      </div>
    </div>
  );
}

export default Dashboard;