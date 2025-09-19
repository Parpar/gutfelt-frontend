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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/">
          <img src="/logo.png" alt="Gutfelt Intranet Logo" />
        </Link>
      </div>
      
      <nav className={`header-nav ${isMenuOpen ? 'is-open' : ''}`}>
        <Link to="/" onClick={closeMenu}>Hjem</Link>
        <Link to="/standarder" onClick={closeMenu}>Standarder</Link>
        <Link to="/firmapolitikker" onClick={closeMenu}>Firmapolitikker</Link>
        <Link to="/medarbejdere" onClick={closeMenu}>Medarbejdere</Link>
        <Link to="/samarbejdspartnere" onClick={closeMenu}>Samarbejdspartnere</Link>
      </nav>

      <div className="user-info">
        {currentUser ? (
          <>
            <span className="user-info-desktop">
              {currentUser.name} ({currentUser.role})
            </span>
            <button onClick={handleLogout} style={{cursor: 'pointer', marginLeft: '1rem'}}>Log ud</button>
          </>
        ) : (
          <Link to="/login">Log ind</Link>
        )}
      </div>

      {currentUser && (
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      )}
    </header>
  );
}

export default Header;