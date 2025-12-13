
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Image } from 'lucide-react';

interface Partner {
  _id?: string;
  name: string;
  logoUrl?: string;
  category: string;
}

const PartnerManager: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [formData, setFormData] = useState<Partner>({ name: '', logoUrl: '', category: 'Security' });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5000/api/admin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
      body: JSON.stringify(formData),
    });
    fetchPartners();
    setFormData({ name: '', logoUrl: '', category: 'Security' });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/partners/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    fetchPartners();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Partners</h2>
      
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Add Partner</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Partner Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" required />
          <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" />
          <input type="text" placeholder="Logo URL (Optional)" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700 md:col-span-2" />
          <Button type="submit" className="md:col-span-2"><Plus size={16} /> Add Partner</Button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {partners.map(p => (
          <div key={p._id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex justify-between items-center group">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-slate-500">
                  {p.logoUrl ? <img src={p.logoUrl} alt={p.name} className="w-8 h-8 object-contain" /> : <Image size={20} />}
               </div>
               <div>
                  <h4 className="font-bold text-white text-sm">{p.name}</h4>
                  <p className="text-[10px] text-slate-500">{p.category}</p>
               </div>
             </div>
             <button onClick={() => handleDelete(p._id!)} className="text-slate-600 hover:text-red-500 transition-colors">
               <Trash2 size={16} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerManager;
