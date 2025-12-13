
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* The Void - Base Color is handled in body, this adds the "Mesh" */}
      
      {/* Top Left - Crimson Glow (Stronger Red but lower opacity) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-crimson/5 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
      
      {/* Bottom Right - Slate/Blue-ish glow instead of Amber */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-slate-700/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
      
      {/* Center/Random - Subtle white/red accent */}
      <div className="absolute top-[40%] left-[60%] w-[20rem] h-[20rem] bg-crimsonLight/5 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000" />
      
      {/* Grid Overlay for "Tech" feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15" />
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:50px_50px]" />
    </div>
  );
};

export default Background;