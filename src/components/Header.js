import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/">
            <img src="/logo.png" alt="Gutfelt Intranet Logo" />
          </Link>
        </div>
        
        {currentUser && (
          <>
            <nav className={`header-nav ${isMenuOpen ? 'is-open' : ''}`}>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Hjem</Link>
              <Link to="/standarder" onClick={() => setIsMenuOpen(false)}>Standarder</Link>
              <Link to="/firmapolitikker" onClick={() => setIsMenuOpen(false)}>Firmapolitikker</Link>
              <Link to="/medarbejdere" onClick={() => setIsMenuOpen(false)}>Medarbejdere</Link>
              <Link to="/samarbejdspartnere" onClick={() => setIsMenuOpen(false)}>Samarbejdspartnere</Link>
            </nav>

            <div className="user-info">
              <span className="user-info-desktop" style={{ marginRight: '1rem' }}>
                {currentUser.name} ({currentUser.role})
              </span>
              <button onClick={handleLogout} style={{cursor: 'pointer'}}>Log ud</button>
            </div>

            <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
            </button>
          </>
        )}

        {!currentUser && (
          <div className="user-info">
            <Link to="/login">Log ind</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
