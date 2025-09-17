import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PlanlægningPage() {
  const [embedUrl, setEmbedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmbedUrl = async () => {
      try {
        const response = await fetch('https://gutfelt-backend.onrender.com/api/planning-sheet');
        if (!response.ok) {
          throw new Error('Kunne ikke hente data fra serveren.');
        }
        const data = await response.json();
        setEmbedUrl(data.embedUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEmbedUrl();
  }, []);

  return (
    <div className="widget" style={{ margin: '2rem', height: 'calc(100vh - 200px)', padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '2rem 2rem 1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e9ecef' }}>
        <h2>Planlægning</h2>
        <Link to="/medarbejdere" className="back-link" style={{ marginTop: 0 }}>← Tilbage til Medarbejdere</Link>
      </div>

      {isLoading && <p style={{ padding: '2rem' }}>Indlæser planlægningsark...</p>}
      {error && <p style={{ color: 'red', padding: '2rem' }}>{error}</p>}
      
      {embedUrl && (
        <iframe
          src={embedUrl}
          title="Planlægningsark"
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
        >
        </iframe>
      )}
    </div>
  );
}

export default PlanlægningPage;