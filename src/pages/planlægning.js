import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PlanlægningPage() {
  const [activeTab, setActiveTab] = useState('sheet'); // 'sheet' or 'files'
  const [embedUrl, setEmbedUrl] = useState('');
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [sheetRes, filesRes] = await Promise.all([
          fetch('https://gutfelt-backend.onrender.com/api/planning-sheet'),
          fetch('https://gutfelt-backend.onrender.com/api/documents/planlægning')
        ]);
        if (!sheetRes.ok || !filesRes.ok) throw new Error('Kunne ikke hente data.');
        const sheetData = await sheetRes.json();
        const filesData = await filesRes.json();
        setEmbedUrl(sheetData.embedUrl);
        setDocuments(filesData);
      } catch (err) {
        setError('Kunne ikke hente data fra serveren.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (event) => setSelectedFile(event.target.files[0]);
  
  const handleUpload = async () => {
    // ... (upload-logik er den samme)
  };

  return (
    <div className="widget" style={{ margin: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Planlægning</h2>
        <Link to="/medarbejdere" className="back-link" style={{ marginTop: 0 }}>← Tilbage til Medarbejdere</Link>
      </div>

      <div className="tab-navigation">
        <button onClick={() => setActiveTab('sheet')} className={activeTab === 'sheet' ? 'active' : ''}>Planlægningsark</button>
        <button onClick={() => setActiveTab('files')} className={activeTab === 'files' ? 'active' : ''}>Øvrige Filer</button>
      </div>

      {isLoading && <p>Indlæser...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!isLoading && activeTab === 'sheet' && embedUrl && (
        <div style={{ height: 'calc(100vh - 250px)', overflow: 'hidden' }}>
          <iframe src={embedUrl} title="Planlægningsark" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
        </div>
      )}

      {!isLoading && activeTab === 'files' && (
        <div>
          <table className="document-table">
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td className="file-name-cell"><div className="file-icon"><i className="fas fa-file-alt"></i></div><span>{doc.name}</span></td>
                  <td><a href={doc.path} target="_blank" rel="noopener noreferrer" className="download-link">Download</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          {documents.length === 0 && <p style={{marginTop: '1rem'}}>Der er ingen øvrige filer i denne kategori.</p>}
          
          {currentUser && currentUser.role === 'Redaktør' && (
            <div className="upload-section">
              <h3>Upload en øvrig fil</h3>
              <input type="file" key={selectedFile || ''} onChange={handleFileChange} />
              <button onClick={handleUpload}>Upload Fil</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlanlægningPage;