import React from 'react';
import { Link } from 'react-router-dom';

function EmployeesPage() {
  return (
    <div className="policy-hub-container medarbejdere-hub">
      <div className="widget">
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
export default EmployeesPage;