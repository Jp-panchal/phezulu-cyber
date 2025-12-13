import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Save, ChevronRight, Edit2, ArrowLeft } from 'lucide-react';
import type { Pillar, ServiceDetail } from '../../types';

const ServiceManager: React.FC = () => {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [selectedPillar, setSelectedPillar] = useState<Pillar | null>(null);
  const [editingService, setEditingService] = useState<ServiceDetail | null>(null);
  
  // Temporary state for the service being edited form
  const [formService, setFormService] = useState<ServiceDetail | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const fetchPillars = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/pillars');
      const data = await res.json();
      setPillars(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchPillars(); }, []);

  const handlePillarClick = (pillar: Pillar) => {
    setSelectedPillar(pillar);
    setEditingService(null);
  };

  const handleServiceClick = (service: ServiceDetail) => {
    setEditingService(service);
    // Deep copy for form
    setFormService(JSON.parse(JSON.stringify(service)));
    setFeatureInput('');
    setBenefitInput('');
  };

  const saveService = async () => {
    if (!selectedPillar || !formService) return;

    // 1. Update the local pillar object
    const updatedDetails = selectedPillar.details.map(s => 
        s.name === formService.name ? formService : s
    );
    const updatedPillar = { ...selectedPillar, details: updatedDetails };

    // 2. Send to Backend
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`http://localhost:5000/api/admin/pillars/${selectedPillar._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
            body: JSON.stringify(updatedPillar)
        });
        
        if (res.ok) {
            alert('Service Updated!');
            fetchPillars(); // Refresh
            setSelectedPillar(updatedPillar); // Keep looking at this pillar
            setEditingService(null); // Return to list
        }
    } catch (err) {
        alert('Failed to save');
    }
  };

  // Helper to manage array fields
  const addArrayItem = (field: 'features' | 'benefits' | 'fullDescription', value: string) => {
    if (!formService || !value.trim()) return;
    const current = formService[field] || [];
    setFormService({ ...formService, [field]: [...current, value] });
  };

  const removeArrayItem = (field: 'features' | 'benefits' | 'fullDescription', index: number) => {
    if (!formService) return;
    const current = formService[field] || [];
    setFormService({ ...formService, [field]: current.filter((_, i) => i !== index) });
  };

  if (editingService && formService) {
      return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
                    <ArrowLeft size={16} /> Back
                </button>
                <h2 className="text-2xl font-bold text-white">Editing: <span className="text-crimson">{formService.name}</span></h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <label className="block text-slate-400 text-sm mb-2 uppercase font-mono">Short Description</label>
                        <textarea 
                            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white h-24 mb-4"
                            value={formService.description}
                            onChange={(e) => setFormService({...formService, description: e.target.value})}
                        />
                         <label className="block text-slate-400 text-sm mb-2 uppercase font-mono">Diagram URL (Optional)</label>
                        <input 
                            type="text"
                            placeholder="https://... or /uploads/..."
                            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white"
                            value={formService.diagramUrl || ''}
                            onChange={(e) => setFormService({...formService, diagramUrl: e.target.value})}
                        />
                    </div>
                    
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <label className="block text-slate-400 text-sm mb-2 uppercase font-mono">Full Page Description (Paragraphs)</label>
                        <div className="space-y-2 mb-4">
                            {formService.fullDescription?.map((p, idx) => (
                                <div key={idx} className="flex gap-2 text-sm text-slate-300">
                                    <span className="text-slate-600">{idx+1}.</span>
                                    <p className="flex-1">{p}</p>
                                    <button onClick={() => removeArrayItem('fullDescription', idx)} className="text-red-500"><XIcon size={14}/></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                             <textarea 
                                id="newPara"
                                className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm"
                                placeholder="Add new paragraph..."
                             />
                             <Button onClick={() => {
                                 const el = document.getElementById('newPara') as HTMLTextAreaElement;
                                 addArrayItem('fullDescription', el.value);
                                 el.value = '';
                             }} className="px-3">Add</Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                     <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <label className="block text-slate-400 text-sm mb-2 uppercase font-mono">Key Features</label>
                        <ul className="space-y-2 mb-4">
                            {formService.features?.map((f, idx) => (
                                <li key={idx} className="flex justify-between bg-slate-800 p-2 rounded text-sm text-white">
                                    {f}
                                    <button onClick={() => removeArrayItem('features', idx)} className="text-red-500 hover:text-white"><XIcon size={14}/></button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2">
                            <input 
                                className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm"
                                value={featureInput}
                                onChange={e => setFeatureInput(e.target.value)}
                                placeholder="New Feature"
                            />
                            <Button onClick={() => { addArrayItem('features', featureInput); setFeatureInput(''); }}>Add</Button>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <label className="block text-slate-400 text-sm mb-2 uppercase font-mono">Business Benefits</label>
                        <ul className="space-y-2 mb-4">
                            {formService.benefits?.map((f, idx) => (
                                <li key={idx} className="flex justify-between bg-slate-800 p-2 rounded text-sm text-white">
                                    {f}
                                    <button onClick={() => removeArrayItem('benefits', idx)} className="text-red-500 hover:text-white"><XIcon size={14}/></button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2">
                            <input 
                                className="flex-1 bg-slate-800 border border-slate-700 rounded p-2 text-white text-sm"
                                value={benefitInput}
                                onChange={e => setBenefitInput(e.target.value)}
                                placeholder="New Benefit"
                            />
                            <Button onClick={() => { addArrayItem('benefits', benefitInput); setBenefitInput(''); }}>Add</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
                <Button onClick={saveService} icon={<Save size={18} />}>Save Changes</Button>
            </div>
        </div>
      )
  }

  // --- VIEW 1: SELECT PILLAR ---
  if (!selectedPillar) {
      return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-6">Select a Pillar</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {pillars.map(p => (
                    <div 
                        key={p._id} 
                        onClick={() => handlePillarClick(p)}
                        className="bg-slate-900 p-8 rounded-xl border border-slate-800 hover:border-crimson cursor-pointer transition-all group"
                    >
                        <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                        <p className="text-sm text-slate-400">{p.details.length} Services Configured</p>
                        <div className="mt-4 text-crimson opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-sm font-bold">
                            Manage Services <ChevronRight size={16} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      );
  }

  // --- VIEW 2: SELECT SERVICE ---
  return (
      <div>
          <div className="flex items-center gap-4 mb-6">
                <button onClick={() => setSelectedPillar(null)} className="text-slate-400 hover:text-white flex items-center gap-1 text-sm">
                    <ArrowLeft size={16} /> All Pillars
                </button>
                <h2 className="text-2xl font-bold text-white">{selectedPillar.title}</h2>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              {selectedPillar.details.map((s, idx) => (
                  <div key={idx} className="p-4 border-b border-slate-800 flex items-center justify-between hover:bg-slate-800/50">
                      <div>
                          <h4 className="font-bold text-white">{s.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{s.description}</p>
                      </div>
                      <Button variant="ghost" className="text-xs" onClick={() => handleServiceClick(s)}>
                          <Edit2 size={14} /> Edit
                      </Button>
                  </div>
              ))}
          </div>
      </div>
  );
};

const XIcon = ({size}: {size:number}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
)

export default ServiceManager;