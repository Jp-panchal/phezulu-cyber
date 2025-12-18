import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Calendar, Edit2, Upload, Image as ImageIcon, X, Search, Filter } from 'lucide-react';
import { fetchInsights } from '../../lib/api';

interface Insight {
  _id?: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  link: string;
  image?: string;
}

const InsightManager: React.FC = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState<Insight>({
    title: '', category: 'Blog', date: new Date().toISOString().split('T')[0], excerpt: '', link: '#', image: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadInsights = async () => {
    try {
      const data = await fetchInsights();
      setInsights(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadInsights(); }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.url) {
        setFormData({ ...formData, image: result.url });
      }
    } catch (err) {
      console.error('Upload failed', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const url = isEditing && editId
      ? `http://localhost:5000/api/admin/insights/${editId}`
      : 'http://localhost:5000/api/admin/insights';

    const method = isEditing ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
        body: JSON.stringify(formData),
      });

      // Reset
      loadInsights();
      closeForm();
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  const closeForm = () => {
    setFormData({ title: '', category: 'Blog', date: new Date().toISOString().split('T')[0], excerpt: '', link: '#', image: '' });
    setIsEditing(false);
    setEditId(null);
    setIsFormOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (item: Insight) => {
    setFormData(item);
    setIsEditing(true);
    setEditId(item._id || null);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/insights/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    loadInsights();
  };

  const filteredInsights = insights.filter(i => {
    const matchesFilter = activeFilter === 'All' || i.category === activeFilter;
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = ['All', 'Blog', 'Webinar', 'Threat Report', 'Whitepaper'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Content Management</h2>
          <p className="text-slate-400 text-sm">Publish reports, blogs, and updates.</p>
        </div>
        <button
          onClick={() => { setIsFormOpen(true); setIsEditing(false); }}
          className="bg-crimson hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-crimson/20 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> New Insight
        </button>
      </div>

      {/* Post/Edit Form */}
      {isFormOpen && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-up relative">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 w-full absolute top-0 left-0" />

          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {isEditing ? <Edit2 className="text-amber" size={18} /> : <Plus className="text-crimson" size={18} />}
              {isEditing ? 'Edit Insight' : 'Publish New Content'}
            </h3>
            <button onClick={closeForm} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Title</label>
                <input type="text" placeholder="Article Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all">
                    {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Date</label>
                  <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all" required />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">External Link</label>
                <input type="text" placeholder="https://..." value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Cover Image</label>
                <div className="flex gap-4 items-start p-4 border border-dashed border-slate-700 rounded-xl bg-slate-950/50">
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all text-sm border border-slate-700 hover:border-slate-600"
                      >
                        <Upload size={16} /> Upload Image
                      </button>
                      <input
                        type="text"
                        placeholder="Or paste URL..."
                        value={formData.image || ''}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        className="flex-[2] bg-slate-900 px-3 rounded-lg text-sm text-white border border-slate-800 outline-none focus:border-slate-600"
                      />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>
                  {formData.image && (
                    <div className="w-20 h-20 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0 shadow-lg relative group">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Excerpt</label>
                <textarea
                  placeholder="Brief description..."
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 h-32 resize-none outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="px-6 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 rounded-lg bg-crimson hover:bg-red-700 text-white font-semibold shadow-lg shadow-crimson/20 transition-all transform hover:-translate-y-0.5"
              >
                {isEditing ? 'Update Insight' : 'Publish Insight'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${activeFilter === cat
                ? 'bg-white text-slate-950'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="Search insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* List View */}
      <div className="space-y-4">
        {filteredInsights.length > 0 ? filteredInsights.map(item => (
          <div key={item._id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-slate-700 transition-all group">

            {/* Mini Image */}
            <div className="w-full md:w-32 h-32 md:h-24 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0 relative">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <ImageIcon size={24} />
                </div>
              )}
              <div className="absolute inset-0 border border-white/5 rounded pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 text-xs mb-2">
                <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${item.category === 'Threat Report' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  item.category === 'Webinar' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                  {item.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 truncate group-hover:text-amber transition-colors">{item.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-1">
                {item.excerpt}
              </p>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-slate-800">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id!)}
                className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold uppercase rounded-lg transition-colors"
                title="Delete"
              >
                Delete
              </button>
            </div>
          </div>
        )) : (
          !isFormOpen && (
            <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-500" size={24} />
              </div>
              <h3 className="text-slate-300 font-medium">No results found</h3>
              <p className="text-slate-500 text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InsightManager;
