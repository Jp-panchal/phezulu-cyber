
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, FileCheck, Search, Server, Activity, X, ArrowRight, ChevronRight, Minimize2, ArrowLeft, CheckCircle2, Zap, BarChart3, Image as ImageIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fetchPillars } from '../lib/api';
import type { Pillar, ServiceDetail } from '../types';
import Button from './ui/Button';
import { useServiceContext } from '../lib/ServiceContext';
import { useContact } from '../lib/ContactContext';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../lib/slug';

// --- Sub-component: Service Module Card (List View) ---
interface ServiceModuleCardProps {
  service: ServiceDetail;
  index: number;
  isHighlighted?: boolean;
  onLearnMore: (service: ServiceDetail, pillarTitle?: string) => void;
  // Optional prop to show which pillar this belongs to in search results
  pillarContext?: string;
}

const ServiceModuleCard: React.FC<ServiceModuleCardProps> = ({
  service,
  index,
  isHighlighted,
  onLearnMore,
  pillarContext
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
    }
  }, [isHighlighted]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        borderColor: isHighlighted ? 'rgba(217,4,41,0.6)' : 'rgba(30,41,59,1)',
        boxShadow: isHighlighted ? '0 0 15px rgba(217,4,41,0.2)' : 'none'
      }}
      transition={{ delay: index * 0.05 }}
      className={`bg-slate-900/50 border p-6 rounded-xl hover:border-slate-600 transition-all duration-300 group flex flex-col h-full ${isHighlighted ? 'border-crimson/60' : 'border-slate-800'
        }`}
    >
      <div className="mb-4">
        {pillarContext && (
          <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">{pillarContext}</div>
        )}
        <h4 className={`text-xl font-bold transition-colors mb-2 ${isHighlighted ? 'text-crimson' : 'text-white group-hover:text-crimson'}`}>
          {service.name}
        </h4>
        <div className="h-0.5 w-12 bg-slate-700 group-hover:bg-crimson/50 transition-colors" />
      </div>

      {/* Description is now always visible */}
      <div className="flex-1">
        <p className="text-slate-400 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLearnMore(service, pillarContext);
          }}
          className="w-full py-3 rounded bg-slate-800 hover:bg-crimson text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          Learn More
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
};

// --- Sub-component: Service Deep Dive View (Detailed Page) ---
interface ServiceDeepDiveProps {
  service: ServiceDetail;
  onBack: () => void;
  pillarTitle: string;
  onScheduleDemo: () => void;
}

