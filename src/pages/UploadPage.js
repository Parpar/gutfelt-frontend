import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function UploadPage({ pageTitle, category, backLink, backLinkText, iconClass }) {
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
            <div className="document-info"><h4>{doc.name}</h4><p>Uploadet for nylig - {doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : ''}</p></div>
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

**3. Opret alle de små Undersider i `src/pages`**
*Nu skal du oprette 9 nye, små filer, der bruger skabelonen ovenfor.*

*   **`fakturering.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function FaktureringPage() {
        return <UploadPage pageTitle="Fakturering" category="fakturering" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-file-invoice-dollar" />;
    }
    export default FaktureringPage;
    ```*   **`kickoff.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function KickoffPage() {
        return <UploadPage pageTitle="Kickoff møder" category="kickoff" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-rocket" />;
    }
    export default KickoffPage;
    ```
*   **`kundehåndtering.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function KundehåndteringPage() {
        return <UploadPage pageTitle="Kundehåndtering" category="kundehåndtering" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-headset" />;
    }
    export default KundehåndteringPage;
    ```
*   **`kvalitetsstyring.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function KvalitetsstyringPage() {
        return <UploadPage pageTitle="Kvalitetsstyringsmanuel" category="kvalitetsstyring" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-check-double" />;
    }
    export default KvalitetsstyringPage;
    ```
*   **`mandagsmøder.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function MandagsmøderPage() {
        return <UploadPage pageTitle="Mandagsmøder" category="mandagsmøder" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-calendar-week" />;
    }
    export default MandagsmøderPage;
    ```*   **`personalehåndbog.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function PersonalehåndbogPage() {
        return <UploadPage pageTitle="Personalehåndbog" category="personalehåndbog" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-users" />;
    }
    export default PersonalehåndbogPage;
    ```
*   **`persondatapolitik.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function PersondatapolitikPage() {
        return <UploadPage pageTitle="Persondatapolitik" category="persondatapolitik" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-user-shield" />;
    }
    export default PersondatapolitikPage;
    ```
*   **`slettepolitik.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function SlettepolitikPage() {
        return <UploadPage pageTitle="Slettepolitik" category="slettepolitik" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-trash-alt" />;
    }
    export default SlettepolitikPage;
    ```
*   **`whistleblower.js`**:
    ```jsx
    import React from 'react';
    import UploadPage from './UploadPage';
    function WhistleblowerPage() {
        return <UploadPage pageTitle="Whistleblowordning" category="whistleblower" backLink="/firmapolitikker" backLinkText="Firmapolitikker" iconClass="fa-bullhorn" />;
    }
    export default WhistleblowerPage;
    ```

**4. Opdater Routeren: `src/App.js`**
*Erstat alt indholdet med denne kode, der nu kender alle de nye sider.*
```jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider, UserContext } from './UserContext';

// Importer hovedsider
import Header from './components/Header';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage.js';
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';

// Importer undersider for Firmapolitikker
import FaktureringPage from './pages/fakturering.js';
import KickoffPage from './pages/kickoff.js';
import KundehåndteringPage from './pages/kundehåndtering.js';
import KvalitetsstyringPage from './pages/kvalitetsstyring.js';
import MandagsmøderPage from './pages/mandagsmøder.js';
import PersonalehåndbogPage from './pages/personalehåndbog.js';
import PersondatapolitikPage from './pages/persondatapolitik.js';
import SlettepolitikPage from './pages/slettepolitik.js';
import WhistleblowerPage from './pages/whistleblower.js';

// Denne funktion håndterer, hvad der skal vises
function AppContent() {
  const { currentUser } = useContext(UserContext);
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {!currentUser ? (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/standarder" element={<DocumentsPage />} />
                <Route path="/firmapolitikker" element={<PolicyPage />} />
                <Route path="/medarbejdere" element={<EmployeesPage />} />
                <Route path="/samarbejdspartnere" element={<PartnersPage />} />
                
                {/* Routes for Firmapolitikker */}
                <Route path="/firmapolitikker/fakturering" element={<FaktureringPage />} />
                <Route path="/firmapolitikker/kickoff" element={<KickoffPage />} />
                <Route path="/firmapolitikker/kundehåndtering" element={<KundehåndteringPage />} />
                <Route path="/firmapolitikker/kvalitetsstyring" element={<KvalitetsstyringPage />} />
                <Route path="/firmapolitikker/mandagsmøder" element={<MandagsmøderPage />} />
                <Route path="/firmapolitikker/personalehåndbog" element={<PersonalehåndbogPage />} />
                <Route path="/firmapolitikker/persondatapolitik" element={<PersondatapolitikPage />} />
                <Route path="/firmapolitikker/slettepolitik" element={<SlettepolitikPage />} />
                <Route path="/firmapolitikker/whistleblower" element={<WhistleblowerPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Hoved-app er uændret
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
export default App;