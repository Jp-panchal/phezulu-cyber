
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { UserCheck, X, Linkedin, Mail, ChevronLeft, ChevronRight, Users } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  stats: { label: string; value: string }[];
}

const experts: Expert[] = [
  {
    id: '1',
    name: 'Sarah Jenkin',
    role: 'Lead Threat Hunter',
    bio: 'Former intelligence analyst with 15 years experience in state-sponsored threat tracking. Sarah leads our offensive security operations.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    stats: [{ label: 'Operations', value: '500+' }, { label: 'Specialty', value: 'APT Groups' }]
  },
  {
    id: '2',
    name: 'David Okafor',
    role: 'Chief Security Architect',
    bio: 'Specializing in Zero Trust architecture for Fortune 500 financial institutions. David ensures your foundation is unbreakable.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    stats: [{ label: 'Architected', value: '50 Enterprise Grids' }, { label: 'Specialty', value: 'Cloud Sec' }]
  },
  {
    id: '3',
    name: 'Elena Volkov',
    role: 'Forensics Director',
    bio: 'When things go wrong, Elena finds out why. Expert in digital forensics and rapid incident response containment.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    stats: [{ label: 'Recoveries', value: '100% Success' }, { label: 'Specialty', value: 'Ransomware' }]
  },
  {
    id: '4',
    name: 'Marcus Chen',
    role: 'AI Security Lead',
    bio: 'Pioneering the defense against adversarial AI. Marcus builds the neural networks that detect anomalies before they become breaches.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    stats: [{ label: 'Models', value: '12 deployed' }, { label: 'Specialty', value: 'Adversarial AI' }]
  },
  {
    id: '5',
    name: 'Dr. Amara Singh',
    role: 'Cryptographic Analyst',
    bio: 'PhD in Quantum Cryptography. Amara prepares our clients for the post-quantum era, securing data against tomorrow\'s computers.',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80&w=800',
    stats: [{ label: 'Papers', value: '24 Published' }, { label: 'Specialty', value: 'Post-Quantum' }]
  },
  {
    id: '6',
    name: 'James Sterling',
    role: 'CISO Advisor',
    bio: 'Former CISO of two FTSE 100 companies. James bridges the gap between technical reality and board-level strategy.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800',
    stats: [{ label: 'Strategy', value: 'Board Level' }, { label: 'Specialty', value: 'Governance' }]
  }
];

