import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function UploadPage({ pageTitle, backLink, backLinkText, category, iconClass }) {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError('');

      // Tjek om category er defineret, før vi kalder
      if (!category) {
        console.error("Fejl: 'category' er ikke defineret. Kan ikke hente dokumenter.");
        setError("Der er opstået en konfigurationsfejl på denne side.");
        setIsLoading(false);
        return;
      }

      const apiUrl = `https://gutfelt-backend.onrender.com/api/documents/${category}`;
      console.log("Forsøger at hente dokumenter fra:", apiUrl); // Ny debugging-linje

      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Fejl fra server:", response.status, errorText);
          throw new Error(`Kunne ikke hente dokumenter. Server svarede med status: ${response.status}`);
        }

        const data = await response.json();
        setDocuments(data);

      } catch (err) {
        console.error("Netværksfejl eller parsing-fejl:", err);
        setError(err.message || 'Kunne ikke hente eksisterende dokumenter fra serveren.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, [category]);


  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  
  const handleUpload = async () => {
    if (!selectedFile) return alert('Vælg venligst en fil først.');
    setError('');
    setMessage('Uploader, vent venligst...');
    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await fetch(`https://gutfelt-backend.onrender.com/api/upload/${category}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload fejlede.');
      const result = await response.json();
      setMessage('Filen blev uploadet!');
      const newDocument = { id: Date.now(), name: result.file.name, path: result.file.path, size: result.file.size };
      setDocuments(prev => [...prev, newDocument]);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>{pageTitle}</h2>
      
      {isLoading && <p>Henter dokumenter fra SharePoint, vent venligst...</p>}
      
      <ul className="document-list">
        {!isLoading && documents.map(doc => (
          <li key={doc.id} className="document-item">
            <div className="document-icon"><i className={`fas ${iconClass || 'fa-file-alt'}`}></i></div>
            <div className="document-info"><h4>{doc.name}</h4><p>{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : ''}</p></div>
            <a href={doc.path} target="_blank" rel="noopener noreferrer" className="document-download">Download</a>
          </li>
        ))}
        {!isLoading && documents.length === 0 && <p>Der er endnu ingen dokumenter i denne kategori.</p>}
      </ul>

      {/* Viser den generelle fejlmeddelelse her */}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {currentUser && (currentUser.role === 'HR-redaktør' || currentUser.role === 'Redaktør' || currentUser.role === 'Admin') && (
        <div className="upload-section">
          <h3>Upload et nyt dokument</h3>
          <input type="file" key={selectedFile || ''} onChange={handleFileChange} />
          <button onClick={handleUpload} className="document-download">Upload Fil</button>
          {message && <p style={{color: 'green'}}>{message}</p>}
        </div>
      )}
      
      <Link to={backLink} className="back-link">← Tilbage til {backLinkText}</Link>
    </div>
  );
}

export default UploadPage;