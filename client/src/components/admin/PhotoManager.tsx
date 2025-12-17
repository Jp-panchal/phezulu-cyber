import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Upload, Image as ImageIcon, X, Filter } from 'lucide-react';
import { fetchPhotos } from '../../lib/api';

interface Photo {
    _id?: string;
    title: string;
    url: string;
    category: 'company' | 'webinar';
    date: string;
}

const PhotoManager: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isUploading, setIsUploading] = useState(false);
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
            setIsUploading(false);
            setFormData({ title: '', category: 'company', url: '' });
        } catch (err) { console.error(err); }
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
        <div>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Media Library</h2>
                <Button onClick={() => setIsUploading(!isUploading)} icon={isUploading ? <X size={18} /> : <Plus size={18} />}>
                    {isUploading ? 'Cancel' : 'Add Photo'}
                </Button>
            </div>

            {isUploading && (
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8 animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 w-full space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-slate-500 mb-2 block">Title</label>
                                    <input type="text" placeholder="Photo Description" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none" required />
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-slate-500 mb-2 block">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none">
                                        <option value="company">Company</option>
                                        <option value="webinar">Webinar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex-1 bg-slate-800 border border-dashed border-slate-600 text-slate-400 hover:text-white p-3 rounded flex items-center justify-center gap-2 transition-colors">
                                    <Upload size={16} /> Upload File
                                </button>
                                {formData.url && <div className="text-green-500 text-xs flex items-center">Upload Complete</div>}
                            </div>
                        </div>
                        {formData.url && (
                            <div className="w-32 h-32 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                                <img src={formData.url} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <Button type="submit" variant="primary" disabled={!formData.url}>Save to Gallery</Button>
                    </form>
                </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8">
                {['All', 'Company', 'Webinar'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${activeFilter === cat
                            ? 'bg-crimson text-white shadow-lg shadow-crimson/20'
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
                    <div key={photo._id || photo.url} className="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <img src={photo.url} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                            <p className="text-white font-bold text-sm truncate">{photo.title}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] uppercase text-crimson font-mono tracking-wider">{photo.category}</span>
                                <button onClick={() => handleDelete(photo._id!)} className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Empty State */}
                {filteredPhotos.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-xl">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No photos in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoManager;
