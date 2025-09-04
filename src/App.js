import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider, UserContext } from './UserContext';

import Header from './components/Header';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage.js';
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';
import PersonalePage from './pages/personale.js';
import FaktureringPage from './pages/fakturering.js';
import KundehåndteringPage from './pages/kundehåndtering.js';

function AppContent() {
  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* Hvis ingen er logget ind, peger ALLE stier til login-siden */}
            {!currentUser && (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}

            {/* Hvis en bruger ER logget ind, er disse stier tilgængelige */}
            {currentUser && (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/standarder" element={<DocumentsPage />} />
                <Route path="/firmapolitikker" element={<PolicyPage />} />
                <Route path="/medarbejdere" element={<EmployeesPage />} />
                <Route path="/samarbejdspartnere" element={<PartnersPage />} />
                <Route path="/firmapolitikker/personale" element={<PersonalePage />} />
                <Route path="/firmapolitikker/fakturering" element={<FaktureringPage />} />
                <Route path="/firmapolitikker/kundehåndtering" element={<KundehåndteringPage />} />
                
                {/* Hvis en logget-ind bruger går til en ukendt side, send dem til forsiden */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Hoved-appen er uændret
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;