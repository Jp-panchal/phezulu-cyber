
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import HumanIntel from './components/HumanIntel';
import CompanyGallery from './components/CompanyPhotos';
import InsightsFeed from './components/InsightsFeed';
import Footer from './components/Footer';
import { ServiceProvider } from './lib/ServiceContext';
import { ContactProvider } from './lib/ContactContext';
import ContactModal from './components/ContactModal';
import WhyPhezuluPage from './pages/WhyPhezuluPage';
import InsightCategoryPage from './pages/InsightCategoryPage';
import InsightDetailPage from './pages/InsightDetailPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import EmployeeManager from './components/admin/EmployeeManager';
import PartnerManager from './components/admin/PartnerManager';
import InsightManager from './components/admin/InsightManager';
import ServiceManager from './components/admin/ServiceManager';
import PhotoManager from './components/admin/PhotoManager';

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
    <ContactProvider>
      <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sapphire/30 selection:text-white">
        <Background />
        <Navbar />
        <main className="flex flex-col">
          <Hero />
          <TrustBar />
          <Services />
          {/* Why Phezulu section moved to separate page */}
          <HumanIntel />
          <InsightsFeed />
          <CompanyGallery />
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ContactProvider>
  );
};

// Layout wrapper for the standalone Why Phezulu page
const WhyPhezuluLayout = () => {
  return (
    <ContactProvider>
      <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sapphire/30 selection:text-white">
        <Background />
        <Navbar />
        <main className="flex flex-col">
          <WhyPhezuluPage />
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ContactProvider>
  );
};

// Layout wrapper for Insight Category Pages
const InsightCategoryLayout = ({ category, title, subtitle }: { category: string, title: string, subtitle: string }) => {
  return (
    <ContactProvider>
      <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sapphire/30 selection:text-white">
        <Background />
        <Navbar />
        <main className="flex flex-col">
          <InsightCategoryPage category={category} title={title} subtitle={subtitle} />
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ContactProvider>
  );
};

// Layout wrapper for Insight Detail Page
const InsightDetailLayout = () => {
  return (
    <ContactProvider>
      <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sapphire/30 selection:text-white">
        <Background />
        <Navbar />
        <main className="flex flex-col">
          <InsightDetailPage />
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ContactProvider>
  );
};

// Layout wrapper for Service Detail Page
const ServiceDetailLayout = () => {
  return (
    <ContactProvider>
      <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sapphire/30 selection:text-white">
        <Background />
        <Navbar />
        <main className="flex flex-col">
          <ServiceDetailPage />
        </main>
        <Footer />
        <ContactModal />
      </div>
    </ContactProvider>
  );
};

function App() {
  return (
    <ServiceProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainWebsite />} />
          <Route path="/why-phezulu" element={<WhyPhezuluLayout />} />

          {/* New Insight Category Routes */}
          <Route
            path="/insights"
            element={
              <InsightCategoryLayout
                category="All"
                title="Security Insights"
                subtitle="Curated intelligence from the Phezulu Cyber research team."
              />
            }
          />
          <Route
            path="/blog"
            element={
              <InsightCategoryLayout
                category="Blog"
                title="Security Blog"
                subtitle="Thoughts from the front lines of cyber defense."
              />
            }
          />
          <Route
            path="/webinars"
            element={
              <InsightCategoryLayout
                category="Webinar"
                title="Webinars & Events"
                subtitle="Deep dives into security architecture and strategy."
              />
            }
          />
          <Route
            path="/reports"
            element={
              <InsightCategoryLayout
                category="Threat Report"
                title="Threat Reports"
                subtitle="Data-driven analysis of the evolving threat landscape."
              />
            }
          />

          {/* Individual Insight Route */}
          <Route path="/insights/:id" element={<InsightDetailLayout />} />

          {/* Service detail routes */}
          <Route path="/services/:pillarSlug/:serviceSlug" element={<ServiceDetailLayout />} />

          <Route path="/services" element={<Navigate to="/#services" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<EmployeeManager />} />
            <Route path="partners" element={<PartnerManager />} />
            <Route path="insights" element={<InsightManager />} />
            <Route path="services" element={<ServiceManager />} />
            <Route path="photos" element={<PhotoManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ServiceProvider>
  );
}

export default App;
