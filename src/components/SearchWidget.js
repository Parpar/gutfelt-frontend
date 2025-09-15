import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchWidget() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  return (
    <div className="widget search-widget">
      <h2>Søg på intranettet</h2>
      <form onSubmit={handleSearch}>
        <input 
          type="search" 
          placeholder="Søg efter nyheder..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchWidget;