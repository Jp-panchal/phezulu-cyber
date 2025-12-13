import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, MapPin } from 'lucide-react';
import Button from './ui/Button';
import { submitContact, type ContactData } from '../lib/api';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left: Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-crimsonLight tracking-wider uppercase">
                Secure Channel Ready
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Initiate <span className="text-crimson">Handshake</span>.
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Security incidents don't wait for business hours. Neither do we. 
              Contact our command center to discuss your infrastructure resilience or schedule a red team assessment.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-midnight border border-slate-800 rounded-xl">
                <div className="p-3 bg-slate-800 rounded-lg text-crimson">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Encrypted Comms</h4>
                  <p className="text-slate-400 text-sm mb-1">PGP Key Available on Request</p>
                  <p className="text-crimsonLight font-mono">secure@phezulu.cyber</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-midnight border border-slate-800 rounded-xl">
                <div className="p-3 bg-slate-800 rounded-lg text-amber">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Global HQ</h4>
                  <p className="text-slate-400 text-sm">
                    101 Cyber City Blvd, Tech District<br/>
                    Cape Town, South Africa
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-transparent rounded-2xl -z-10 transform translate-x-4 translate-y-4" />
            
            <form onSubmit={handleSubmit} className="bg-midnight border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Identity</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600"
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
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Contact Point</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="work@email.com"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-xs font-mono text-slate-500 uppercase tracking-widest">Briefing</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your security requirements..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-crimson transition-colors placeholder:text-slate-600 resize-none"
                />
              </div>

              <div className="relative">
                <AnimatePresence mode='wait'>
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 font-medium"
                    >
                      <CheckCircle size={20} />
                      <span>Transmission Secured. We'll be in touch.</span>
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div 
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 font-medium"
                    >
                      <AlertCircle size={20} />
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
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;