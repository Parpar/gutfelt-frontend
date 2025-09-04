import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider, UserContext } from './UserContext';

// Importer KUN de komponenter, vi med sikkerhed skal bruge på øverste niveau
import Header from './components/Header';
import HomePage from './pages/homepage.js';

// Importer siderne direkte, da vi ikke længere bruger ProtectedRoute
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';
import PersonalePage from './pages/personale.js';
import FaktureringPage from './pages/fakturering.js';
import KundehåndteringPage from './pages/kundehåndtering.js';

// Denne komponent indeholder nu den fulde, indloggede app-oplevelse
function AppContent() {
  const { currentUser, login } = useContext(UserContext);

  // Den automatiske login-logik er den samme
  useEffect(() => {
    if (!currentUser) {
      const autoLoginUser = { name: 'Susanne Nielsen', role: 'HR-redaktør' };
      login(autoLoginUser);
    }
  }, [currentUser, login]);

  // Viser en load-besked, indtil brugeren er automatisk logget ind
  if (!currentUser) {
    return <div>Logger ind...</div>;
  }

  // Når brugeren er logget ind, vises den fulde app
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/standarder" element={<DocumentsPage />} />
            <Route path="/firmapolitikker" element={<PolicyPage />} />
            <Route path="/medarbejdere" element={<EmployeesPage />} />
            <Route path="/samarbejdspartnere" element={<PartnersPage />} />
            <Route path="/firmapolitikker/personale" element={<PersonalePage />} />
            <Route path="/firmapolitikker/fakturering" element={<FaktureringPage />} />
            <Route path="/firmapolitikker/kundehåndtering" element={<KundehåndteringPage />} />
            
            {/* Omdirigerer alle andre stier til forsiden */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Hoved-appen "wrapper" nu kun AppContent i UserProvider
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;