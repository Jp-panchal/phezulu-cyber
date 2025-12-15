
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Camera, MapPin, Users, Server } from 'lucide-react';
import Button from './ui/Button';

interface GalleryImage {
  id: string;
  src: string;
  category: string;
  title: string;
  size: 'small' | 'medium' | 'large' | 'wide';
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    category: 'HQ',
    title: 'Operations Command Center',
    size: 'wide'
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    category: 'Team',
    title: 'Threat Hunters Briefing',
    size: 'medium'
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=800',
    category: 'Infrastructure',
    title: 'Server Farm Alpha',
    size: 'medium'
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    category: 'Events',
    title: 'Cyber Summit 2024',
    size: 'small'
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=800',
    category: 'HQ',
    title: 'Cape Town Office',
    size: 'small'
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    category: 'Team',
    title: 'Collaboration Space',
    size: 'wide'
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    category: 'Infrastructure',
    title: 'Network Operations',
    size: 'medium'
  }
];

const CompanyGallery: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>('All');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const categories = ['All', 'HQ', 'Team', 'Infrastructure', 'Events'];

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-slate-900/20 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-6">
              <Camera size={14} className="text-crimson" />
              <span className="text-xs font-mono text-crimsonLight tracking-wider uppercase">
                Inside Phezulu
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Our <span className="text-crimson">Fortress</span>.
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Transparency is the first step of trust. Take a look inside our global operations centers, meet the teams behind the shield, and explore the infrastructure that powers our cognitive defense systems.
            </p>

            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-crimson" /> Cape Town
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-crimson" /> London
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-crimson" /> Dubai
               </div>
            </div>
          </motion.div>

          {/* Preview Grid (Clickable) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="grid grid-cols-2 gap-4">
               <div className="h-64 rounded-2xl overflow-hidden border border-slate-800 relative">
                  <img src={galleryImages[0].src} alt={galleryImages[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-midnight/20 group-hover:bg-midnight/0 transition-colors" />
               </div>
               <div className="space-y-4">
                  <div className="h-32 rounded-2xl overflow-hidden border border-slate-800 relative">
                     <img src={galleryImages[1].src} alt={galleryImages[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                   <div className="h-28 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-crimson/10 group-hover:bg-crimson/20 transition-colors" />
                      <div className="z-10 flex flex-col items-center">
                         <span className="text-3xl font-bold text-white mb-1">+20</span>
                         <span className="text-xs uppercase text-crimsonLight font-mono">View Gallery</span>
                      </div>
                   </div>
               </div>
            </div>
            
            {/* Hover Indicator */}
            <div className="absolute -bottom-6 right-0 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
               <Button variant="ghost" className="text-crimson hover:bg-transparent">Click to Expand <Maximize2 size={16} /></Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-midnight/95 backdrop-blur-xl flex flex-col"
          >
             {/* Modal Header */}
             <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-midnight/50">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-crimson/10 rounded-lg border border-crimson/20 text-crimson">
                     <Camera size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Company Gallery</h3>
               </div>
               
               {/* Filters */}
               <div className="hidden md:flex gap-2">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                           filter === cat 
                           ? 'bg-crimson text-white shadow-lg shadow-crimson/20' 
                           : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>

               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
               >
                  <X size={24} />
               </button>
             </div>

             {/* Mobile Filter (Visible only on small screens) */}
             <div className="md:hidden p-4 border-b border-slate-800 overflow-x-auto whitespace-nowrap bg-midnight">
                <div className="flex gap-2">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                           filter === cat 
                           ? 'bg-crimson text-white' 
                           : 'bg-slate-800 text-slate-400'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
                </div>
             </div>

             {/* Gallery Grid */}
             <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                   <AnimatePresence mode='popLayout'>
                      {filteredImages.map((img) => (
                         <motion.div
                           key={img.id}
                           layout
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.3 }}
                           className={`relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-900 ${
                              img.size === 'wide' ? 'md:col-span-2' : ''
                           }`}
                         >
                            <div className="aspect-video md:aspect-auto h-64 md:h-80 w-full overflow-hidden">
                               <img 
                                 src={img.src} 
                                 alt={img.title} 
                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                               />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                               <span className="text-xs font-mono text-crimsonLight uppercase tracking-wider mb-1 block">
                                  {img.category}
                               </span>
                               <h4 className="text-xl font-bold text-white">{img.title}</h4>
                            </div>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CompanyGallery;
