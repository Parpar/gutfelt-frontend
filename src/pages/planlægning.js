import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function PlanlægningPage() {
  const [activeTab, setActiveTab] = useState('sheet');
  const [embedUrl, setEmbedUrl] = useState('');
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState('');
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
    if (!selectedFile) return alert('Vælg venligst en fil først.');
    setError('');
    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await fetch(`https://gutfelt-backend.onrender.com/api/upload/planlægning`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload fejlede.');
      const result = await response.json();
      const newDocument = { id: Date.now(), name: result.file.name, path: result.file.path, size: result.file.size };
      setDocuments(prev => [...prev, newDocument]);
      setSelectedFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="widget" style={{ margin: '2rem', height: 'auto', padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '2rem 2rem 1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e9ecef' }}>
        <h2>Planlægning</h2>
        <Link to="/medarbejdere" className="back-link" style={{ marginTop: 0 }}>← Tilbage til Medarbejdere</Link>
      </div>

      <div className="tab-navigation" style={{paddingLeft: '2rem'}}>
        <button onClick={() => setActiveTab('sheet')} className={activeTab === 'sheet' ? 'active' : ''}>Planlægningsark</button>
        <button onClick={() => setActiveTab('files')} className={activeTab === 'files' ? 'active' : ''}>Øvrige Filer</button>
      </div>

      <div style={{padding: '0 2rem 2rem 2rem'}}>
        {isLoading && <p>Indlæser...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && activeTab === 'sheet' && embedUrl && (
          <div style={{ height: 'calc(100vh - 300px)', overflow: 'hidden' }}>
            <iframe src={embedUrl} title="Planlægningsark" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
          </div>
        )}

        {!isLoading && activeTab === 'files' && (
          <div>
            <table className="document-table">
              <thead><tr><th>Filnavn</th><th>Størrelse</th><th></th></tr></thead>
              <tbody>
                {documents.filter(doc => doc.id !== process.env.PLANNING_SHEET_ID).map(doc => (
                  <tr key={doc.id}>
                    <td className="file-name-cell"><div className="file-icon"><i className="fas fa-file-alt"></i></div><span>{doc.name}</span></td>
                    <td>{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : ''}</td>
                    <td className="download-cell"><a href={doc.path} target="_blank" rel="noopener noreferrer" className="download-link">Download</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {documents.filter(doc => doc.id !== process.env.PLANNING_SHEET_ID).length === 0 && <p style={{marginTop: '1rem'}}>Der er ingen øvrige filer i denne kategori.</p>}
            
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
    </div>
  );
}

export default PlanlægningPage;