import React from 'react';
import { Link } from 'react-router-dom';

function PartnersPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Samarbejdspartnere</h2>
        <p>Information vedrørende bygninger, rådgivere, systemer og kontrakter.</p>
      </div>
      <div className="policy-grid">
        <Link to="/samarbejdspartnere/bygning" className="policy-card"><div className="icon"><i className="fas fa-building"></i></div><h3>Bygning, faciliteter, frokost</h3></Link>
        <Link to="/samarbejdspartnere/rådgivere" className="policy-card"><div className="icon"><i className="fas fa-user-tie"></i></div><h3>Rådgivere</h3></Link>
        <Link to="/samarbejdspartnere/systemer" className="policy-card"><div className="icon"><i className="fas fa-laptop-code"></i></div><h3>Systemer</h3></Link>
        <Link to="/samarbejdspartnere/forsikringer" className="policy-card"><div className="icon"><i className="fas fa-shield-alt"></i></div><h3>Forsikringer og øvrige kontrakter</h3></Link>
      </div>
    </div>
  );
}
export default PartnersPage;