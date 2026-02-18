
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useContact } from '../lib/ContactContext';
import { FALLBACK_PILLARS } from '../lib/api';
import { slugify } from '../lib/slug';
import LogoDark from '../assets/Logo-dark.svg';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  const { openContact } = useContact();

  const navigate = useNavigate();
  const location = useLocation();

  // Scroll Locking for Desktop Menu
  useEffect(() => {
    if (activeDesktopMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeDesktopMenu]);

  // Close Desktop Menu on Click Outside (using global listener if backdrop is not sufficient)
  useEffect(() => {
    const handleClickOutside = () => setActiveDesktopMenu(null);
    if (activeDesktopMenu) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => window.removeEventListener('click', handleClickOutside);
  }, [activeDesktopMenu]);

  const handleDesktopMenuClick = (name: string) => {
    setActiveDesktopMenu(prev => prev === name ? null : name);
  };




  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    // Only observe on main page
    if (location.pathname !== '/') return;

    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -50% 0px'
    });

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [location.pathname]);

  interface NavItemConfig {
    name: string;
    href: string;
    type: 'link' | 'dropdown' | 'mega' | 'page';
    viewTarget?: string;
    dropdownItems?: { name: string; href: string }[];
  }

  const navItems: NavItemConfig[] = [
    { name: 'Why Phezulu', href: '/why-phezulu', type: 'page' },
    {
      name: 'Services',
      href: '#services',
      type: 'mega'
    },
    { name: 'Partners', href: '#trust', type: 'link' },
    {
      name: 'Insights',
      href: '/insights',
      type: 'dropdown',
      dropdownItems: [
        { name: 'All Insights', href: '/insights' },
        { name: 'Blog', href: '/blog' },
        { name: 'Webinars', href: '/webinars' },
        { name: 'Reports', href: '/reports' },
      ]
    },
  ];

  const handleMobileNavClick = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      // Hash Link Logic
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Page Link Logic (e.g. /why-phezulu, /blog)
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const handleServiceClick = (e: React.MouseEvent, pillarTitle: string, serviceName?: string) => {
    e.preventDefault();
    setActiveDesktopMenu(null);
    setMobileMenuOpen(false);

    if (serviceName) {
      const path = `/services/${slugify(pillarTitle)}/${slugify(serviceName)}`;
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // No specific service, fallback to services section
    if (location.pathname !== '/') {
      navigate('/#services');
    } else {
      const servicesElement = document.getElementById('services');
      servicesElement?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openContact();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-midnight/90 backdrop-blur-md border-b border-slate-800 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={handleLogoClick}
        >
          {/* Logo Dark SVG */}
          <div className="relative w-11 h-11">
            <img src={LogoDark} alt="Phezulu Logo" className="w-full h-full object-contain transition-transform group-hover:scale-105" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-lg font-heading font-extrabold text-slate-200 tracking-tight">
              Phezulu Global Technology
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isChildActive = item.dropdownItems?.some(sub => sub.href === location.pathname);
            const isActive = (location.pathname === item.href) ||
              (location.pathname === '/' && activeSection === item.href.substring(1)) ||
              isChildActive;

            const isOpen = activeDesktopMenu === item.name;

            return (
              <div key={item.name} className="relative group">
                <button
                  onClick={(e) => {
                    if (item.type === 'dropdown' || item.type === 'mega') {
                      e.stopPropagation();
                      handleDesktopMenuClick(item.name);
                    } else {
                      handleLinkClick(e as any, item.href);
                    }
                  }}
                  className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors py-2 relative bg-transparent border-none cursor-pointer ${isActive || isOpen ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {item.name}
                  {(item.type === 'dropdown' || item.type === 'mega') && (
                    <ChevronDown className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-crimson' : ''}`} />
                  )}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-crimson transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </button>

                {/* Desktop Dropdown Menu (Standard) */}
                {item.type === 'dropdown' && item.dropdownItems && (
                  <div
                    className={`absolute top-full left-0 pt-2 w-48 transition-all duration-200 ease-in-out transform z-50 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-midnight border border-slate-800 rounded-lg shadow-xl overflow-hidden py-2">
                      {item.dropdownItems.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={(e) => handleLinkClick(e, subItem.href)}
                          className="block px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border-l-2 border-transparent hover:border-crimson"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Desktop Mega Menu (Services) */}
                {item.type === 'mega' && (
                  <div
                    className={`fixed left-0 right-0 top-[70px] flex justify-center transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
                  // REMOVED stopPropagation here so clicking the "left/right" empty space bubbles to window and closes existing menu
                  >
                    {/* Backdrop for click-outside relative to just this container if needed, but we use global listener */}
                    <div
                      className="w-[95vw] max-w-7xl bg-midnight/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto"
                      onClick={(e) => e.stopPropagation()} // Added here so clicking CONTENT keeps it open
                    >
                      {FALLBACK_PILLARS.map((pillar, idx) => (
                        <div key={idx} className="space-y-4 flex flex-col">
                          <div className="flex items-center gap-4 pb-2 border-b border-slate-800 shrink-0">
                            <div className={`p-2 rounded border ${idx === 0 ? 'bg-crimson/10 border-crimson/20 text-crimson' : idx === 1 ? 'bg-amber/10 border-amber/20 text-amber' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                              {pillar.icon && React.createElement(pillar.icon, { size: 18 })}
                            </div>
                            <h3 className={`font-heading font-bold text-lg text-white`}>
                              {pillar.title}
                            </h3>
                          </div>

                          {/* Use Grid for long lists (Cybersecurity), Flex col for short ones */}
                          <ul className={`gap-x-4 gap-y-2 ${pillar.details && pillar.details.length > 8 ? 'grid grid-cols-2' : 'space-y-2'}`}>
                            {pillar.details && pillar.details.map((service, sIdx) => (
                              <li key={sIdx}>
                                <a
                                  href="#services"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceClick(e, pillar.title, service.name);
                                    setActiveDesktopMenu(null); // Close menu on selection
                                  }}
                                  className="text-xs text-slate-400 hover:text-white block transition-colors hover:translate-x-1 duration-200 leading-tight py-1.5 flex items-center gap-2 group/link"
                                  title={service.name}
                                >
                                  {/* Small dot only for non-grid (cleaner look for grid items) can be debated, but keeping consistent */}
                                  <span className="w-1 h-1 rounded-full bg-slate-600 group-hover/link:bg-crimson transition-colors shrink-0"></span>
                                  <span className="truncate">{service.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <button
            onClick={handleContactClick}
            className="bg-crimson hover:bg-red-700 text-white px-6 py-2.5 rounded hover:rounded-lg font-bold transition-all duration-300 shadow-[0_0_15px_rgba(217,4,41,0.3)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] uppercase text-xs tracking-wider"
          >
            Contact Us
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-midnight border-l border-slate-800 md:hidden flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-heading font-bold text-slate-200">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
                <X className="w-6 h-6 text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-6 pb-20">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => (item.type === 'dropdown' || item.type === 'mega') ? handleMobileNavClick(item.name) : handleLinkClick({ preventDefault: () => { } } as any, item.href)}
                  >
                    <a
                      href={item.href}
                      className="text-2xl font-heading font-bold text-slate-300 flex items-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.type !== 'link' && item.type !== 'page') {
                          handleMobileNavClick(item.name);
                        } else {
                          handleLinkClick(e as any, item.href);
                        }
                      }}
                    >
                      {item.name}
                    </a>
                    {(item.type === 'dropdown' || item.type === 'mega') ? (
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    ) : (
                      <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-crimson" />
                    )}
                  </div>

                  {/* Mobile Dropdown Items */}
                  <AnimatePresence>
                    {item.type === 'dropdown' && activeDropdown === item.name && item.dropdownItems && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 mt-2 border-l-2 border-slate-800"
                      >
                        {item.dropdownItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            onClick={(e) => handleLinkClick(e, subItem.href)}
                            className="block py-2 text-lg text-slate-400 hover:text-white"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </motion.div>
                    )}

                    {/* Mobile Mega Menu Items */}
                    {item.type === 'mega' && activeDropdown === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 mt-4 border-l-2 border-slate-800 space-y-6"
                      >
                        {FALLBACK_PILLARS.map((pillar, idx) => (
                          <div key={idx}>
                            <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${idx === 0 ? 'text-crimson' : idx === 1 ? 'text-amber' : 'text-rose-500'
                              }`}>
                              {pillar.title}
                            </h4>
                            <ul className="space-y-2">
                              {pillar.details && pillar.details.map((service, sIdx) => (
                                <li key={sIdx}>
                                  <a
                                    href="#services"
                                    onClick={(e) => handleServiceClick(e, pillar.title, service.name)}
                                    className="block py-1 text-base text-slate-400 hover:text-white"
                                  >
                                    {service.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <button
                onClick={handleContactClick}
                className="mt-4 bg-crimson text-white text-center py-4 rounded font-bold text-xl shadow-lg shadow-crimson/20"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for Desktop Menu to handle click-outside visual indication (optional, but handling via document listener) */}
      {activeDesktopMenu && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] md:block hidden" onClick={() => setActiveDesktopMenu(null)} />
      )}

    </header >
  );
};

export default Navbar;
