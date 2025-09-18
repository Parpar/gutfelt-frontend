import React from 'react';
import { Link } from 'react-router-dom';

function DocumentsPage() {
  return (
    <div className="policy-hub-container standarder-hub">
      <div className="widget">
        <h2>Standarder</h2>
        <p>Vælg en kategori nedenfor for at finde de relevante skabeloner og dokumenter.</p>
      </div>
      <div className="policy-grid">
        <Link to="/standarder/aftalebreve" className="policy-card">
          <div className="icon"><i className="fas fa-file-signature"></i></div>
          <h3>Aftalebreve</h3>
          <p>Skabeloner og eksempler på aftalebreve til kunder.</p>
        </Link>
        <Link to="/standarder/engagement" className="policy-card">
          <div className="icon"><i className="fas fa-envelope"></i></div>
          <h3>Engagementsforespørgsel</h3>
          <p>Brev til tidligere revisor og relaterede dokumenter.</p>
        </Link>
        <Link to="/standarder/habilitet" className="policy-card">
          <div className="icon"><i className="fas fa-balance-scale"></i></div>
          <h3>Habilitet og hvidvask</h3>
          <p>Vurderinger, tjeklister og dokumentation.</p>
        </Link>
        <Link to="/standarder/protokollat" className="policy-card">
          <div className="icon"><i className="fas fa-gavel"></i></div>
          <h3>Protokollat, erklæring, referat</h3>
          <p>Skabeloner til mødereferater og erklæringer.</p>
        </Link>
        <Link to="/standarder/tjeklister" className="policy-card">
          <div className="icon"><i className="fas fa-tasks"></i></div>
          <h3>Tjeklister og indeks</h3>
          <p>Standardiserede tjeklister til brug i revisioner.</p>
        </Link>
        <Link to="/standarder/oevrige" className="policy-card">
          <div className="icon"><i className="fas fa-folder-open"></i></div>
          <h3>Øvrige Skabeloner</h3>
          <p>Diverse andre skabeloner og standarddokumenter.</p>
        </Link>
      </div>
    </div>
  );
}
export default DocumentsPage;