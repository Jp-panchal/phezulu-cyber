import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Edit2, Upload, Server, Shield, FileCheck, X, Image as ImageIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { fetchPillars } from '../../lib/api';
import type { Pillar, ServiceDetail } from '../../types';

const ServiceManager: React.FC = () => {
    const [pillars, setPillars] = useState<Pillar[]>([]);
    const [activeFilter, setActiveFilter] = useState('All');

    // Flattened list for display
    const [services, setServices] = useState<(ServiceDetail & { _id?: string, pillarId: string, pillarTitle: string })[]>([]);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editingServiceId, setEditingServiceId] = useState<string | null>(null); // Ideally we'd use ID, but might use Name if ID missing
    const [activePillarId, setActivePillarId] = useState('');

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
                        pillarId: p._id || p.title, // Fallback to title if ID missing in cache
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
                ? `http://localhost:5000/api/admin/services/${formData.pillarId}/${encodeURIComponent(formData.name)}` // Heuristic ID
                : 'http://localhost:5000/api/admin/services';

            const method = isEditing ? 'PUT' : 'POST';

            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
                body: JSON.stringify(payload)
            });

            // Refresh
            loadData();
            resetForm();
        } catch (err) {
            console.error("Failed to save service", err);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            features: '',
            benefits: '',
            diagramUrl: '',
            pillarId: pillars[0]?._id || pillars[0]?.title || ''
        });
        setIsEditing(false);
        setEditingServiceId(null);
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
        setEditingServiceId(item.name);
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

    // Filter Logic
    const filteredServices = activeFilter === 'All'
        ? services
        : services.filter(s => s.pillarTitle === activeFilter);

    const categories = ['All', ...pillars.map(p => p.title)];

    return (
        <div>
            <h2 className="text-3xl font-bold text-white mb-8">Manage Services</h2>

            {/* Form */}
            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-12 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {isEditing ? <Edit2 className="text-amber" /> : <Plus className="text-crimson" />}
                        {isEditing ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    {isEditing && (
                        <button onClick={resetForm} className="text-sm text-slate-400 hover:text-white flex items-center gap-1">
                            <X size={14} /> Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Service Pillar</label>
                                <select
                                    value={formData.pillarId}
                                    onChange={e => setFormData({ ...formData, pillarId: e.target.value })}
                                    className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none focus:border-crimson transition-colors"
                                >
                                    {pillars.map(p => (
                                        <option key={p.title} value={p._id || p.title}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Service Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. MDR-as-a-Service"
                                    className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none focus:border-crimson"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Short executive summary..."
                                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none h-24 resize-none focus:border-crimson"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Architecture Diagram</label>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-dashed border-slate-600 rounded p-3 flex items-center justify-center gap-2 transition-colors text-sm"
                                        >
                                            <Upload size={16} /> Upload
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Or generic URL..."
                                            value={formData.diagramUrl}
                                            onChange={e => setFormData({ ...formData, diagramUrl: e.target.value })}
                                            className="flex-[2] bg-slate-800/50 p-3 rounded text-sm text-white border border-slate-700 outline-none"
                                        />
                                    </div>
                                </div>
                                {formData.diagramUrl && (
                                    <div className="w-16 h-16 rounded bg-slate-800 border border-slate-700 overflow-hidden shrink-0 group relative">
                                        <img src={formData.diagramUrl} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Key Features (One per line)</label>
                            <textarea
                                value={formData.features}
                                onChange={e => setFormData({ ...formData, features: e.target.value })}
                                placeholder="- 24/7 Monitoring&#10;- Threat Hunting&#10;- Incident Response"
                                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none h-32 resize-none focus:border-crimson font-mono text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Business Benefits (One per line)</label>
                            <textarea
                                value={formData.benefits}
                                onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                                placeholder="- Reduces Costs&#10;- Improves Compliance"
                                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none h-32 resize-none focus:border-crimson font-mono text-sm"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2 pt-6 border-t border-slate-800">
                        <Button type="submit" variant="primary">
                            {isEditing ? 'Update Service' : 'Add Service'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* List View */}
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

            <div className="space-y-3">
                {filteredServices.length > 0 ? filteredServices.map((service, idx) => (
                    <div key={idx} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center gap-6 group hover:border-slate-700 transition-colors">
                        {/* Image/Icon */}
                        <div className="w-20 h-16 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center">
                            {service.diagramUrl ? (
                                <img src={service.diagramUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <Shield className="text-slate-600" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-mono text-crimsonLight uppercase tracking-wider mb-1">{service.pillarTitle}</div>
                            <h4 className="text-white font-bold truncate">{service.name}</h4>
                            <p className="text-slate-500 text-xs truncate">{service.description}</p>
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(service)} className="p-2 rounded hover:bg-slate-800 text-amber"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(service)} className="p-2 rounded hover:bg-slate-800 text-slate-500 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12 text-slate-500">No services found.</div>
                )}
            </div>
        </div>
    );
};

export default ServiceManager;