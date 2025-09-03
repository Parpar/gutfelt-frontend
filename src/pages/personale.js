import React from 'react';
import { Link } from 'react-router-dom';

function PersonalePage() {
  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>Personalehåndbog</h2>
      <p>Her er alle detaljer om ansættelsesforhold, ferie, sygdom, barsel, medarbejdergoder osv.</p>
      {/* RETTET HER: */}
      <Link to="/firmapolitikker" className="back-link">← Tilbage til Firmapolitikker</Link>
    </div>
  );
}
export default PersonalePage;