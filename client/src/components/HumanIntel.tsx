
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { X, Linkedin, Mail } from 'lucide-react';

interface Expert {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  stats: { label: string; value: string }[];
}

const HumanIntel: React.FC = () => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  useEffect(() => {
    const fetchExperts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/admin/employees');
            const data = await res.json();
            // If API returns empty, use fallback or handle gracefullly
            if(data.length > 0) setExperts(data);
        } catch (err) {
            console.error(err);
        }
    }
    fetchExperts();
  }, []);

  if (experts.length === 0) return null; // Don't render section if no data

  return (
    <section id="human-intel" className="py-24 bg-slate-850/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Interactive Team Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[600px] w-full"
          >
             <div className="grid grid-cols-2 gap-4 h-full">
               <div className="space-y-4 pt-12">
                 {experts[0] && (
                    <div 
                        onClick={() => setSelectedExpert(experts[0])}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl h-64 border border-slate-800"
                    >
                    <img src={experts[0].image} alt={experts[0].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-white font-bold">{experts[0].name}</p>
                        <p className="text-xs text-crimsonLight">{experts[0].role}</p>
                    </div>
                    </div>
                 )}
                 {experts[2] && (
                    <div 
                        onClick={() => setSelectedExpert(experts[2])}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl h-56 border border-slate-800"
                    >
                    <img src={experts[2].image} alt={experts[2].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-white font-bold">{experts[2].name}</p>
                        <p className="text-xs text-crimsonLight">{experts[2].role}</p>
                    </div>
                    </div>
                 )}
               </div>
               
               <div className="space-y-4">
                  {experts[1] && (
                    <div 
                        onClick={() => setSelectedExpert(experts[1])}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl h-80 border border-slate-800"
                    >
                    <img src={experts[1].image} alt={experts[1].name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-white font-bold">{experts[1].name}</p>
                        <p className="text-xs text-crimsonLight">{experts[1].role}</p>
                    </div>
                    </div>
                  )}
                 
                 {/* Stat Card */}
                 <div className="bg-crimson/10 border border-crimson/20 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
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

            <Button variant="secondary" onClick={() => setSelectedExpert(experts[0])}>
              Meet the Team
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Expert Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedExpert(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-midnight border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedExpert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-2 bg-black/20 rounded-full"
              >
                <X size={24} />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto relative">
                   <img src={selectedExpert.image} alt={selectedExpert.name} className="absolute inset-0 w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent md:bg-gradient-to-r" />
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white">{selectedExpert.name}</h3>
                    <p className="text-crimson font-mono text-sm">{selectedExpert.role}</p>
                  </div>
                  
                  <p className="text-slate-300 leading-relaxed mb-8">
                    {selectedExpert.bio}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {selectedExpert.stats && selectedExpert.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <div className="text-white font-bold">{stat.value}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="px-4 py-2 text-xs">
                      <Linkedin size={16} /> Connect
                    </Button>
                    <Button variant="ghost" className="px-4 py-2 text-xs">
                      <Mail size={16} /> Email
                    </Button>
                  </div>
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
