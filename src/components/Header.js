import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          GUTFELT Intranet
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/">Hjem</Link>
        <Link to="/dokumenter">Dokumenter</Link>
        {/* RETTET HER: Både URL og tekst er ændret */}
        <Link to="/firmapolitikker">Firmapolitikker</Link>
        <Link to="/medarbejdere">Medarbejdere</Link>
        <Link to="/samarbejdspartnere">Samarbejdspartnere</Link>
      </nav>
    </header>
  );
}

export default Header;