const ServiceDeepDive: React.FC<ServiceDeepDiveProps> = ({
  service,
  onBack,
  pillarTitle,
  onScheduleDemo
}) => {
  // Use generic content if detailed fields aren't populated in API yet
  const fullDesc = service.fullDescription || [
    service.description,
    "Our approach integrates advanced threat intelligence with automated response mechanisms to ensure your business operations remain uninterrupted. We leverage a combination of proprietary heuristics and machine learning models to detect anomalies that traditional signature-based tools miss.",
    "This service is designed to scale with your organization, providing granular visibility into your security posture while reducing the operational burden on your internal IT teams. By partnering with Phezulu, you gain access to world-class expertise and infrastructure without the capital expenditure."
  ];

  const features = service.features || [
    "24/7 Real-time Monitoring & Alerting",
    "Automated Threat Containment",
    "Compliance Reporting (GDPR/ISO27001)",
    "Dedicated Security Analyst Support",
    "Customizable Policy Enforcement"
  ];

  const benefits = service.benefits || [
    "Reduce Mean Time to Detect (MTTD) by 60%",
    "Eliminate Alert Fatigue for Internal Teams",
    "Ensure Continuous Regulatory Compliance",
    "Predictable Operational Costs"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex flex-col h-full"
    >
      {/* Navigation Header */}
      <div className="flex flex-col gap-4 mb-8 pb-6 border-b border-slate-800">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 px-3 py-2 -ml-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Back to {pillarTitle}</span>
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-crimsonLight uppercase tracking-wider mb-1">
            <span onClick={onBack} className="cursor-pointer hover:underline hover:text-crimson transition-colors">{pillarTitle}</span>
            <ChevronRight size={12} />
            <span>Catalog</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">{service.name}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-12">

        {/* Left Column: Long Text & Diagram */}
        <div className="lg:col-span-2 space-y-8">

          {/* Visual Diagram Section (New) */}
          {service.diagramUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-lg">
              <div className="p-3 border-b border-slate-800 flex items-center gap-2 bg-slate-900/80">
                <ImageIcon size={14} className="text-crimson" />
                <span className="text-xs font-mono uppercase text-slate-400">Architecture Diagram</span>
              </div>
              <img src={service.diagramUrl} alt={`${service.name} Diagram`} className="w-full h-auto object-cover" />
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="text-crimson" size={20} /> Executive Summary
            </h3>
            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
              {fullDesc.map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="text-amber" size={20} /> Technical Specifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs uppercase text-slate-500 font-bold">Deployment</div>
                <div className="text-white">Cloud-Native / Hybrid</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase text-slate-500 font-bold">Latency</div>
                <div className="text-white">&lt; 50ms Real-time Analysis</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase text-slate-500 font-bold">Encryption</div>
                <div className="text-white">AES-256 Data at Rest</div>
              </div>
              <div className="space-y-2">
                <div className="text-xs uppercase text-slate-500 font-bold">SLA</div>
                <div className="text-white">99.99% Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Features & Benefits Sidebar */}
        <div className="space-y-8">

          {/* Key Capabilities */}
          <div className="bg-gradient-to-br from-slate-900 to-midnight border border-slate-800 rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={18} /> Key Capabilities
            </h3>
            <ul className="space-y-3">
              {features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Business Value */}
          <div className="bg-gradient-to-br from-crimson/10 to-transparent border border-crimson/20 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="text-crimson" size={18} /> Business Value
            </h3>
            <ul className="space-y-3">
              {benefits.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <ArrowRight className="text-crimson mt-0.5 shrink-0" size={14} />
                  {typeof item === 'string' ? item : item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4">
            <Button className="w-full justify-center" onClick={onScheduleDemo}>Schedule Demo</Button>
          </div>

        </div>

      </div>
    </motion.div>
  );
};


const Services: React.FC = () => {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Keep small to avoid scrolling

  // Local state for the detail view within the modal
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceDetail | null>(null);

  // Use Context for Modal State
  const { selectedPillarTitle, selectedServiceName, openServiceModal, closeServiceModal } = useServiceContext();
  const { openContact } = useContact();
  const navigate = useNavigate();

  // Map string icon names from API/DB to actual Lucide components
  const iconMap: Record<string, LucideIcon> = {
    ShieldAlert,
    Server,
    FileCheck,
    Lock,
    Search,
    Activity
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPillars();
        // Hydrate the data with actual Icon components
        const hydratedData = data.map((pillar) => ({
          ...pillar,
          icon: iconMap[pillar.iconName] || ShieldAlert
        }));
        setPillars(hydratedData);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedPillar = pillars.find(p => p.title === selectedPillarTitle) || null;

  // Flatten services for search/filter results
  const allServicesFlat = useMemo(() => {
    return pillars.flatMap(pillar =>
      pillar.details.map(service => ({
        ...service,
        pillarTitle: pillar.title
      }))
    );
  }, [pillars]);

  // Filter Logic
  const filteredServices = useMemo(() => {
    return allServicesFlat.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.pillarTitle === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [allServicesFlat, activeCategory, searchQuery]);

  // Helper to determine if we are in "Search/Filter Mode" or "Default Pillar Mode"
  // If search query exists OR category is not 'All', we show the filtered list.
  const isFiltering = searchQuery.length > 0 || activeCategory !== 'All';

  // Effect to automatically open detail view if a specific service is requested via context (e.g. from Mega Menu)
  useEffect(() => {
    if (selectedPillar && selectedServiceName) {
      const service = selectedPillar.details.find(s => s.name === selectedServiceName);
      if (service) {
        setActiveServiceDetail(service);
      }
    } else if (!selectedServiceName) {
      // Reset detail view if we just opened the pillar without a specific service
      setActiveServiceDetail(null);
    }
  }, [selectedPillar, selectedServiceName]);

  // Reset pagination when pillar changes
  useEffect(() => {
    if (selectedPillar) {
      setCurrentPage(1);
    }
  }, [selectedPillar]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPillar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPillar]);

  const handleClose = () => {
    setActiveServiceDetail(null);
    closeServiceModal();
  };

  const handleBackToCatalog = () => {
    setActiveServiceDetail(null);
    // If we are in a context-driven deep dive (e.g. from Mega Menu), we need to clear the context selection
    // so that the effect doesn't force us back, and so the URL/state reflects the list view.
    if (selectedServiceName) {
      openServiceModal(selectedPillarTitle!);
    }
  };

  const handleScheduleDemo = () => {
    // Close the service modal so the contact overlay is unobstructed, then open Contact.
    closeServiceModal();
    setActiveServiceDetail(null);
    openContact();
  };

  const goToServicePage = (service: ServiceDetail, pillarTitle?: string) => {
    const pillar = pillarTitle || service.pillarTitle || selectedPillar?.title;
    if (!pillar) return;
    const path = `/services/${slugify(pillar)}/${slugify(service.name)}`;
    closeServiceModal();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['All', ...pillars.map(p => p.title)];

  return (
    <section id="services" className="py-24 relative min-h-[800px]">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col lg:flex-row gap-8 justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Our Core Pillars of <span className="text-crimson">Defense:</span>
            </h2>
            <p className="text-slate-400 max-w-2xl text-lg">
              Securing Every Layer of Your Digital Transformation Comprehensive Cybersecurity, Cloud, and AI Solutions for End-to-End Protection.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="w-full lg:w-auto flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative group w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-crimson transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search services (e.g. 'EDR', 'Cloud')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-crimson transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${activeCategory === cat
                ? 'bg-crimson border-crimson text-white shadow-lg shadow-crimson/20'
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[420px] rounded-2xl bg-slate-900/40 border border-slate-800 p-8 flex flex-col animate-pulse">
                <div className="w-12 h-12 rounded-lg bg-slate-800 mb-6" />
                <div className="h-8 bg-slate-800 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-800 rounded w-1/2 mb-6" />
                <div className="space-y-3 flex-1">
                  <div className="h-3 bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-800 rounded w-5/6" />
                </div>
                <div className="mt-6 pt-6 border-t border-slate-800/50 flex items-center">
                  <div className="h-4 w-32 bg-slate-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTENT SWITCHER: Filtered Grid vs Pillar Grid */}
        {!loading && (
          isFiltering ? (
            // --- FILTERED RESULTS VIEW ---
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.length > 0 ? (
                filteredServices.map((service, idx) => (
                  <ServiceModuleCard
                    key={`${service.pillarTitle}-${service.name}`}
                    index={idx}
                    service={service}
                    pillarContext={service.pillarTitle}
                    onLearnMore={(svc, pillarTitle) => goToServicePage(svc, pillarTitle || svc.pillarTitle)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-500 bg-slate-900/20 rounded-xl border border-slate-800 border-dashed">
                  <Search size={48} className="mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">No services found matching "{searchQuery}"</p>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="mt-4 text-crimson hover:underline text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            // --- DEFAULT PILLAR VIEW ---
            <div className="grid md:grid-cols-3 gap-6">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  onClick={() => openServiceModal(pillar.title)}
                  className={`
                        relative p-8 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md overflow-hidden group
                        transition-colors duration-300 hover:border-crimson cursor-pointer h-full flex flex-col
                        `}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors border border-slate-700">
                      {pillar.icon && <pillar.icon className="w-6 h-6 text-white" />}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-sm font-mono text-crimsonLight mb-4 uppercase tracking-wider">{pillar.subtitle}</p>
                    <p className="text-slate-400 mb-8 leading-relaxed flex-1">{pillar.description}</p>
                    <div className="flex items-center text-sm font-bold text-white group-hover:text-crimson transition-colors pt-6 border-t border-slate-800/50 group-hover:border-slate-700/50">
                      View Service Catalog <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Main Service Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-midnight flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-midnight/90 backdrop-blur-xl z-20 shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                  {selectedPillar.icon && <selectedPillar.icon className="w-6 h-6 text-crimson" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedPillar.title}</h2>
                  <p className="text-xs font-mono text-crimsonLight uppercase">Classified Service Catalog</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 p-6 md:p-12 relative flex flex-col">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
              <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col">

                {/* VIEW SWITCHER: List or Deep Dive */}
                <AnimatePresence mode="wait">
                  {activeServiceDetail ? (
                    <div className="flex-1 overflow-visible"> {/* Allow deep dive to have its own structure/scroll if needed, but for now keeping it managed */}
                      <ServiceDeepDive
                        key="detail"
                        service={activeServiceDetail}
                        onBack={handleBackToCatalog}
                        pillarTitle={selectedPillar.title}
                        onScheduleDemo={handleScheduleDemo}
                      />
                    </div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex flex-col h-full"
                    >
                      <div className="mb-6 shrink-0">
                        <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
                          {selectedPillar.subtitle}
                        </h3>
                        <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
                          {selectedPillar.description}
                        </p>
                      </div>

                      <div className="flex flex-col flex-1 min-h-0">
                        <div className="flex items-center gap-2 mb-4 shrink-0">
                          <Activity size={18} className="text-crimson" />
                          <span className="font-mono text-sm text-slate-500 uppercase tracking-widest">Active Modules</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
                          {/* PAGINATION LOGIC APPLIED HERE */}
                          {selectedPillar.details && (() => {
                            const indexOfLastItem = currentPage * itemsPerPage;
                            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                            const currentServices = selectedPillar.details.slice(indexOfFirstItem, indexOfLastItem);
                            const totalPages = Math.ceil((selectedPillar.details.length || 0) / itemsPerPage);

                            return (
                              <>
                                {currentServices.map((service: ServiceDetail, idx: number) => (
                                  <ServiceModuleCard
                                    key={idx}
                                    service={service}
                                    index={idx}
                                    isHighlighted={service.name === selectedServiceName}
                                    onLearnMore={(s) => goToServicePage(s, selectedPillar?.title)}
                                  />
                                ))}

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                  <div className="col-span-full flex justify-between items-center mt-auto pt-4 border-t border-slate-800/50">
                                    <div className="text-xs font-mono text-slate-500">
                                      PAGE {currentPage} / {totalPages}
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded hover:bg-slate-800 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                      >
                                        <ChevronRight size={20} className="rotate-180" />
                                      </button>
                                      <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded hover:bg-slate-800 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                      >
                                        <ChevronRight size={20} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer of Modal - Only show on list view or if needed, adjusted to fit */}
                {!activeServiceDetail && (
                  <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center shrink-0">
                    <p className="text-xs font-mono text-slate-600">CONFIDENTIAL - PHEZULU CYBER SYSTEMS</p>
                    <Button variant="outline" onClick={handleClose} icon={<Minimize2 size={16} />}>
                      Close File
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;

