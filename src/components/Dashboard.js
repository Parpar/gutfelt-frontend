import React from 'react';
import NewsWidget from './NewsWidget';
import SearchWidget from './SearchWidget';
import CalendarWidget from './CalendarWidget';
function Dashboard() {
  return (
    <div className="dashboard">
      <SearchWidget />
      <NewsWidget />
      <CalendarWidget />
    </div>
  );
}
export default Dashboard;