import React from 'react';
import { Link } from 'react-router-dom';

function PartnersPage() {
  return (
    <div className="policy-hub-container">
      <div className="widget" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2>Samarbejdspartnere</h2>
        <p>Information vedrørende bygninger, rådgivere og systemer.</p>
      </div>
      <div className="policy-grid">
        <Link to="/samarbejdspartnere/bygning" className="policy-card"><div className="icon"><i className="fas fa-building"></i></div><h3>Bygning, faciliteter, frokost</h3></Link>
        <Link to="/samarbejdspartnere/rådgivere" className="policy-card"><div className="icon"><i className="fas fa-user-tie"></i></div><h3>Rådgivere</h3></Link>
        <Link to="/samarbejdspartnere/systemer" className="policy-card"><div className="icon"><i className="fas fa-laptop-code"></i></div><h3>Systemer</h3></Link>
      </div>
    </div>
  );
}
export default PartnersPage;
```---
### **Fase 2: Opret de nye undersider**

Nu skal du oprette en **ny fil i `src/pages` for hver undermappe**. Jeg har lavet en generisk skabelon, du kan bruge.

**Generisk Skabelon til Upload-sider:**
```jsx
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

// Dette er en genanvendelig komponent for alle upload-sider
function UploadPage({ pageTitle, backLink, backLinkText, category, iconClass }) {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useContext(UserContext);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
      
      <ul className="document-list">
        {documents.map(doc => (
          <li key={doc.id} className="document-item">
            <div className="document-icon"><i className={`fas ${iconClass || 'fa-file-alt'}`}></i></div>
            <div className="document-info"><h4>{doc.name}</h4><p>Uploadet for nylig - {`${(doc.size / 1024).toFixed(1)} KB`}</p></div>
            <a href={doc.path} target="_blank" rel="noopener noreferrer" className="document-download">Download</a>
          </li>
        ))}
        {documents.length === 0 && <p>Der er endnu ingen dokumenter i denne kategori.</p>}
      </ul>

      {currentUser && (currentUser.role === 'HR-redaktør' || currentUser.role === 'Redaktør') && (
        <div className="upload-section">
          <h3>Upload et nyt dokument</h3>
          <input type="file" key={selectedFile || ''} onChange={handleFileChange} />
          <button onClick={handleUpload} className="document-download">Upload Fil</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
          {message && <p style={{color: 'green'}}>{message}</p>}
        </div>
      )}
      
      <Link to={backLink} className="back-link">← Tilbage til {backLinkText}</Link>
    </div>
  );
}

export default UploadPage;```
**Opret nu f.eks. filen `src/pages/aftalebreve.js`** og indsæt denne kode, som *bruger* den generiske skabelon:
```jsx
import React from 'react';
import UploadPage from './UploadPage'; // Genbrug vores skabelon

function AftalebrevePage() {
    return (
        <UploadPage 
            pageTitle="Aftalebreve"
            category="aftalebreve"
            backLink="/standarder"
            backLinkText="Standarder"
            iconClass="fa-file-signature"
        />
    );
}
export default AftalebrevePage;```
**Du skal nu oprette en lille fil som denne for hver af dine 20+ undersider.** Det er stadig meget arbejde, men du behøver kun at kopiere den lille stump kode og ændre de 5 properties (`pageTitle`, `category` osv.) i hver fil.

---
### **Fase 3: Opdater Routeren (`App.js`)**

Til sidst skal din router kende alle de nye sider.

**Erstat alt indholdet i `src/App.js` med denne færdige version:**```jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider, UserContext } from './UserContext';

// Importer alle sider
import Header from './components/Header';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage.js';
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';

// Importer alle nye undersider
import AftalebrevePage from './pages/aftalebreve.js';
// ... (importer ALLE de andre små filer, du lige har oprettet)

function AppContent() {
  const { currentUser } = useContext(UserContext);
  // ... (resten af din App.js, som er den "simple" version, der virker)

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {!currentUser && (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
            {currentUser && (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/standarder" element={<DocumentsPage />} />
                <Route path="/firmapolitikker" element={<PolicyPage />} />
                <Route path="/medarbejdere" element={<EmployeesPage />} />
                <Route path="/samarbejdspartnere" element={<PartnersPage />} />

                {/* Tilføj en Route for HVER underside her */}
                <Route path="/standarder/aftalebreve" element={<AftalebrevePage />} />
                {/* ...osv. for alle ~20 undersider */}

                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
export default App;