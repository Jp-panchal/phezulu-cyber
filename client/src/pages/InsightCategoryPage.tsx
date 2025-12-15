
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchInsights, type Insight } from '../lib/api';
import { Calendar, ArrowUpRight, FileText, Video, Rss, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

interface InsightCategoryPageProps {
  category: string; // 'Blog' | 'Webinar' | 'Threat Report' | 'All'
  title: string;
  subtitle: string;
}

const InsightCategoryPage: React.FC<InsightCategoryPageProps> = ({ category, title, subtitle }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchInsights();
      // Filter based on category, if 'All' show everything
      const filtered = category === 'All' 
        ? data 
        : data.filter(item => item.category === category);
      setInsights(filtered);
      setLoading(false);
    };
    load();
  }, [category]);

  const getIcon = (cat: string) => {
     switch(cat) {
        case 'Webinar': return <Video size={14} />;
        case 'Threat Report': return <FileText size={14} />;
        case 'Blog': return <Rss size={14} />;
        default: return <Layers size={14} />;
     }
  }

  return (
    <div className="pt-24 pb-20 bg-midnight min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 mb-6">
               <span className="text-xs font-mono text-crimsonLight tracking-wider uppercase">
                 {category === 'All' ? 'Intelligence Hub' : 'Knowledge Base'}
               </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
               {title}
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
               {subtitle}
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        {loading ? (
             <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[1,2,3].map(i => (
                    <div key={i} className="h-64 rounded-xl bg-slate-900/50 animate-pulse border border-slate-800" />
                ))}
             </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {insights.length > 0 ? insights.map((item, idx) => (
                    <Link 
                      to={`/insights/${item.id}`}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      key={idx}
                      className="block h-full"
                    >
                        <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group flex flex-col p-8 rounded-2xl border border-slate-800 bg-slate-900/20 hover:bg-slate-900/60 transition-all duration-300 hover:border-crimson/30 hover:-translate-y-1 h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-mono text-crimson bg-crimson/10 px-2 py-1 rounded uppercase tracking-wider flex items-center gap-2">
                                {getIcon(item.category)}
                                {item.category}
                                </span>
                                <span className="text-slate-500 text-xs flex items-center gap-1 font-mono">
                                <Calendar size={12} /> {item.date}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-crimson transition-colors">
                                {item.title}
                            </h3>
                            
                            <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                                {item.excerpt}
                            </p>

                            <div className="flex items-center text-sm font-bold text-white group-hover:text-crimson transition-colors mt-auto">
                                Read Full Entry <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </motion.div>
                    </Link>
                )) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border border-slate-800/50 rounded-2xl bg-slate-900/20">
                        <div className="p-4 bg-slate-800 rounded-full mb-4">
                           <Layers size={14} />
                        </div>
                        <p>No content available in this category yet.</p>
                        <p className="text-sm mt-2">Check back soon for updates.</p>
                    </div>
                )}
            </div>
        )}

      </div>
    </div>
  );
};

export default InsightCategoryPage;
