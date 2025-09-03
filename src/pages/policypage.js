import React from 'react';
import { Link } from 'react-router-dom';

function PolicyPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {/* RETTET HER: */}
        <h2>Firmapolitikker</h2>
        <p>Vælg en kategori nedenfor for at læse de specifikke retningslinjer.</p>
      </div>

      <div className="policy-grid">
        {/* RETTET HER: URL er opdateret */}
        <Link to="/firmapolitikker/personale" className="policy-card">
          <div className="icon"><i className="fas fa-users"></i></div>
          <h3>Personalehåndbog</h3>
          <p>Alt om ansættelsesforhold, ferie, sygdom og medarbejdergoder.</p>
        </Link>

        {/* RETTET HER: URL er opdateret */}
        <Link to="/firmapolitikker/fakturering" className="policy-card">
          <div className="icon"><i className="fas fa-file-invoice-dollar"></i></div>
          <h3>Fakturering</h3>
          <p>Retningslinjer for korrekt oprettelse, udsendelse og bogføring.</p>
        </Link>

        {/* RETTET HER: URL er opdateret */}
        <Link to="/firmapolitikker/kundehåndtering" className="policy-card">
          <div className="icon"><i className="fas fa-headset"></i></div>
          <h3>Kundehåndtering</h3>
          <p>Best practice for kundeservice og vedligeholdelse af kunderelationer.</p>
        </Link>
      </div>
    </div>
  );
}

export default PolicyPage;