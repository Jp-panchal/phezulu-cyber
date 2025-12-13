import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
  // Explicitly adding standard HTML attributes to ensure TypeScript recognizes them
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  icon,
  className = '',
  ...props 
}) => {
  // Changed rounded-lg to rounded-sm/md for a more "tech" geometric feel
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-bold transition-all duration-300 font-heading tracking-wide text-sm relative overflow-hidden group";
  
  const variants = {
    // Sharp red shadow instead of diffuse pink
    primary: "bg-crimson text-white shadow-[0_0_20px_-5px_rgba(217,4,41,0.5)] hover:shadow-[0_0_25px_-5px_rgba(217,4,41,0.7)] hover:bg-red-600 border border-transparent",
    // Changed secondary from Amber to a Dark Metallic style (Slate)
    secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 shadow-lg hover:shadow-slate-700/50",
    outline: "bg-transparent border border-slate-700 text-slate-300 hover:border-crimson hover:text-white hover:bg-crimson/5 backdrop-blur-sm shadow-sm",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && <span className="ml-1 transition-transform group-hover:translate-x-1">{icon}</span>}
      </span>
      
      {/* Updated shine effect for primary */}
      {(variant === 'primary') && (
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      )}
    </motion.button>
  );
};

export default Button;