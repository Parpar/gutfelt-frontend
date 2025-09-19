import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Header() {
  const { currentUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/">
          <img src="/logo.png" alt="Gutfelt Intranet Logo" />
        </Link>
      </div>
      
      <nav className="header-nav">
        <Link to="/">Hjem</Link>
        <Link to="/standarder">Standarder</Link>
        <Link to="/firmapolitikker">Firmapolitikker</Link>
        <Link to="/medarbejdere">Medarbejdere</Link>
        <Link to="/samarbejdspartnere">Samarbejdspartnere</Link>
      </nav>

      <div className="user-info">
        {currentUser ? (
          <>
            <span style={{ marginRight: '1rem' }}>
              {currentUser.name} ({currentUser.role})
            </span>
            <button onClick={handleLogout} style={{cursor: 'pointer'}}>Log ud</button>
          </>
        ) : (
          <Link to="/login">Log ind</Link>
        )}
      </div>
    </header>
  );
}

export default Header;