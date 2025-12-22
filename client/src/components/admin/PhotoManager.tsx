import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Upload, Image as ImageIcon, X } from 'lucide-react';
import { fetchPhotos, type Photo } from '../../lib/api';

const PhotoManager: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', category: 'company', url: '' });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadPhotos = async () => {
        try {
            const data = await fetchPhotos();
            setPhotos(data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { loadPhotos(); }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const data = new FormData();
        data.append('image', file);

        try {
            const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: data });
            const result = await res.json();
            if (result.url) {
                setFormData(prev => ({ ...prev, url: result.url }));
            }
        } catch (err) { console.error(err); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await fetch('http://localhost:5000/api/admin/photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
                body: JSON.stringify({ ...formData, date: new Date().toISOString() })
            });
            loadPhotos();
            closeForm();
        } catch (err) { console.error(err); }
    };

    const closeForm = () => {
        setFormData({ title: '', category: 'company', url: '' });
        setIsFormOpen(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete photo?")) return;
        const token = localStorage.getItem('token');
        try {
            await fetch(`http://localhost:5000/api/admin/photos/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token || '' }
            });
            loadPhotos();
        } catch (err) { console.error(err); }
    };

    const filteredPhotos = activeFilter === 'All'
        ? photos
        : photos.filter(p => p.category === activeFilter.toLowerCase());

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Media Gallery</h2>
                    <p className="text-slate-400 text-sm">Manage company photos and event images.</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-crimson hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-crimson/20 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Add Photo
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-up relative">
                    <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 w-full absolute top-0 left-0" />
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Plus className="text-emerald-500" size={18} /> Add New Photo
                        </h3>
                        <button onClick={closeForm} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1 w-full space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-slate-500 mb-2 block">Title</label>
                                    <input type="text" placeholder="Photo Description" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-emerald-500 transition-colors" required />
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-slate-500 mb-2 block">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-emerald-500 transition-colors">
                                        <option value="company">Company</option>
                                        <option value="webinar">Webinar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 bg-slate-800 border border-dashed border-slate-600 text-slate-400 hover:text-white p-3 rounded-lg flex items-center justify-center gap-2 transition-colors hover:border-emerald-500 text-sm">
                                    <Upload size={16} /> Upload File
                                </button>
                                {formData.url && <div className="text-emerald-500 text-xs flex items-center font-bold px-3 bg-emerald-500/10 rounded-lg">Upload Complete</div>}
                            </div>
                        </div>
                        {formData.url ? (
                            <div className="w-32 h-32 bg-slate-950 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                                <img src={formData.url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-32 h-32 bg-slate-950 rounded-lg border border-dashed border-slate-800 flex items-center justify-center shrink-0">
                                <ImageIcon className="text-slate-800" size={32} />
                            </div>
                        )}
                    </form>
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end gap-3">
                        <button onClick={closeForm} type="button" className="px-4 py-2 text-slate-400 hover:text-white text-sm">Cancel</button>
                        <button onClick={handleSubmit} type="button" disabled={!formData.url} className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                            Save to Gallery
                        </button>
                    </div>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8">
                {['All', 'Company', 'Webinar'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${activeFilter === cat
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredPhotos.map(photo => (
                    <div key={photo._id || photo.url} className="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-800 cursor-pointer">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <p className="text-white font-bold text-sm truncate">{photo.title}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] uppercase text-emerald-400 font-mono tracking-wider">{photo.category}</span>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(photo._id!); }} className="text-slate-400 hover:text-red-500 transition-colors p-1 bg-slate-900/50 rounded hover:bg-slate-900">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/20">
                        <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ImageIcon size={24} className="text-slate-600" />
                        </div>
                        <p>No photos in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoManager;
