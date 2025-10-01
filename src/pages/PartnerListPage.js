import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PartnerListPage({ category, pageTitle, backLink }) {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://gutfelt-backend.onrender.com/api/partners/${category}`);
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        console.error("Kunne ikke hente partnere:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, [category]);

  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>{pageTitle}</h2>
      {isLoading ? (
        <p>Henter partnerinformation...</p>
      ) : (
        <table className="document-table">
          <thead>
            <tr>
              <th>Firma</th>
              <th>Kontaktperson</th>
              <th>Email</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr key={index}>
                <td>{partner.Title}</td>
                <td>{partner.Kontaktperson || '-'}</td>
                <td>{partner.Email ? <a href={`mailto:${partner.Email}`}>{partner.Email}</a> : '-'}</td>
                <td>{partner.Telefon || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && partners.length === 0 && <p>Der er ingen partnere i denne kategori.</p>}
      <Link to={backLink} className="back-link">← Tilbage til Samarbejdspartnere</Link>
    </div>
  );
}

export default PartnerListPage;