
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, ShieldCheck, Zap, Server, Lock, Globe, Database, ArrowRight, CheckCircle, Activity } from 'lucide-react';

const WhyPhezuluPage: React.FC = () => {
  
  const milestones = [
    { year: '2018', title: 'Founding Vision', desc: 'Established in Cape Town with a focus on ethical hacking.' },
    { year: '2020', title: 'AI Integration', desc: 'Launched proprietary threat detection algorithms.' },
    { year: '2022', title: 'Global Expansion', desc: 'Opened London and Dubai operations centers.' },
    { year: '2024', title: 'Cognitive Comfort', desc: 'Pioneered the human-centric security philosophy.' }
  ];

  return (
    <div className="pt-24 pb-20 bg-midnight min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-6">
               <span className="text-xs font-mono text-crimsonLight tracking-wider uppercase">
                 Our DNA
               </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
               The Architecture of <span className="text-crimson">Trust</span>.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
               Phezulu Cyber isn't just a consultancy; it's a response to a broken security paradigm. 
               We combine military-grade discipline with next-generation artificial intelligence to 
               architect resilience for the world's most critical enterprises.
            </p>
          </motion.div>
        </div>

        {/* Company Photos Grid */}
        <section className="mb-32">
           <div className="flex items-center gap-2 mb-8">
              <span className="h-px w-12 bg-crimson"></span>
              <h3 className="text-xl font-heading font-bold text-white">Inside The Fortress</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              {/* Main Large Photo */}
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="md:col-span-8 md:row-span-2 rounded-2xl overflow-hidden border border-slate-800 relative group"
              >
                 <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" 
                    alt="Operations Center" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />
                 <div className="absolute bottom-6 left-6">
                    <p className="text-crimson font-mono text-xs uppercase tracking-wider mb-1">HQ - Cape Town</p>
                    <h4 className="text-2xl font-bold text-white">Global Operations Command</h4>
                 </div>
              </motion.div>

              {/* Smaller Photos */}
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-800 relative group h-64 md:h-auto"
              >
                 <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" 
                    alt="Team Meeting" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-800 relative group h-64 md:h-auto"
              >
                 <img 
                    src="https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800" 
                    alt="Server Infrastructure" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
              </motion.div>
           </div>
        </section>

        {/* Workflow Diagrams Section */}
        <section className="mb-32">
           <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Operational Workflows</h2>
              <p className="text-slate-400 text-center max-w-2xl">
                 Our methodology is rigorously structured. We employ a cyclical defense strategy that turns every incident into stronger immunity.
              </p>
           </div>

           <div className="space-y-20">
              
              {/* Diagram 1: Threat Neutralization Pipeline */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 bg-slate-800 border-b border-l border-slate-700 rounded-bl-xl text-xs font-mono text-crimsonLight uppercase tracking-widest">
                    Fig 1.0 - Threat Neutralization Pipeline
                 </div>
                 
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {/* Step 1 */}
                    <div className="relative group">
                       <div className="h-full bg-midnight border border-slate-700 p-6 rounded-xl hover:border-crimson/50 transition-colors">
                          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                             <Globe size={24} />
                          </div>
                          <h4 className="text-white font-bold mb-2">1. Ingest</h4>
                          <p className="text-sm text-slate-400">Continuous telemetry collection from Network, Endpoint, and Cloud sources.</p>
                       </div>
                       {/* Arrow for Desktop */}
                       <div className="hidden md:block absolute top-1/2 -right-6 text-slate-600">
                          <ArrowRight size={24} />
                       </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative group">
                       <div className="h-full bg-midnight border border-slate-700 p-6 rounded-xl hover:border-crimson/50 transition-colors">
                          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-amber mb-4 group-hover:scale-110 transition-transform">
                             <Brain size={24} />
                          </div>
                          <h4 className="text-white font-bold mb-2">2. Filter (AI)</h4>
                          <p className="text-sm text-slate-400">Heuristic algorithms filter 99.8% of noise and false positives automatically.</p>
                       </div>
                       <div className="hidden md:block absolute top-1/2 -right-6 text-slate-600">
                          <ArrowRight size={24} />
                       </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative group">
                       <div className="h-full bg-midnight border border-slate-700 p-6 rounded-xl hover:border-crimson/50 transition-colors shadow-[0_0_20px_rgba(217,4,41,0.1)] border-t-2 border-t-crimson">
                          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-crimson mb-4 group-hover:scale-110 transition-transform">
                             <Target size={24} />
                          </div>
                          <h4 className="text-white font-bold mb-2">3. Analyze</h4>
                          <p className="text-sm text-slate-400">Elite human analysts validate high-fidelity alerts and determine root cause.</p>
                       </div>
                       <div className="hidden md:block absolute top-1/2 -right-6 text-slate-600">
                          <ArrowRight size={24} />
                       </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative group">
                       <div className="h-full bg-midnight border border-slate-700 p-6 rounded-xl hover:border-crimson/50 transition-colors">
                          <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
                             <ShieldCheck size={24} />
                          </div>
                          <h4 className="text-white font-bold mb-2">4. Immunize</h4>
                          <p className="text-sm text-slate-400">Rapid containment and automated policy updates to prevent recurrence.</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Diagram 2: Defense in Depth (Layered) */}
               <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col items-center">
                 <div className="absolute top-0 left-0 p-4 bg-slate-800 border-b border-r border-slate-700 rounded-br-xl text-xs font-mono text-crimsonLight uppercase tracking-widest">
                    Fig 2.0 - The Phezulu Shield
                 </div>
                 
                 <div className="mt-12 w-full max-w-3xl space-y-4 relative">
                    {/* Layer 1 */}
                    <div className="bg-midnight border border-blue-900/50 p-6 rounded-xl relative z-10 mx-auto w-full max-w-sm text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-blue-500/5 rounded-xl animate-pulse"></div>
                        <Lock className="mx-auto text-blue-400 mb-2" size={24} />
                        <h4 className="text-white font-bold">Data Core</h4>
                        <p className="text-xs text-blue-300">Encryption & Access Control</p>
                    </div>

                    {/* Connector */}
                    <div className="h-8 w-px bg-slate-700 mx-auto"></div>

                    {/* Layer 2 */}
                    <div className="bg-midnight border border-purple-900/50 p-6 rounded-xl relative z-20 mx-auto w-full max-w-md text-center transform hover:scale-105 transition-transform duration-300">
                        <Server className="mx-auto text-purple-400 mb-2" size={24} />
                        <h4 className="text-white font-bold">Application Layer</h4>
                        <p className="text-xs text-purple-300">WAF & Runtime Protection</p>
                    </div>

                    {/* Connector */}
                    <div className="h-8 w-px bg-slate-700 mx-auto"></div>

                    {/* Layer 3 */}
                    <div className="bg-midnight border border-amber-900/50 p-6 rounded-xl relative z-30 mx-auto w-full max-w-lg text-center transform hover:scale-105 transition-transform duration-300">
                        <Activity className="mx-auto text-amber mb-2" size={24} />
                        <h4 className="text-white font-bold">Endpoint Security</h4>
                        <p className="text-xs text-amber-300/80">EDR & Behavior Analysis</p>
                    </div>
                    
                    {/* Connector */}
                    <div className="h-8 w-px bg-slate-700 mx-auto"></div>

                    {/* Layer 4 */}
                    <div className="bg-midnight border border-crimson/50 p-6 rounded-xl relative z-40 mx-auto w-full max-w-xl text-center shadow-[0_0_30px_rgba(217,4,41,0.15)] transform hover:scale-105 transition-transform duration-300">
                        <ShieldCheck className="mx-auto text-crimson mb-2" size={32} />
                        <h4 className="text-white font-bold text-lg">Perimeter Defense</h4>
                        <p className="text-xs text-crimsonLight">Next-Gen Firewall & IDPS</p>
                    </div>
                 </div>
              </div>

           </div>
        </section>

        {/* Company Data Timeline (Reused from original section but expanded) */}
        <section className="mb-20">
            <div className="flex items-center gap-2 mb-12">
              <span className="h-px w-12 bg-crimson"></span>
              <h3 className="text-xl font-heading font-bold text-white">Our Evolution</h3>
           </div>
           
           <div className="relative border-l border-slate-800 ml-6 md:ml-0 md:border-l-0 md:border-t md:pt-16 grid grid-cols-1 md:grid-cols-4 gap-10">
              {milestones.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="pl-8 md:pl-0 md:text-center relative group"
                >
                   {/* Dot */}
                   <div className="absolute left-[-5px] top-0 md:left-1/2 md:top-[-69px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-crimson z-10 ring-4 ring-midnight group-hover:scale-150 transition-transform" />
                   
                   <div className="text-crimson font-mono font-bold text-xl mb-2">{item.year}</div>
                   <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                   <p className="text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </section>

      </div>
    </div>
  );
};

export default WhyPhezuluPage;
