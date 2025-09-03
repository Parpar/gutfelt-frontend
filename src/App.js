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

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
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
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            {/* RETTET HER: */}
            <Route path="/standarder" element={<ProtectedRoute><DocumentsPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker" element={<ProtectedRoute><PolicyPage /></ProtectedRoute>} />
            <Route path="/medarbejdere" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
            <Route path="/samarbejdspartnere" element={<ProtectedRoute><PartnersPage /></ProtectedRoute>} />

            <Route path="/firmapolitikker/personale" element={<ProtectedRoute><PersonalePage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/fakturering" element={<ProtectedRoute><FaktureringPage /></ProtectedRoute>} />
            <Route path="/firmapolitikker/kundehåndtering" element={<ProtectedRoute><KundehåndteringPage /></ProtectedRoute>} />

            <Route path="*" element={currentUser ? <Navigate to="/" /> : <Navigate to="/login" />} />
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