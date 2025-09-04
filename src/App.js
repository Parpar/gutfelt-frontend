import React, { useContext, useEffect } from 'react'; // Importer useEffect
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

// ProtectedRoute er uændret
function ProtectedRoute({ children }) {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppContent() {
  // Hent login-funktionen og den nuværende bruger fra vores Context
  const { currentUser, login } = useContext(UserContext);

  // --- DEN NYE KODEBLOK ---
  // useEffect kører én gang, lige når AppContent bliver vist første gang.
  useEffect(() => {
    // Hvis der IKKE er en bruger logget ind...
    if (!currentUser) {
      // Definer en "falsk" bruger, vi automatisk vil logge ind som.
      const autoLoginUser = { 
        name: 'Susanne Nielsen', 
        role: 'HR-redaktør' 
      };
      // Kald login-funktionen med den falske bruger.
      login(autoLoginUser);
    }
  }, [currentUser, login]); // Disse afhængigheder sikrer, at koden kun kører, når det er nødvendigt
  // --------------------------

  // Vent med at vise noget, indtil auto-login er sket.
  if (!currentUser) {
    return <div>Logger ind...</div>; // Viser en midlertidig load-besked
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            {/* Vi fjerner midlertidigt login-siden fra ruterne */}
            <Route path="/" element={<HomePage />} />
            <Route path="/standarder" element={<DocumentsPage />} />
            <Route path="/firmapolitikker" element={<PolicyPage />} />
            <Route path="/medarbejdere" element={<EmployeesPage />} />
            <Route path="/samarbejdspartnere" element={<PartnersPage />} />
            <Route path="/firmapolitikker/personale" element={<PersonalePage />} />
            <Route path="/firmapolitikker/fakturering" element={<FaktureringPage />} />
            <Route path="/firmapolitikker/kundehåndtering" element={<KundehåndteringPage />} />
            
            {/* Omdirigerer alle ukendte stier til forsiden */}
            <Route path="*" element={<Navigate to="/" />} />
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