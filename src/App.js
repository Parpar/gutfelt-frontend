import React, { useContext } from 'react'; // Importer useContext her
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Importer Navigate
import './App.css';
import { UserProvider, UserContext } from './UserContext'; // Importer BEGGE dele fra UserContext

import Header from './components/Header';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage.js'; // Importer den nye login-side
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';
import PersonalePage from './pages/personale.js';
import FaktureringPage from './pages/fakturering.js';
import KundehåndteringPage from './pages/kundehåndtering.js';

// Dette er en speciel komponent, der beskytter vores sider.
// Hvis brugeren ikke er logget ind, bliver de sendt til /login.
function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    // Omdiriger til login-siden
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* Login-siden er den eneste, der ikke er beskyttet */}
            <Route path="/login" element={<LoginPage />} />

            {/* Alle andre sider er nu beskyttet af ProtectedRoute */}
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/dokumenter" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker" element={<ProtectedRoute><PolicyPage /></ProtectedRoute>} />
            <Route path="/medarbejdere" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
            <Route path="/samarbejdspartnere" element={<ProtectedRoute><PartnersPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/personale" element={<ProtectedRoute><PersonalePage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/fakturering" element={<ProtectedRoute><FaktureringPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/kundehåndtering" element={<ProtectedRoute><KundehåndteringPage /></ProtectedRoute>} />

            {/* En "fallback" rute, der fanger alle andre URL'er */}
            <Route path="*" element={currentUser ? <Navigate to="/" /> : <Navigate to="/login" />} />
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