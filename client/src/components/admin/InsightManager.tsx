
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Calendar } from 'lucide-react';

interface Insight {
  _id?: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  link: string;
}

const InsightManager: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [formData, setFormData] = useState<Insight>({
    title: '', category: 'Blog', date: new Date().toISOString().split('T')[0], excerpt: '', link: '#'
  });

  const fetchInsights = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/insights');
      const data = await res.json();
      setInsights(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchInsights(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/admin/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
      body: JSON.stringify(formData),
    });
    fetchInsights();
    setFormData({ title: '', category: 'Blog', date: '', excerpt: '', link: '#' });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/insights/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    fetchInsights();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Insights</h2>
      
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Post New Insight</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" required />
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700">
             <option>Blog</option>
             <option>Webinar</option>
             <option>Threat Report</option>
             <option>Whitepaper</option>
          </select>
          <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" required />
          <input type="text" placeholder="Link URL" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" />
          <textarea placeholder="Excerpt/Summary" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700 md:col-span-2" rows={3} required />
          <Button type="submit" className="md:col-span-2"><Plus size={16} /> Publish</Button>
        </form>
      </div>

      <div className="grid gap-4">
        {insights.map(item => (
          <div key={item._id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center group">
             <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                   <span className="text-crimson font-mono uppercase">{item.category}</span>
                   <span className="text-slate-600">|</span>
                   <span className="text-slate-500 flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
                </div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400 line-clamp-1">{item.excerpt}</p>
             </div>
             <button onClick={() => handleDelete(item._id!)} className="text-slate-600 hover:text-red-500 transition-colors p-2">
               <Trash2 size={18} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightManager;
