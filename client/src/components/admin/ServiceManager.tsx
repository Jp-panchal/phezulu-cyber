import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Upload, X, Shield, Search, Check } from 'lucide-react';
import { fetchPillars } from '../../lib/api';
import type { Pillar, ServiceDetail } from '../../types';

const ServiceManager: React.FC = () => {
    const [pillars, setPillars] = useState<Pillar[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Flattened list for display
    const [services, setServices] = useState<(ServiceDetail & { _id?: string, pillarId: string, pillarTitle: string })[]>([]);

    // Form State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Ideally we'd use ID, but likely using Name as identifier based on current logic
    const [_activeServiceId, setActiveServiceId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        features: '',
        benefits: '',
        diagramUrl: '',
        pillarId: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadData = async () => {
        try {
            const data = await fetchPillars();
            setPillars(data);

            // Flatten for the table
            const flat: any[] = [];
            data.forEach(p => {
                p.details.forEach(s => {
                    flat.push({
                        ...s,
                        pillarId: p._id || p.title,
                        pillarTitle: p.title
                    });
                });
            });
            setServices(flat);

            // Set default pillar for form if not set
            if (!formData.pillarId && data.length > 0) {
                setFormData(prev => ({ ...prev, pillarId: data[0]._id || data[0].title }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { loadData(); }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const data = new FormData();
        data.append('image', file);

        try {
            const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: data });
            const result = await res.json();
            if (result.url) {
                setFormData(prev => ({ ...prev, diagramUrl: result.url }));
            }
        } catch (err) {
            console.error('Upload failed', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Convert text areas to arrays
        const payload = {
            ...formData,
            features: formData.features.split('\n').filter(s => s.trim()),
            benefits: formData.benefits.split('\n').filter(s => s.trim())
        };

        try {
            const url = isEditing
                ? `http://localhost:5000/api/admin/services/${formData.pillarId}/${encodeURIComponent(formData.name)}`
                : 'http://localhost:5000/api/admin/services';

            const method = isEditing ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
                body: JSON.stringify(payload)
            });

            // Refresh
            loadData();
            closeForm();
        } catch (err) {
            console.error("Failed to save service", err);
        }
    };

    const closeForm = () => {
        setFormData({
            name: '',
            description: '',
            features: '',
            benefits: '',
            diagramUrl: '',
            pillarId: pillars[0]?._id || pillars[0]?.title || ''
        });
        setIsEditing(false);
        setActiveServiceId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (item: any) => {
        setFormData({
            name: item.name,
            description: item.description,
            features: (item.features || []).join('\n'),
            benefits: (item.benefits || []).join('\n'),
            diagramUrl: item.diagramUrl || '',
            pillarId: item.pillarId
        });
        setIsEditing(true);
        setActiveServiceId(item.name);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (item: any) => {
        if (!confirm(`Delete ${item.name}?`)) return;
        const token = localStorage.getItem('token');
        try {
            await fetch(`http://localhost:5000/api/admin/services/${item.pillarId}/${encodeURIComponent(item.name)}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token || '' }
            });
            loadData();
        } catch (err) { console.error(err); }
    };

    const filteredServices = services.filter(s => {
        const matchesFilter = activeFilter === 'All' || s.pillarTitle === activeFilter;
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const categories = ['All', ...pillars.map(p => p.title)];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Services Catalog</h2>
                    <p className="text-slate-400 text-sm">Manage cybersecurity service offerings and pillars.</p>
                </div>

                <button
                    onClick={() => { setIsFormOpen(true); setIsEditing(false); }}
                    className="bg-crimson hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-crimson/20 transition-all flex items-center gap-2"
                >
                    <Plus size={18} /> Add New Service
                </button>
            </div>

            {/* Editor Panel (Collapsible) */}
            {isFormOpen && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-up relative">
                    <div className="h-1 bg-gradient-to-r from-crimson to-amber w-full absolute top-0 left-0" />

                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            {isEditing ? <Edit2 className="text-amber" size={18} /> : <Plus className="text-crimson" size={18} />}
                            {isEditing ? 'Edit Service' : 'Create New Service'}
                        </h3>
                        <button onClick={closeForm} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-8 grid lg:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Service Method (Pillar)</label>
                                    <select
                                        value={formData.pillarId}
                                        onChange={e => setFormData({ ...formData, pillarId: e.target.value })}
                                        className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                    >
                                        {pillars.map(p => (
                                            <option key={p.title} value={p._id || p.title}>{p.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Service Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. MDR-as-a-Service"
                                        className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Short Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Executive summary of the service..."
                                    className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none h-24 resize-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Architecture Diagram</label>
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
                                                placeholder="Or URL..."
                                                value={formData.diagramUrl}
                                                onChange={e => setFormData({ ...formData, diagramUrl: e.target.value })}
                                                className="flex-[2] bg-slate-900 px-3 rounded-lg text-sm text-white border border-slate-800 outline-none focus:border-slate-600"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-500">Supports JPG, PNG, WebP. Recommended size 1200x800.</p>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>
                                    {formData.diagramUrl && (
                                        <div className="w-20 h-20 rounded-lg bg-slate-900 border border-slate-700 overflow-hidden shrink-0 shadow-lg relative group">
                                            <img src={formData.diagramUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Check className="text-green-400" size={16} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Key Features <span className="text-slate-600 font-normal lowercase">(one per line)</span></label>
                                <textarea
                                    value={formData.features}
                                    onChange={e => setFormData({ ...formData, features: e.target.value })}
                                    placeholder="- 24/7 Monitoring&#10;- Threat Hunting"
                                    className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none h-32 resize-none focus:border-crimson focus:ring-1 focus:ring-crimson font-mono text-sm leading-relaxed"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Business Benefits <span className="text-slate-600 font-normal lowercase">(one per line)</span></label>
                                <textarea
                                    value={formData.benefits}
                                    onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                                    placeholder="- Reduces Costs&#10;- Improves Compliance"
                                    className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none h-32 resize-none focus:border-crimson focus:ring-1 focus:ring-crimson font-mono text-sm leading-relaxed"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-2 flex justify-end gap-3 pt-6 border-t border-slate-800">
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
                                {isEditing ? 'Save Changes' : 'Create Service'}
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
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-slate-600 transition-colors"
                    />
                </div>
            </div>

            {/* Service Cards / List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredServices.length > 0 ? filteredServices.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-slate-700 transition-all group"
                    >
                        {/* Thumbnail */}
                        <div className="w-full md:w-32 h-32 md:h-24 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center p-2 relative">
                            {service.diagramUrl ? (
                                <img src={service.diagramUrl} alt="" className="w-full h-full object-cover rounded" />
                            ) : (
                                <Shield className="text-slate-700" size={32} />
                            )}
                            <div className="absolute inset-0 border border-white/5 rounded pointer-events-none" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                                    {service.pillarTitle}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-crimson transition-colors truncate">
                                {service.name}
                            </h3>
                            <p className="text-sm text-slate-400 line-clamp-2 md:line-clamp-1">
                                {service.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-slate-800">
                            <button
                                onClick={() => handleEdit(service)}
                                className="flex-1 md:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase rounded-lg transition-colors"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(service)}
                                className="flex-1 md:flex-none px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold uppercase rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                        <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-slate-500" size={24} />
                        </div>
                        <h3 className="text-slate-300 font-medium">No services found</h3>
                        <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceManager;