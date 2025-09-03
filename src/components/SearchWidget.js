import React from 'react';
function SearchWidget() {
  return (
    <div className="widget search-widget" style={{ gridColumn: '1 / -1' }}>
      <h2>Søg på intranettet</h2>
      <input type="search" placeholder="Søg efter dokumenter, nyheder, kolleger..." />
    </div>
  );
}
export default SearchWidget;