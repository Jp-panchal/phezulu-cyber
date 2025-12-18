import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Upload, X, ShieldCheck, Search, Building2 } from 'lucide-react';

interface Partner {
  _id?: string;
  name: string;
  logoUrl?: string;
  category: string;
}

const PartnerManager: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [formData, setFormData] = useState<Partner>({ name: '', logoUrl: '', category: 'Technology Partner' });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPartners = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/partners');
      const data = await res.json();
      setPartners(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPartners(); }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData({ ...formData, logoUrl: '' });
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({ ...formData, logoUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeForm = () => {
    setFormData({ name: '', logoUrl: '', category: 'Technology Partner' });
    clearImage();
    setIsFormOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalLogoUrl = formData.logoUrl;

    if (selectedFile) {
      const uploadData = new FormData();
      uploadData.append('image', selectedFile);

      try {
        const uploadRes = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: uploadData
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const data = await uploadRes.json();
        finalLogoUrl = data.url;
      } catch (error) {
        alert('Failed to upload logo.');
        setIsUploading(false);
        return;
      }
    }

    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/admin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
      body: JSON.stringify({ ...formData, logoUrl: finalLogoUrl }),
    });

    fetchPartners();
    closeForm();
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this partner?")) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/partners/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    fetchPartners();
  };

  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Ecosystem & Partners</h2>
          <p className="text-slate-400 text-sm">Manage strategic alliances and technology partners.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-crimson hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-crimson/20 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Partner
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-up relative">
          <div className="h-1 bg-gradient-to-r from-amber to-crimson w-full absolute top-0 left-0" />

          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="text-crimson" size={18} /> Add New Partner
            </h3>
            <button onClick={closeForm} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  <input type="text" placeholder="e.g. Acme Corp" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-950 p-3 pl-10 rounded-lg text-white border border-slate-800 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all" required />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all">
                  <option>Technology Partner</option>
                  <option>Strategic Alliance</option>
                  <option>Cloud Provider</option>
                  <option>Client</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Logo Upload</label>
                <div className="flex gap-4 items-center p-4 border border-dashed border-slate-700 rounded-xl bg-slate-950/50">
                  <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center shrink-0 p-2">
                    {previewUrl || formData.logoUrl ? (
                      <img src={previewUrl || formData.logoUrl} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <ShieldCheck className="text-slate-700" size={32} />
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-xs font-bold uppercase border border-slate-700 hover:border-slate-600"
                      >
                        <Upload size={14} /> Upload
                      </button>
                      {(previewUrl || formData.logoUrl) && (
                        <button type="button" onClick={clearImage} className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-xs font-bold uppercase">
                          Remove
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste image URL..."
                      value={formData.logoUrl}
                      onChange={e => {
                        setFormData({ ...formData, logoUrl: e.target.value });
                        setPreviewUrl('');
                        setSelectedFile(null);
                      }}
                      className="w-full bg-slate-900 px-3 py-2 rounded-lg text-xs text-white border border-slate-800 outline-none focus:border-slate-600"
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*,.svg"
                      className="hidden"
                    />
                  </div>
                </div>
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
                disabled={isUploading}
                className="px-8 py-2.5 rounded-lg bg-crimson hover:bg-red-700 text-white font-semibold shadow-lg shadow-crimson/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isUploading ? 'Uploading...' : 'Save Partner'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-slate-600 transition-colors"
          />
        </div>
        <div className="ml-auto text-xs text-slate-500 font-mono">
          {filteredPartners.length} PARTNERS
        </div>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPartners.length > 0 ? filteredPartners.map(p => (
          <div key={p._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-slate-700 transition-all relative hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
            <button onClick={() => handleDelete(p._id!)} className="absolute top-2 right-2 text-slate-600 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 rounded-lg backdrop-blur-sm">
              <Trash2 size={16} />
            </button>

            <div className="w-24 h-24 bg-slate-950 rounded-xl flex items-center justify-center mb-4 p-4 border border-slate-800 group-hover:border-slate-600 transition-colors shadow-inner">
              {p.logoUrl ? (
                <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <ShieldCheck size={32} className="text-slate-700" />
              )}
            </div>

            <h4 className="font-bold text-white mb-2 line-clamp-1 w-full" title={p.name}>{p.name}</h4>
            <span className="px-2 py-1 rounded bg-slate-800/50 text-[10px] uppercase text-slate-400 font-bold tracking-wider border border-slate-800">
              {p.category}
            </span>
          </div>
        )) : (
          !isFormOpen && (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
              <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-500" size={24} />
              </div>
              <h3 className="text-slate-300 font-medium">No partners found</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PartnerManager;
