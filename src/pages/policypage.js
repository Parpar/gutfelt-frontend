import React from 'react';
import { Link } from 'react-router-dom';

function PolicyPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Firmapolitikker</h2>
        <p>Vælg en kategori nedenfor for at læse de specifikke retningslinjer og politikker.</p>
      </div>
      <div className="policy-grid">
        <Link to="/firmapolitikker/fakturering" className="policy-card"><div className="icon"><i className="fas fa-file-invoice-dollar"></i></div><h3>Fakturering</h3></p></Link>
        <Link to="/firmapolitikker/kickoff" className="policy-card"><div className="icon"><i className="fas fa-rocket"></i></div><h3>Kickoff møder</h3></Link>
        <Link to="/firmapolitikker/kundehåndtering" className="policy-card"><div className="icon"><i className="fas fa-headset"></i></div><h3>Kundehåndtering</h3></Link>
        <Link to="/firmapolitikker/kvalitetsstyring" className="policy-card"><div className="icon"><i className="fas fa-check-double"></i></div><h3>Kvalitetsstyringsmanuel</h3></Link>
        <Link to="/firmapolitikker/mandagsmøder" className="policy-card"><div className="icon"><i className="fas fa-calendar-week"></i></div><h3>Mandagsmøder</h3></Link>
        <Link to="/firmapolitikker/personalehåndbog" className="policy-card"><div className="icon"><i className="fas fa-users"></i></div><h3>Personalehåndbog</h3></Link>
        <Link to="/firmapolitikker/persondatapolitik" className="policy-card"><div className="icon"><i className="fas fa-user-shield"></i></div><h3>Persondatapolitik</h3></Link>
        <Link to="/firmapolitikker/slettepolitik" className="policy-card"><div className="icon"><i className="fas fa-trash-alt"></i></div><h3>Slettepolitik</h3></Link>
        <Link to="/firmapolitikker/whistleblower" className="policy-card"><div className="icon"><i className="fas fa-bullhorn"></i></div><h3>Whistleblowordning</h3></Link>
      </div>
    </div>
  );
}
export default PolicyPage;