const HumanIntel: React.FC = () => {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [directoryOpen, setDirectoryOpen] = useState(false);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (selectedExpert || directoryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedExpert, directoryOpen]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedExpert) return;
    const currentIndex = experts.findIndex(ex => ex.id === selectedExpert.id);
    const nextIndex = (currentIndex + 1) % experts.length;
    setSelectedExpert(experts[nextIndex]);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedExpert) return;
    const currentIndex = experts.findIndex(ex => ex.id === selectedExpert.id);
    const prevIndex = (currentIndex - 1 + experts.length) % experts.length;
    setSelectedExpert(experts[prevIndex]);
  };

  return (
    <section id="human-intel" className="py-24 bg-slate-850/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Interactive Team Showcase (Preview) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-full"
          >
             <div className="grid grid-cols-2 gap-4 h-full">
               <div className="space-y-4 pt-12">
                 <div 
                    onClick={() => setSelectedExpert(experts[0])}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl h-64 border border-slate-800 shadow-xl"
                 >
                   <img src={experts[0].image} alt={experts[0].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                   <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent opacity-100 transition-opacity" />
                   <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                     <p className="text-white font-bold">{experts[0].name}</p>
                     <p className="text-xs text-crimsonLight">{experts[0].role}</p>
                   </div>
                 </div>
                 <div 
                    onClick={() => setSelectedExpert(experts[2])}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl h-56 border border-slate-800 shadow-xl"
                 >
                   <img src={experts[2].image} alt={experts[2].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                   <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent opacity-100 transition-opacity" />
                   <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                     <p className="text-white font-bold">{experts[2].name}</p>
                     <p className="text-xs text-crimsonLight">{experts[2].role}</p>
                   </div>
                 </div>
               </div>
               
               <div className="space-y-4">
                  <div 
                    onClick={() => setSelectedExpert(experts[1])}
                    className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 border border-slate-800 shadow-xl"
                 >
                   <img src={experts[1].image} alt={experts[1].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                   <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent opacity-100 transition-opacity" />
                   <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                     <p className="text-white font-bold">{experts[1].name}</p>
                     <p className="text-xs text-crimsonLight">{experts[1].role}</p>
                   </div>
                 </div>
                 
                 {/* Stat Card */}
                 <div className="bg-crimson/10 border border-crimson/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg shadow-crimson/5">
                    <div className="text-4xl font-bold text-crimson mb-2">15yr+</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wider">Avg Senior Experience</div>
                 </div>
               </div>
             </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Not Just Algorithms. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber to-orange-500">
                Experts.
              </span>
            </h2>
            
            <p className="text-lg text-slate-300 mb-6">
              Automated tools catch the noise. Our architects catch the nuance. Phezulu Cyber employs elite analysts who understand the psychology behind the code.
            </p>
            
            <p className="text-slate-400 mb-8 leading-relaxed">
              We move beyond simple "alerting" to provide context-aware intelligence. When you call us, you don't get a chatbot—you speak to an engineer who knows your infrastructure map by heart.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">24/7</h4>
                <p className="text-sm font-mono text-slate-500 uppercase">Eyes on Glass</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-1">Top 1%</h4>
                <p className="text-sm font-mono text-slate-500 uppercase">Talent Retention</p>
              </div>
            </div>

            <Button variant="secondary" onClick={() => setDirectoryOpen(true)}>
              Meet the Team
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Directory Modal */}
      <AnimatePresence>
        {directoryOpen && (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[90] bg-midnight/95 backdrop-blur-xl flex flex-col"
          >
             <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-midnight/50">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-crimson/10 rounded-lg border border-crimson/20 text-crimson">
                     <Users size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Global Command Team</h3>
               </div>
               <button 
                  onClick={() => setDirectoryOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
               >
                  <X size={24} />
               </button>
             </div>

             <div className="flex-1 overflow-y-auto p-6 md:p-12">
               <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {experts.map((expert, idx) => (
                   <motion.div
                      key={expert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedExpert(expert)}
                      className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-crimson/50 transition-all duration-300 hover:shadow-2xl hover:shadow-crimson/10"
                   >
                     <div className="h-64 overflow-hidden relative">
                       <img 
                          src={expert.image} 
                          alt={expert.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                        />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                     </div>
                     <div className="p-6 relative">
                       <div className="absolute -top-10 left-6">
                         <div className="bg-midnight border border-slate-700 p-2 rounded-lg shadow-lg">
                            <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                         </div>
                       </div>
                       <h4 className="text-xl font-bold text-white mb-1 group-hover:text-crimson transition-colors">{expert.name}</h4>
                       <p className="text-sm font-mono text-slate-500 uppercase tracking-wider mb-4">{expert.role}</p>
                       <p className="text-slate-400 text-sm line-clamp-2">{expert.bio}</p>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal (Opens on top of directory if active) */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedExpert(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-midnight border border-slate-700 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedExpert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-20 p-2 bg-black/40 rounded-full backdrop-blur-sm"
              >
                <X size={24} />
              </button>

              {/* Navigation Buttons (Absolute centered vertically) */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 text-white hover:bg-crimson transition-colors backdrop-blur-sm group hidden md:flex"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 text-white hover:bg-crimson transition-colors backdrop-blur-sm group hidden md:flex"
              >
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                 <img src={selectedExpert.image} alt={selectedExpert.name} className="absolute inset-0 w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent md:bg-gradient-to-r md:from-midnight/0 md:via-midnight/0 md:to-midnight" />
                 
                 {/* Mobile Nav Overlay */}
                 <div className="absolute bottom-0 inset-x-0 flex justify-between p-4 md:hidden bg-gradient-to-t from-black/80 to-transparent">
                    <button onClick={handlePrev} className="p-2 bg-white/10 rounded-full text-white"><ChevronLeft /></button>
                    <button onClick={handleNext} className="p-2 bg-white/10 rounded-full text-white"><ChevronRight /></button>
                 </div>
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-3/5 p-8 md:p-12 relative">
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">{selectedExpert.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-crimson"></span>
                    <p className="text-crimson font-mono text-sm uppercase tracking-widest">{selectedExpert.role}</p>
                  </div>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-10 text-lg border-l-2 border-slate-700 pl-6">
                  {selectedExpert.bio}
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {selectedExpert.stats.map((stat, idx) => (
                    <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <Button variant="primary" className="px-6 py-2 text-xs">
                    <Mail size={16} /> Contact Agent
                  </Button>
                  <Button variant="outline" className="px-6 py-2 text-xs">
                    <Linkedin size={16} /> LinkedIn
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HumanIntel;
