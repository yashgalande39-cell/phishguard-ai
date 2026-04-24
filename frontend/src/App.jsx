import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Datasets from './pages/Datasets';
import Dashboard from './pages/Dashboard';
import Implementation from './pages/Implementation';
import Research from './pages/Research';
import Contact from './pages/Contact';
import Team from './pages/Team';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function App() {
  // Persist theme in localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('phishguard-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;
    localStorage.setItem('phishguard-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
              <div className="spin" style={{ width: 48, height: 48, border: '3px solid var(--border-color)', borderTop: '3px solid var(--brand-primary)', borderRadius: '50%' }} />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/datasets" element={<Datasets />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/implementation" element={<Implementation />} />
              <Route path="/research" element={<Research />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              {/* 404 catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
