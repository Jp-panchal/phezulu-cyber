import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Button from './ui/Button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { fetchSystemStatus, type SystemStatus } from '../lib/api';

const Hero: React.FC = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const contentMoveX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const contentMoveY = useTransform(mouseY, [-500, 500], [-20, 20]);

  useEffect(() => {
    const getStatus = async () => {
      const data = await fetchSystemStatus();
      setStatus(data);
    };
    getStatus();
    // Poll every 30 seconds
    const interval = setInterval(getStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative h-full">
        
        {/* Left: Typography */}
        <motion.div 
          style={{ x: contentMoveX, y: contentMoveY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-20 relative w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-6 transition-colors hover:bg-crimson/20 cursor-default">
             <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status?.color === 'green' ? 'bg-green-500' : 'bg-crimson'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status?.color === 'green' ? 'bg-green-500' : 'bg-crimson'}`}></span>
            </span>
            <span className="text-xs font-mono text-crimsonLight tracking-wider uppercase">
              {status ? `System Status: ${status.label}` : "Initializing..."}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-200 leading-tight mb-6">
            Resilient Cybersecurity for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson to-crimsonLight">Complex World</span>.
          </h1>
          
          <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
            Phezulu Cyber combines advanced threat intelligence with strategic consultancy to protect your enterprise assets. We don't just patch vulnerabilities; we architect resilience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" icon={<ArrowRight size={18} />} aria-label="Explore Solutions">
              Explore Solutions
            </Button>
            <Button variant="outline" icon={<MessageSquare size={18} />} aria-label="Talk to an Architect">
              Talk to an Architect
            </Button>
          </div>
        </motion.div>

        {/* Right: Spline 3D Scene */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5 }}
           className="absolute top-0 bottom-0 right-0 w-4/5 z-0 flex items-center justify-end pointer-events-none lg:relative lg:inset-auto lg:h-[500px] lg:w-full lg:order-last lg:justify-center"
        >
          <div className="w-full h-full flex items-center justify-center relative">
             {/* Animation Wrapper */}
             <div className="w-full h-full opacity-10 lg:opacity-60 transition-opacity duration-500">
                {React.createElement('spline-viewer', {
                    url: "https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode",
                    background: "transparent",
                    style: { 
                      width: '100%', 
                      height: '100%',
                      filter: 'hue-rotate(45deg) saturate(1.4) contrast(1.1)' 
                    }
                })}
             </div>
             
             {/* Left fade gradient for mobile */}
             <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-midnight via-midnight/90 to-transparent pointer-events-none lg:hidden" />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Hero;