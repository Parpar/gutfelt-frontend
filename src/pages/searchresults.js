import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://gutfelt-backend.onrender.com/api/search?q=${query}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Søgning fejlede:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchResults();
    }
  }, [query]);
  
  const getIcon = (type) => (type === 'Dokument' ? 'fa-file-alt' : 'fa-newspaper');

  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>Søgeresultater for "{query}"</h2>
      {isLoading ? ( <p>Søger i dokumentarkivet...</p> ) : 
      ( results.length > 0 ? (
          <table className="document-table">
            <thead><tr><th>Type</th><th>Titel</th><th>Beskrivelse</th></tr></thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td className="file-name-cell"><div className="file-icon"><i className={`fas ${getIcon(result.type)}`}></i></div><span>{result.type}</span></td>
                  <td><a href={result.link} target="_blank" rel="noopener noreferrer">{result.title}</a></td>
                  <td>{result.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : ( <p>Ingen dokumenter matchede din søgning.</p> )
      )}
      <Link to="/" className="back-link" style={{marginTop: '2rem'}}>← Tilbage til forsiden</Link>
    </div>
  );
}
export default SearchResultsPage;