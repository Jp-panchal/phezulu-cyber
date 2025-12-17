import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Upload, X, ShieldCheck } from 'lucide-react';

interface Partner {
  _id?: string;
  name: string;
  logoUrl?: string; // Optional because we might select a file
  category: string;
}

const PartnerManager: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [formData, setFormData] = useState<Partner>({ name: '', logoUrl: '', category: 'Security' });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
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
      setFormData({ ...formData, logoUrl: '' }); // Clear manual URL
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({ ...formData, logoUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalLogoUrl = formData.logoUrl;

    // 1. Upload Logo if selected
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

    // 2. Save Partner
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/admin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
      body: JSON.stringify({ ...formData, logoUrl: finalLogoUrl }),
    });

    fetchPartners();
    setFormData({ name: '', logoUrl: '', category: 'Security' });
    clearImage();
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

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Manage Partners</h2>

      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-12">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Plus className="text-crimson" /> Add New Partner
        </h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Company Name</label>
              <input type="text" placeholder="e.g. Acme Corp" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none focus:border-crimson transition-colors" required />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Category</label>
              <input type="text" placeholder="e.g. Technology Partner" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Company Logo (SVG/PNG)</label>
            <div className="bg-slate-800 p-4 rounded border border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/5 rounded flex items-center justify-center border border-slate-600">
                  {previewUrl || formData.logoUrl ? (
                    <img src={previewUrl || formData.logoUrl} alt="Preview" className="w-10 h-10 object-contain" />
                  ) : (
                    <ShieldCheck className="text-slate-600" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*,.svg"
                    className="hidden"
                  />
                  <div className="flex gap-2 mb-2">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-colors flex items-center gap-2">
                      <Upload size={12} /> Upload File
                    </button>
                    {(previewUrl || formData.logoUrl) && (
                      <button type="button" onClick={clearImage} className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs rounded transition-colors">
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">Supports SVG, PNG, JPG</p>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center text-slate-500 text-xs">- OR -</div>
            <input
              type="text"
              placeholder="Paste Logo URL directly..."
              value={formData.logoUrl}
              onChange={e => {
                setFormData({ ...formData, logoUrl: e.target.value });
                setPreviewUrl('');
                setSelectedFile(null);
              }}
              className="w-full bg-slate-800/50 p-2 rounded text-white text-xs border border-slate-700 mt-2 outline-none"
            />
          </div>

          <div className="md:col-span-2 pt-4 border-t border-slate-800">
            <Button type="submit" variant="primary" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Add Partner'}
            </Button>
          </div>
        </form>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map(p => (
          <div key={p._id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-slate-700 transition-colors relative">
            <button onClick={() => handleDelete(p._id!)} className="absolute top-2 right-2 text-slate-600 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={16} />
            </button>

            <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center mb-4 p-4 border border-slate-700/50">
              {p.logoUrl ? (
                <img src={p.logoUrl} alt={p.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" />
              ) : (
                <ShieldCheck size={32} className="text-slate-600" />
              )}
            </div>

            <h4 className="font-bold text-white mb-1">{p.name}</h4>
            <span className="px-2 py-1 rounded bg-slate-800 text-[10px] uppercase text-slate-400 font-bold tracking-wider">
              {p.category}
            </span>
          </div>
        ))}
        {partners.length === 0 && (
          <div className="md:col-span-4 text-center py-12 text-slate-500 bg-slate-900/20 rounded-xl border border-slate-800 border-dashed">
            No partners added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerManager;
