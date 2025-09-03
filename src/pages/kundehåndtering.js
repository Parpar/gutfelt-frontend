import React from 'react';
import { Link } from 'react-router-dom';

function KundehåndteringPage() {
  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>Politik for Kundehåndtering</h2>
      <p>Best practice for kommunikation med kunder, håndtering af support-sager og vedligeholdelse af kunderelationer i CRM-systemet.</p>
      {/* RETTET HER: */}
      <Link to="/firmapolitikker" className="back-link">← Tilbage til Firmapolitikker</Link>
    </div>
  );
}
export default KundehåndteringPage;