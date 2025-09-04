import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider, UserContext } from './UserContext';

import Header from './components/Header';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage.js'; // Vi skal bruge denne igen
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';
import PersonalePage from './pages/personale.js';
import FaktureringPage from './pages/fakturering.js';
import KundehåndteringPage from './pages/kundehåndtering.js';

// Denne komponent beskytter vores sider.
function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    // Hvis brugeren ikke er logget ind, send dem til /login.
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Denne komponent indeholder selve app'en
function AppContent() {
  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* Login-siden er den eneste, der IKKE er beskyttet */}
            <Route path="/login" element={<LoginPage />} />

            {/* Alle andre sider ER beskyttet af ProtectedRoute */}
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/standarder" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker" element={<ProtectedRoute><PolicyPage /></ProtectedRoute>} />
            <Route path="/medarbejdere" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
            <Route path="/samarbejdspartnere" element={<ProtectedRoute><PartnersPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/personale" element={<ProtectedRoute><PersonalePage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/fakturering" element={<ProtectedRoute><FaktureringPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/kundehåndtering" element={<ProtectedRoute><KundehåndteringPage /></ProtectedRoute>} />

            {/* En "fallback"-rute, der fanger alle andre URL'er og sender brugeren det rigtige sted hen */}
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