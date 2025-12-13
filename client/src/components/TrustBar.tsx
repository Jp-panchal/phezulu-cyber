
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logoUrl?: string;
}

const TrustBar: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/partners');
        const data = await res.json();
        // If empty, fallback to default text list
        if (data && data.length > 0) {
            setPartners(data);
        } else {
            // Fallback list
            setPartners([
               { name: "Microsoft Security" }, { name: "Cisco Secure" }, { name: "CrowdStrike" }, { name: "AWS" },
               { name: "SentinelOne" }, { name: "Google Cloud" }, { name: "Splunk" }, { name: "Okta" }
            ]);
        }
      } catch (err) {
         // Fallback list
         setPartners([
            { name: "Microsoft Security" }, { name: "Cisco Secure" }, { name: "CrowdStrike" }, { name: "AWS" },
            { name: "SentinelOne" }, { name: "Google Cloud" }, { name: "Splunk" }, { name: "Okta" }
         ]);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section id="trust" className="w-full border-y border-slate-800/50 bg-black/20 backdrop-blur-sm py-12 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-center text-sm font-mono text-crimsonLight uppercase tracking-widest font-bold">
          Our Partners
        </p>
      </div>

      <div className="flex flex-col gap-12 relative">
        {/* Row 1 - Moves Left */}
        <div className="flex overflow-hidden relative w-full">
           <motion.div 
             className="flex gap-16 md:gap-24 items-center whitespace-nowrap min-w-full pl-6"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 40, ease: "linear", repeat: Infinity }}
           >
             {[...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
               <div key={`r1-${idx}`} className="group relative shrink-0 flex items-center gap-4">
                  {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.name} className="h-8 md:h-10 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                  ) : (
                    <h3 className="text-xl md:text-3xl font-heading font-bold text-slate-500/60 group-hover:text-white transition-colors cursor-default">
                        {partner.name}
                    </h3>
                  )}
               </div>
             ))}
           </motion.div>
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex overflow-hidden relative w-full">
           <motion.div 
             className="flex gap-16 md:gap-24 items-center whitespace-nowrap min-w-full pl-6"
             animate={{ x: ["-50%", "0%"] }}
             transition={{ duration: 45, ease: "linear", repeat: Infinity }}
           >
             {[...partners, ...partners, ...partners, ...partners].map((partner, idx) => (
               <div key={`r2-${idx}`} className="group relative shrink-0 flex items-center gap-4">
                  {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.name} className="h-8 md:h-10 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                  ) : (
                    <h3 className="text-xl md:text-3xl font-heading font-bold text-slate-500/60 group-hover:text-white transition-colors cursor-default">
                        {partner.name}
                    </h3>
                  )}
               </div>
             ))}
           </motion.div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[rgb(var(--c-midnight))] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[rgb(var(--c-midnight))] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default TrustBar;
