
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin } from 'lucide-react';
import Button from './ui/Button';
import { submitContact, type ContactData } from '../lib/api';
import { useContact } from '../lib/ContactContext';

const ContactModal: React.FC = () => {
  const { isContactOpen, closeContact } = useContact();
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isContactOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const success = await submitContact(formData);
      if (success) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
    
    // Reset status after a delay if successful so user can submit again if needed
    if (status === 'success') {
      setTimeout(() => {
        setStatus('idle');
        closeContact();
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      {isContactOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-midnight/95 backdrop-blur-md"
          onClick={closeContact}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-midnight border border-slate-800 rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
                onClick={closeContact}
                className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
             >
                <X size={24} />
             </button>

            {/* Left Side: Information */}
            <div className="w-full md:w-2/5 p-8 md:p-12 bg-slate-900/50 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between overflow-y-auto">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-crimsonLight tracking-wider uppercase">
                      Secure Channel Ready
                    </span>
                  </div>

                  <h2 className="text-3xl font-heading font-bold text-white mb-4">
                    Initiate <span className="text-crimson">Handshake</span>.
                  </h2>
                  
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                    Security incidents don't wait for business hours. Neither do we. 
                    Contact our command center to discuss your infrastructure resilience.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-midnight border border-slate-800 rounded-xl">
                      <div className="p-2 bg-slate-800 rounded-lg text-crimson shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">Encrypted Comms</h4>
                        <p className="text-slate-400 text-xs mb-1">PGP Key Available on Request</p>
                        <p className="text-crimsonLight font-mono text-xs">secure@phezulu.cyber</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-midnight border border-slate-800 rounded-xl">
                      <div className="p-2 bg-slate-800 rounded-lg text-amber shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">Global HQ</h4>
                        <p className="text-slate-400 text-xs">
                          101 Cyber City Blvd, Tech District<br/>
                          Cape Town, South Africa
                        </p>
                      </div>
                    </div>
                  </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-slate-800 hidden md:block">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    System ID: PHZ-SEC-NODE-01
                  </p>
               </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-midnight relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Identity</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Full Name"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600 text-sm"
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Organization</label>
                        <input 
                            type="text" 
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600 text-sm"
                        />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Contact Point</label>
                        <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="work@email.com"
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600 text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Briefing</label>
                        <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe your security requirements..."
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600 resize-none text-sm"
                        />
                    </div>

                    <div className="pt-2">
                        <AnimatePresence mode='wait'>
                        {status === 'success' ? (
                            <motion.div 
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 font-medium text-sm"
                            >
                            <CheckCircle size={18} />
                            <span>Transmission Secured. Closing uplink...</span>
                            </motion.div>
                        ) : status === 'error' ? (
                            <motion.div 
                            key="error"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 font-medium text-sm"
                            >
                            <AlertCircle size={18} />
                            <span>Transmission Failed. Please try again.</span>
                            </motion.div>
                        ) : (
                            <motion.div
                            key="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            >
                            <Button 
                                type="submit" 
                                variant="primary" 
                                className="w-full"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={18} />
                                    Encrypting & Sending...
                                </span>
                                ) : (
                                <span className="flex items-center gap-2">
                                    Transmit Inquiry <Send size={18} />
                                </span>
                                )}
                            </Button>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
