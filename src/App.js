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

// Denne komponent er nu i brug og vil ikke give fejl
function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Vi laver en smart komponent, der vælger hvilke sider, der skal vises
function AppRoutes() {
  const { currentUser } = useContext(UserContext);

  // Hvis ingen er logget ind, vis KUN login-siden
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Alle andre stier omdirigeres til login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Hvis en bruger ER logget ind, vis alle de beskyttede sider
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/standarder" element={<DocumentsPage />} />
      <Route path="/firmapolitikker" element={<PolicyPage />} />
      <Route path="/medarbejdere" element={<EmployeesPage />} />
      <Route path="/samarbejdere" element={<PartnersPage />} />
      <Route path="/firmapolitikker/personale" element={<PersonalePage />} />
      <Route path="/firmapolitikker/fakturering" element={<FaktureringPage />} />
      <Route path="/firmapolitikker/kundehåndtering" element={<KundehåndteringPage />} />
      
      {/* Hvis en logget-ind bruger går til /login, send dem til forsiden */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      {/* Alle andre ukendte stier sendes til forsiden */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Denne komponent indeholder den overordnede struktur
function AppContent() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

// Hoved-appen er den samme
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;