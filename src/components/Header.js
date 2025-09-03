import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Send brugeren til login-siden efter logud
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          GUTFELT Intranet
        </Link>
      </div>
      {currentUser && (
        <nav className="header-nav">
          <Link to="/">Hjem</Link>
          {/* RETTET HER: Både URL (to) og tekst er ændret */}
          <Link to="/standarder">Standarder</Link>
          <Link to="/firmapolitikker">Firmapolitikker</Link>
          <Link to="/medarbejdere">Medarbejdere</Link>
          <Link to="/samarbejdspartnere">Samarbejdspartnere</Link>
        </nav>
      )}
      <div className="user-info" style={{ marginLeft: 'auto' }}>
        {currentUser ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              Logget ind som: {currentUser.name} ({currentUser.role})
            </span>
            <button onClick={handleLogout} style={{cursor: 'pointer'}}>Log ud</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white' }}>Log ind</Link>
        )}
      </div>
    </header>
  );
}

export default Header;