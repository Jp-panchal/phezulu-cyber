
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchInsightById, type Insight } from '../lib/api';
import { Calendar, ArrowLeft, Share2, Tag, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

const InsightDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (id) {
        setLoading(true);
        const data = await fetchInsightById(id);
        if (data) {
          setInsight(data);
        } else {
          // Handle not found
          navigate('/insights');
        }
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight pt-32 pb-20 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
           <div className="w-12 h-12 border-4 border-crimson border-t-transparent rounded-full animate-spin mb-4"></div>
           <p className="text-slate-500 font-mono text-sm">Decryption in progress...</p>
        </div>
      </div>
    );
  }

  if (!insight) return null;

  // Determine back link destination based on category
  const getBackLink = (cat: string) => {
    switch(cat) {
      case 'Blog': return '/blog';
      case 'Webinar': return '/webinars';
      case 'Threat Report': return '/reports';
      default: return '/insights';
    }
  };

  const backLink = getBackLink(insight.category);
  const backLabel = insight.category === 'Threat Report' ? 'Threat Reports' : (insight.category + 's' || 'Intelligence Hub');

  return (
    <div className="min-h-screen bg-midnight pt-28 pb-20">
      <article className="container mx-auto px-6 max-w-4xl">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            to={backLink}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to {backLabel}
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono uppercase tracking-wider"
          >
            <span className="px-3 py-1 rounded bg-crimson/10 text-crimson border border-crimson/20">
              {insight.category}
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <Calendar size={14} /> {insight.date}
            </span>
            <span className="flex items-center gap-2 text-slate-500">
              <Clock size={14} /> 5 Min Read
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight"
          >
            {insight.title}
          </motion.h1>

          {/* Featured Image */}
          {insight.image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden border border-slate-800 aspect-video relative mb-12 group"
            >
              <img 
                src={insight.image} 
                alt={insight.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent" />
            </motion.div>
          )}
        </header>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6"
        >
          {insight.content ? (
            insight.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p>{insight.excerpt}</p>
          )}
        </motion.div>

        {/* Footer / Share */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Tag size={16} />
              <span>Tags: Cybersecurity, {insight.category}, Intelligence</span>
           </div>
           
           <div className="flex gap-4">
              <Button variant="outline" className="text-xs py-2 h-auto" onClick={() => {
                 navigator.clipboard.writeText(window.location.href);
                 alert('Link copied to clipboard');
              }}>
                 <Share2 size={14} /> Share Report
              </Button>
           </div>
        </div>

      </article>
    </div>
  );
};

export default InsightDetailPage;
