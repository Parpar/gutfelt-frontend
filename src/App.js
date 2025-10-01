import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { UserProvider, UserContext } from './UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/homepage.js';
import LoginPage from './pages/loginpage.js';
import SearchResultsPage from './pages/searchresults.js';
import DocumentsPage from './pages/documentspage.js';
import PolicyPage from './pages/policypage.js';
import EmployeesPage from './pages/employeespage.js';
import PartnersPage from './pages/partnerspage.js';
import FaktureringPage from './pages/fakturering.js';
import KickoffPage from './pages/kickoff.js';
import KundehåndteringPage from './pages/kundehåndtering.js';
import KvalitetsstyringPage from './pages/kvalitetsstyring.js';
import MandagsmøderPage from './pages/mandagsmøder.js';
import PersonalehåndbogPage from './pages/personalehåndbog.js';
import PersondatapolitikPage from './pages/persondatapolitik.js';
import SlettepolitikPage from './pages/slettepolitik.js';
import WhistleblowerPage from './pages/whistleblower.js';
import HvidvaskPage from './pages/hvidvask.js';
import AftalebrevePage from './pages/aftalebreve.js';
import EngagementPage from './pages/engagement.js';
import HabilitetPage from './pages/habilitet.js';
import ProtokollatPage from './pages/protokollat.js';
import TjeklisterPage from './pages/tjeklister.js';
import OevrigePage from './pages/oevrige.js';
import FjernlagerPage from './pages/fjernlager.js';
import KompetenceskemaPage from './pages/kompetenceskema.js';
import KursusmaterialerPage from './pages/kursusmaterialer.js';
import PlanlægningPage from './pages/planlægning.js';
import BygningPage from './pages/bygning.js';
import RådgiverePage from './pages/rådgivere.js';
import SystemerPage from './pages/systemer.js';
import ForsikringerPage from './pages/forsikringer.js';

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
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/standarder" element={<DocumentsPage />} />
                <Route path="/firmapolitikker" element={<PolicyPage />} />
                <Route path="/medarbejdere" element={<EmployeesPage />} />
                <Route path="/samarbejdspartnere" element={<PartnersPage />} />
                <Route path="/firmapolitikker/fakturering" element={<FaktureringPage />} />
                <Route path="/firmapolitikker/kickoff" element={<KickoffPage />} />
                <Route path="/firmapolitikker/kundehåndtering" element={<KundehåndteringPage />} />
                <Route path="/firmapolitikker/kvalitetsstyring" element={<KvalitetsstyringPage />} />
                <Route path="/firmapolitikker/mandagsmøder" element={<MandagsmøderPage />} />
                <Route path="/firmapolitikker/personalehåndbog" element={<PersonalehåndbogPage />} />
                <Route path="/firmapolitikker/persondatapolitik" element={<PersondatapolitikPage />} />
                <Route path="/firmapolitikker/slettepolitik" element={<SlettepolitikPage />} />
                <Route path="/firmapolitikker/whistleblower" element={<WhistleblowerPage />} />
                <Route path="/firmapolitikker/hvidvask" element={<HvidvaskPage />} />
                <Route path="/standarder/aftalebreve" element={<AftalebrevePage />} />
                <Route path="/standarder/engagement" element={<EngagementPage />} />
                <Route path="/standarder/habilitet" element={<HabilitetPage />} />
                <Route path="/standarder/protokollat" element={<ProtokollatPage />} />
                <Route path="/standarder/tjeklister" element={<TjeklisterPage />} />
                <Route path="/standarder/oevrige" element={<OevrigePage />} />
                <Route path="/medarbejdere/fjernlager" element={<FjernlagerPage />} />
                <Route path="/medarbejdere/kompetenceskema" element={<KompetenceskemaPage />} />
                <Route path="/medarbejdere/kursusmaterialer" element={<KursusmaterialerPage />} />
                <Route path="/medarbejdere/planlægning" element={<PlanlægningPage />} />
                <Route path="/samarbejdspartnere/bygning" element={<BygningPage />} />
                <Route path="/samarbejdspartnere/rådgivere" element={<RådgiverePage />} />
                <Route path="/samarbejdspartnere/systemer" element={<SystemerPage />} />
                <Route path="/samarbejdspartnere/forsikringer" element={<ForsikringerPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
function App() {
  return (
    <UserProvider >
      <AppContent />
    </UserProvider>
  );
}
export default App;