import React from 'react';
import { Link } from 'react-router-dom';

function PartnersPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Samarbejdspartnere</h2>
        <p>Information vedrørende bygninger, rådgivere og systemer.</p>
      </div>
      <div className="policy-grid">
        <Link to="/samarbejdspartnere/bygning" className="policy-card"><div className="icon"><i className="fas fa-building"></i></div><h3>Bygning, faciliteter, frokost</h3></Link>
        <Link to="/samarbejdspartnere/rådgivere" className="policy-card"><div className="icon"><i className="fas fa-user-tie"></i></div><h3>Rådgivere</h3></Link>
        <Link to="/samarbejdspartnere/systemer" className="policy-card"><div className="icon"><i className="fas fa-laptop-code"></i></div><h3>Systemer</h3></Link>
      </div>
    </div>
  );
}
export default PartnersPage;