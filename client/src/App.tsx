import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import HumanIntel from './components/HumanIntel';
import WhyPhezulu from './components/WhyPhezulu';
import Contact from './components/Contact';
import InsightsFeed from './components/InsightsFeed';
import Footer from './components/Footer';
import { ServiceProvider } from './lib/ServiceContext';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import EmployeeManager from './components/admin/EmployeeManager';
import PartnerManager from './components/admin/PartnerManager';
import InsightManager from './components/admin/InsightManager';
import ServiceManager from './components/admin/ServiceManager';

// Scroll handling wrapper
const MainWebsite = () => {
  const location = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to it
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure render
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sapphire/30 selection:text-white">
      <Background />
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <TrustBar />
        <Services />
        <WhyPhezulu />
        <HumanIntel />
        <InsightsFeed />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainWebsite />} />
          
          {/* Redirections for specific sections */}
          <Route path="/why-phezulu" element={<Navigate to="/#why-phezulu" replace />} />
          <Route path="/blog" element={<Navigate to="/#insights" replace />} />
          <Route path="/webinars" element={<Navigate to="/#insights" replace />} />
          <Route path="/reports" element={<Navigate to="/#insights" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<EmployeeManager />} />
            <Route path="partners" element={<PartnerManager />} />
            <Route path="insights" element={<InsightManager />} />
            <Route path="services" element={<ServiceManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}

export default App;