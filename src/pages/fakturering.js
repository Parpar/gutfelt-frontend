import React from 'react';
import { Link } from 'react-router-dom';

function FaktureringPage() {
  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>Politik for Fakturering</h2>
      <p>Retningslinjer for korrekt oprettelse og udsendelse af fakturaer, rykkerprocedure og bogføring.</p>
      {/* RETTET HER: */}
      <Link to="/firmapolitikker" className="back-link">← Tilbage til Firmapolitikker</Link>
    </div>
  );
}
export default FaktureringPage;