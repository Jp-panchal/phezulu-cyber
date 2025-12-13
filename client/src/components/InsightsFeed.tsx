import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { fetchInsights, type Insight } from '../lib/api';

const InsightsFeed: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchInsights();
      setInsights(data);
    };
    load();
  }, []);

  return (
    <section id="insights" className="py-20 bg-midnight border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">Latest Insights</h2>
            <p className="text-slate-400">Knowledge from the front lines of cyber defense.</p>
          </div>
          <a href="#" className="text-crimson hover:text-white transition-colors text-sm font-medium flex items-center gap-1">
            View All Updates <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((item, idx) => (
            <motion.a 
              href={item.link}
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group block p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-crimson bg-crimson/10 px-2 py-1 rounded uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-slate-500 text-xs flex items-center gap-1">
                  <Calendar size={12} /> {item.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-crimson transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400">
                {item.excerpt}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsFeed;