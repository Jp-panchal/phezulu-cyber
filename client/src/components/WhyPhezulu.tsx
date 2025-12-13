
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, ShieldCheck, Zap } from 'lucide-react';

const WhyPhezulu: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Cognitive Comfort",
      description: "We filter the noise. You receive curated intelligence, not just raw data alerts."
    },
    {
      icon: Target,
      title: "Precision Engineering",
      description: "Solutions architected specifically for your infrastructure, not generic patches."
    },
    {
      icon: ShieldCheck,
      title: "Proactive Resilience",
      description: "We hunt threats before they hunt you, ensuring business continuity."
    }
  ];

  const milestones = [
    { year: '2018', title: 'Founding Vision', desc: 'Established in Cape Town with a focus on ethical hacking.' },
    { year: '2020', title: 'AI Integration', desc: 'Launched proprietary threat detection algorithms.' },
    { year: '2022', title: 'Global Expansion', desc: 'Opened London and Dubai operations centers.' },
    { year: '2024', title: 'Cognitive Comfort', desc: 'Pioneered the human-centric security philosophy.' }
  ];

  return (
    <section id="why-phezulu" className="py-24 bg-midnight relative overflow-hidden border-t border-slate-800/50">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-crimson/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 mb-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 relative z-20 py-8 px-4 lg:p-0"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-12 h-px bg-amber"></span>
              <span className="text-amber font-mono text-sm tracking-widest uppercase">The Phezulu Difference</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Cybersecurity Designed for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Peace of Mind.
              </span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              In a landscape defined by chaos and alarm fatigue, Phezulu introduces 
              <span className="text-white font-semibold"> Cognitive Comfort</span>. 
              We don't just secure your data; we secure your focus, allowing you to lead without the constant distraction of threat monitoring.
            </p>

            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-crimson shadow-lg shadow-crimson/5">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual Animation */}
          {/* Mobile: Absolute background covering text, even lower opacity (10), expanded margins (-inset-4) for spacing */}
          {/* Desktop: Relative grid column, full opacity, reduced height and width */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -inset-4 md:-inset-6 z-0 opacity-10 flex items-center justify-center pointer-events-none lg:pointer-events-auto lg:relative lg:inset-auto lg:opacity-100 lg:h-[450px] lg:w-[90%] lg:mx-auto lg:order-2"
          >
            {/* Abstract Construction */}
            <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-1 shadow-2xl overflow-hidden group">
               {/* Grid line effect */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
               
               {/* Center Glowing Orb representing 'Core' */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <div className="relative">
                    <div className="absolute inset-0 bg-crimson blur-[80px] opacity-20 animate-pulse" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-48 h-48 border border-crimson/30 rounded-full border-dashed" 
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 border border-amber/20 rounded-full" 
                    />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldCheck className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                     </div>
                 </div>
               </div>

               {/* Floating cards representing 'Order' */}
               <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden lg:block absolute top-20 right-10 p-4 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 max-w-[200px] shadow-xl"
               >
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
                   <span className="text-xs font-mono text-slate-300">SYSTEM OPTIMAL</span>
                 </div>
                 <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                   <div className="h-full w-[90%] bg-green-500" />
                 </div>
               </motion.div>

               <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="hidden lg:block absolute bottom-20 left-10 p-4 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 max-w-[220px] shadow-xl"
               >
                 <div className="flex items-center gap-3 mb-2">
                   <Zap className="w-4 h-4 text-amber" />
                   <span className="text-xs font-mono text-slate-300">THREAT MITIGATED</span>
                 </div>
                 <div className="text-[10px] text-slate-500">Auto-response triggered. 0s latency.</div>
               </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="container mx-auto px-6">
        <div className="relative border-t border-slate-800 pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-midnight px-4 text-slate-500 font-mono text-sm uppercase tracking-widest">
            Our Evolution
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4 before:absolute before:left-2 md:before:left-0 md:before:top-1/2 md:before:w-full md:before:h-px before:h-full before:w-px before:bg-gradient-to-b md:before:bg-gradient-to-r before:from-transparent before:via-slate-700 before:to-transparent">
            {milestones.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative pl-10 md:pl-0 md:pt-10 md:text-center w-full md:w-1/4 group"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 md:left-1/2 md:-top-1.5 md:-translate-x-1/2 w-4 h-4 rounded-full bg-midnight border-2 border-slate-600 group-hover:border-crimson group-hover:scale-125 transition-all z-10">
                   <div className="w-full h-full rounded-full bg-crimson opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="text-crimson font-bold font-mono mb-2">{item.year}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPhezulu;
