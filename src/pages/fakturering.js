import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function FaktureringPage() {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Vælg venligst en fil først.');
      return;
    }
    setError('');
    setMessage('Uploader, vent venligst...');

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      // VIGTIGT: Kalder nu kategorien "fakturering"
      // Vi skal tilføje FOLDER_ID_FAKTURERING på Render og i server.js
      const response = await fetch('https://gutfelt-backend.onrender.com/api/upload/fakturering', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload fejlede. Prøv igen.');
      }

      const result = await response.json();
      setMessage('Filen blev uploadet!');
      
      const newDocument = {
        id: Date.now(),
        name: result.file.name,
        description: `Uploadet ${new Date().toLocaleString()}`,
        size: `${(result.file.size / 1024).toFixed(1)} KB`,
        path: result.file.path
      };
      setDocuments(prev => [...prev, newDocument]);
      setSelectedFile(null);

    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <h2>Politik for Fakturering</h2>
      <p>Retningslinjer for korrekt oprettelse og udsendelse af fakturaer.</p>

      <ul className="document-list">
        {documents.map(doc => (
          <li key={doc.id} className="document-item">
            <div className="document-icon"><i className="fas fa-file-invoice-dollar"></i></div>
            <div className="document-info">
              <h4>{doc.name}</h4>
              <p>{doc.description} - {doc.size}</p>
            </div>
            <a href={doc.path} target="_blank" rel="noopener noreferrer" className="document-download">Download</a>
          </li>
        ))}
        {documents.length === 0 && <p>Der er endnu ingen dokumenter i denne kategori.</p>}
      </ul>

      {/* Vi skal definere en mere specifik rolle, f.eks. 'Økonomi-redaktør' senere */}
      {currentUser && currentUser.role === 'HR-redaktør' && (
        <div className="upload-section">
          <h3>Upload et nyt dokument</h3>
          <input type="file" key={selectedFile || ''} onChange={handleFileChange} />
          <br />
          <button onClick={handleUpload} className="document-download" style={{ border: 'none', cursor: 'pointer' }}>
            Upload Fil
          </button>
          {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
          {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
        </div>
      )}
      
      <Link to="/firmapolitikker" className="back-link" style={{ marginTop: '3rem' }}>
        ← Tilbage til Firmapolitikker
      </Link>
    </div>
  );
}

export default FaktureringPage;