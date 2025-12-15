import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import Button from './ui/Button';
import { useContact } from '../lib/ContactContext';

const Footer: React.FC = () => {
  const { openContact } = useContact();
  return (
    <footer id="footer" className="relative pt-20 bg-midnight border-t border-slate-800">
      
      {/* Pre-footer CTA */}
      <div className="container mx-auto px-6 mb-20">
        <div className="rounded-3xl bg-gradient-to-r from-crimson to-rose-700 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-crimson/20">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Ready to Secure Your Future?
            </h2>
            <p className="text-rose-100 text-lg">
              Let's audit your infrastructure and architect a defense strategy that scales with you.
            </p>
          </div>
          <div className="shrink-0">
             <Button 
                onClick={openContact}
                className="bg-white text-rose-900 hover:bg-rose-50 hover:text-rose-950 shadow-none"
             > Start Your Audit
             </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {/* Footer Logo SVG */}
              <div className="w-8 h-8">
                 <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="50" cy="50" r="42" stroke="#475569" strokeWidth="8" />
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M38 28H58C68 28 74 34 74 42C74 50 68 56 58 56H48V72H38V28ZM48 36V48H58C62 48 64 46 64 42C64 38 62 36 58 36H48Z" 
                      fill="#D90429"
                    />
                 </svg>
              </div>
              <div className="flex items-center tracking-tighter leading-none -ml-1">
                <span className="text-xl font-heading font-extrabold text-white">
                  PHEZUL
                </span>
                <span className="text-xl font-heading font-extrabold text-crimson">
                  U
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Architecting resilience for the modern enterprise. We secure the assets that define your future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-heading">Services</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-crimson transition-colors">Managed Detection (MDR)</a></li>
              <li><a href="#" className="hover:text-crimson transition-colors">Penetration Testing</a></li>
              <li><a href="#" className="hover:text-crimson transition-colors">Cloud Security</a></li>
              <li><a href="#" className="hover:text-crimson transition-colors">CISO Advisory</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-heading">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#" className="hover:text-crimson transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-crimson transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-crimson transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-crimson transition-colors">Legal & Privacy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 font-heading">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>security@phezulu.cyber</li>
              <li>+1 (800) 555-0123</li>
              <li className="pt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                System Operational
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © 2024 Phezulu Cyber. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50">
             <span className="text-[10px] uppercase font-mono text-slate-500">Part of the Phezulu Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;