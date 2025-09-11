import React from 'react';
import { Link } from 'react-router-dom';

function EmployeesPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Medarbejdere</h2>
        <p>Find information og materialer relateret til medarbejdere.</p>
      </div>
      <div className="policy-grid">
        <Link to="/medarbejdere/fjernlager" className="policy-card"><div className="icon"><i className="fas fa-warehouse"></i></div><h3>Fjernlager</h3></Link>
        <Link to="/medarbejdere/kompetenceskema" className="policy-card"><div className="icon"><i className="fas fa-chart-bar"></i></div><h3>Kompetenceskema</h3></Link>
        <Link to="/medarbejdere/kursusmaterialer" className="policy-card"><div className="icon"><i className="fas fa-book-open"></i></div><h3>Kursusmaterialer</h3></Link>
        <Link to="/medarbejdere/planlægning" className="policy-card"><div className="icon"><i className="fas fa-calendar-alt"></i></div><h3>Planlægning</h3></Link>
      </div>
    </div>
  );
}
export default EmployeesPage;```

---

### **3. `src/pages/documentspage.js` (Standarder)**

**Handling:** Erstat alt indholdet i denne fil.
```jsx
import React from 'react';
import { Link } from 'react-router-dom';

function DocumentsPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Standarder</h2>
        <p>Vælg en kategori nedenfor for at finde de relevante skabeloner og dokumenter.</p>
      </div>
      <div className="policy-grid">
        <Link to="/standarder/aftalebreve" className="policy-card"><div className="icon"><i className="fas fa-file-signature"></i></div><h3>Aftalebreve</h3></Link>
        <Link to="/standarder/engagement" className="policy-card"><div className="icon"><i className="fas fa-envelope"></i></div><h3>Engagementsforespørgsel</h3></Link>
        <Link to="/standarder/habilitet" className="policy-card"><div className="icon"><i className="fas fa-balance-scale"></i></div><h3>Habilitet og hvidvask</h3></Link>
        <Link to="/standarder/protokollat" className="policy-card"><div className="icon"><i className="fas fa-gavel"></i></div><h3>Protokollat, erklæring, referat</h3></Link>
        <Link to="/standarder/tjeklister" className="policy-card"><div className="icon"><i className="fas fa-tasks"></i></div><h3>Tjeklister og indeks</h3></Link>
        <Link to="/standarder/oevrige" className="policy-card"><div className="icon"><i className="fas fa-folder-open"></i></div><h3>Øvrige Skabeloner</h3></Link>
      </div>
    </div>
  );
}
export default DocumentsPage;