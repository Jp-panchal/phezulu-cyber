import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Upload, X } from 'lucide-react';

interface Employee {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  stats: { label: string; value: string }[];
}

const EmployeeManager: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({
    name: '', role: '', bio: '', image: '', stats: []
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const fetchEmployees = async () => {
    const res = await fetch('http://localhost:5000/api/admin/employees');
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      // Clear previous string image in form data so we know to upload new one
      setFormData({ ...formData, image: '' });
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({ ...formData, image: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = formData.image;

    // 1. Upload Image if a new file is selected
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
            finalImageUrl = data.url;
        } catch (error) {
            alert('Failed to upload image');
            setIsUploading(false);
            return;
        }
    }

    if (!finalImageUrl) {
      alert("Please upload an image.");
      setIsUploading(false);
      return;
    }

    // 2. Save Employee Data
    const token = localStorage.getItem('token');
    const employeeData = { ...formData, image: finalImageUrl };

    await fetch('http://localhost:5000/api/admin/employees', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token || '' 
      },
      body: JSON.stringify(employeeData),
    });

    fetchEmployees();
    setFormData({ name: '', role: '', bio: '', image: '', stats: [] });
    setSelectedFile(null);
    setPreviewUrl('');
    setIsUploading(false);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/employees/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    fetchEmployees();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Team</h2>
      
      {/* Add Form */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Add New Expert</h3>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" required />
          <input type="text" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700" required />
          
          {/* Image Upload Control */}
          <div className="bg-slate-800 p-2 rounded border border-slate-700 flex items-center justify-between group relative">
            {(previewUrl || formData.image) ? (
                <div className="flex items-center gap-3">
                    <img src={previewUrl || formData.image} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-slate-500" />
                    <span className="text-xs text-green-400 font-mono">Image Ready</span>
                </div>
            ) : (
                <span className="text-slate-500 text-sm pl-2">Upload Profile Photo</span>
            )}
            
            <div className="flex items-center">
                {(previewUrl || formData.image) && (
                    <button type="button" onClick={clearImage} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <X size={16} />
                    </button>
                )}
                <label className="cursor-pointer p-2 text-crimson hover:text-white transition-colors" title="Select Image">
                    <Upload size={18} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                </label>
            </div>
          </div>

          <textarea placeholder="Bio" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="bg-slate-800 p-2 rounded text-white border border-slate-700 md:col-span-2" required />
          <Button type="submit" className="md:col-span-2" disabled={isUploading}>
             {isUploading ? <span className="animate-pulse">Uploading...</span> : <><Plus size={16} /> Add Employee</>}
          </Button>
        </form>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(emp => (
          <div key={emp._id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <img src={emp.image} alt={emp.name} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
              <div>
                <h4 className="font-bold text-white">{emp.name}</h4>
                <p className="text-xs text-crimson">{emp.role}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-4 line-clamp-3">{emp.bio}</p>
            <button onClick={() => handleDelete(emp._id!)} className="mt-auto self-end text-red-500 hover:text-red-400 p-2 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManager;