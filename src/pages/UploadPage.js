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
      try {
        const response = await fetch(`https://gutfelt-backend.onrender.com/api/documents/${category}`);
        if (!response.ok) {
          throw new Error('Kunne ikke hente dokumenter.');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError('Kunne ikke hente eksisterende dokumenter fra serveren.');
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
      setDocuments(prev => [newDocument, ...prev]);
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
      
      {!isLoading && documents.length > 0 && (
        <table className="document-table">
          <thead>
            <tr>
              <th>Filnavn</th>
              <th>Størrelse</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id}>
                <td className="file-name-cell">
                  <div className="file-icon"><i className={`fas ${iconClass || 'fa-file-alt'}`}></i></div>
                  <span>{doc.name}</span>
                </td>
                <td>{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : 'N/A'}</td>
                <td className="download-cell">
                  <a href={doc.path} target="_blank" rel="noopener noreferrer" className="download-link">Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {!isLoading && documents.length === 0 && <p style={{ marginTop: '2rem' }}>Der er endnu ingen dokumenter i denne kategori.</p>}

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

export default UploadPage;```
