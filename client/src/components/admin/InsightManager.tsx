import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Calendar, Edit2, Upload, Image as ImageIcon, X } from 'lucide-react';
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

  // Form State
  const [formData, setFormData] = useState<Insight>({
    title: '', category: 'Blog', date: new Date().toISOString().split('T')[0], excerpt: '', link: '#', image: ''
  });
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
      resetForm();
    } catch (err) {
      console.error("Failed to save", err);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'Blog', date: new Date().toISOString().split('T')[0], excerpt: '', link: '#', image: '' });
    setIsEditing(false);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (item: Insight) => {
    setFormData(item);
    setIsEditing(true);
    setEditId(item._id || null);
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

  const filteredInsights = activeFilter === 'All'
    ? insights
    : insights.filter(i => i.category === activeFilter);

  const categories = ['All', 'Blog', 'Webinar', 'Threat Report'];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Manage Insights</h2>

      {/* Post/Edit Form */}
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-12 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="text-amber" /> : <Plus className="text-crimson" />}
            {isEditing ? 'Edit Insight' : 'Post New Insight'}
          </h3>
          {isEditing && (
            <button onClick={resetForm} className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
              <X size={14} /> Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Title</label>
              <input type="text" placeholder="Article Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 focus:border-crimson outline-none transition-colors" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none">
                  <option>Blog</option>
                  <option>Webinar</option>
                  <option>Threat Report</option>
                  <option>Whitepaper</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Date</label>
                <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">External Link (Optional)</label>
              <input type="text" placeholder="https://..." value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Cover Image</label>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-dashed border-slate-600 rounded p-3 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload size={16} /> Upload Image
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Or paste URL..."
                    value={formData.image || ''}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-800/50 p-2 rounded text-xs text-white border border-slate-700 mt-2 outline-none"
                  />
                </div>
                {formData.image && (
                  <div className="w-20 h-20 rounded bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Excerpt</label>
              <textarea
                placeholder="Brief description..."
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none h-32 resize-none"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4 border-t border-slate-800">
            <Button type="submit" variant="primary" className="w-full md:w-auto">
              {isEditing ? <Edit2 size={16} /> : <Plus size={16} />}
              {isEditing ? 'Update Insight' : 'Publish Insight'}
            </Button>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeFilter === cat
              ? 'bg-crimson text-white shadow-lg shadow-crimson/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List View */}
      <div className="space-y-4">
        {filteredInsights.length > 0 ? filteredInsights.map(item => (
          <div key={item._id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex items-start md:items-center gap-6 group hover:border-slate-700 transition-colors">

            {/* Mini Image */}
            <div className="w-24 h-24 md:w-32 md:h-24 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600">
                  <ImageIcon size={24} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 text-xs mb-2">
                <span className={`px-2 py-0.5 rounded text-white font-bold uppercase tracking-wider text-[10px] ${item.category === 'Threat Report' ? 'bg-red-500/20 text-red-400' :
                  item.category === 'Webinar' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                  {item.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1"><Calendar size={10} /> {item.date}</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-2 truncate">{item.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                {item.excerpt}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-2 self-start md:self-center">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 rounded bg-slate-800 text-amber hover:bg-amber hover:text-black transition-colors"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(item._id!)}
                className="p-2 rounded bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 text-slate-500 bg-slate-900/20 rounded-xl border border-slate-800 border-dashed">
            Filter returned no results.
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightManager;
