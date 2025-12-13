
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext';
import { useServiceContext } from '../lib/ServiceContext';
import { FALLBACK_PILLARS } from '../lib/api';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const { theme, toggleTheme } = useTheme();
  const { openServiceModal } = useServiceContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-20% 0px -50% 0px' // Trigger when section is near middle of viewport
    });

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  interface NavItemConfig {
    name: string;
    href: string;
    type: 'link' | 'dropdown' | 'mega';
    dropdownItems?: { name: string; href: string }[];
  }

  const navItems: NavItemConfig[] = [
    { name: 'Why Phezulu', href: '#why-phezulu', type: 'link' },
    { 
      name: 'Services', 
      href: '#services', 
      type: 'mega' 
    },
    { name: 'Partners', href: '#trust', type: 'link' }, 
    { 
      name: 'Insights', 
      href: '#insights', 
      type: 'dropdown',
      dropdownItems: [
        { name: 'Blog', href: '#insights' },
        { name: 'Webinars', href: '#insights' },
        { name: 'Reports', href: '#insights' },
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
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  const handleServiceClick = (e: React.MouseEvent, pillarTitle: string, serviceName?: string) => {
    e.preventDefault();
    // 1. Scroll to services section
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 2. Open the modal via context
    openServiceModal(pillarTitle, serviceName);
    
    // 3. Close menus
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-midnight/90 backdrop-blur-md border-b border-slate-800 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Custom SVG Logo based on Image */}
          <div className="relative w-11 h-11">
             <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                <defs>
                   <linearGradient id="ringGradient" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="50%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#94a3b8" />
                   </linearGradient>
                </defs>
                
                {/* Outer Ring */}
                <circle cx="50" cy="50" r="42" stroke="url(#ringGradient)" strokeWidth="8" className="group-hover:opacity-90 transition-opacity" />
                
                {/* The Red P */}
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M38 28H58C68 28 74 34 74 42C74 50 68 56 58 56H48V72H38V28ZM48 36V48H58C62 48 64 46 64 42C64 38 62 36 58 36H48Z" 
                  fill="#D90429"
                  className="group-hover:fill-red-500 transition-colors"
                />
             </svg>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center tracking-tighter leading-none -ml-1">
              <span className="text-2xl font-heading font-extrabold text-slate-200">
                PHEZUL
              </span>
              <span className="text-2xl font-heading font-extrabold text-crimson">
                U
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <a 
                href={item.href}
                onClick={(e) => item.type === 'link' && handleLinkClick(e, item.href)}
                className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors py-2 relative ${
                   activeSection === item.href.substring(1) 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.name}
                {(item.type === 'dropdown' || item.type === 'mega') && (
                  <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
                )}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-crimson transition-all duration-300 ${
                  activeSection === item.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>

              {/* Desktop Dropdown Menu (Standard) */}
              {item.type === 'dropdown' && item.dropdownItems && (
                <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50">
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
              {/* Changed to Fixed positioning to center in viewport and avoid overflow */}
              {item.type === 'mega' && (
                 <div className="fixed left-0 right-0 top-[60px] pt-8 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                   <div className="w-[95vw] max-w-6xl bg-midnight/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl p-8 grid grid-cols-3 gap-8 max-h-[85vh] overflow-y-auto">
                      {FALLBACK_PILLARS.map((pillar, idx) => (
                         <div key={idx} className="space-y-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                               <h3 className={`font-heading font-bold text-lg ${
                                  idx === 0 ? 'text-crimson' : idx === 1 ? 'text-amber' : 'text-rose-500'
                               }`}>
                                  {pillar.title}
                               </h3>
                            </div>
                            <ul className="space-y-2">
                               {pillar.details && pillar.details.map((service, sIdx) => (
                                  <li key={sIdx}>
                                     <a 
                                       href="#services"
                                       onClick={(e) => handleServiceClick(e, pillar.title, service.name)}
                                       className="text-sm text-slate-400 hover:text-white block transition-colors hover:translate-x-1 duration-200 leading-tight py-1"
                                       title={service.name}
                                     >
                                        {service.name}
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
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all focus:outline-none focus:ring-2 focus:ring-crimson"
            aria-label="Toggle Dark Mode"
          >
             <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>
          
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="bg-crimson hover:bg-red-700 text-white px-6 py-2.5 rounded hover:rounded-lg font-bold transition-all duration-300 shadow-[0_0_15px_rgba(217,4,41,0.3)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] uppercase text-xs tracking-wider"
          >
            Contact Us
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-400 hover:text-white focus:outline-none"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
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
                    onClick={() => (item.type === 'dropdown' || item.type === 'mega') ? handleMobileNavClick(item.name) : setMobileMenuOpen(false)}
                  >
                    <a 
                      href={item.href}
                      className="text-2xl font-heading font-bold text-slate-300 flex items-center gap-2"
                      onClick={(e) => {
                        if (item.type !== 'link') {
                          e.preventDefault();
                          handleMobileNavClick(item.name);
                        } else {
                          handleLinkClick(e, item.href);
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
                               <h4 className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                                  idx === 0 ? 'text-crimson' : idx === 1 ? 'text-amber' : 'text-rose-500'
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
              <a 
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="mt-4 bg-crimson text-white text-center py-4 rounded font-bold text-xl shadow-lg shadow-crimson/20"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
