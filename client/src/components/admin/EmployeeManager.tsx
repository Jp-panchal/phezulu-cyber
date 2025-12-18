import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import { Trash2, Plus, Upload, X, Edit2, Users } from 'lucide-react';

interface Employee {
  _id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  achievement: string;
  speciality: string;
  email: string;
  linkedin: string;
}

const EmployeeManager: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [formData, setFormData] = useState<Employee>({
    name: '',
    role: '',
    bio: '',
    image: '',
    achievement: '',
    speciality: '',
    email: '',
    linkedin: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchEmployees = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/employees');
      const data = await res.json();
      setEmployees(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      // Keep existing image URL in formData until upload is confirmed, 
      // but UI will show preview. 
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: '',
      achievement: '',
      speciality: '',
      email: '',
      linkedin: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setIsEditing(false);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (emp: Employee) => {
    setFormData(emp);
    setPreviewUrl(emp.image); // Show current image as preview
    setSelectedFile(null); // No new file selected yet
    setIsEditing(true);
    setEditId(emp._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = formData.image;

    // 1. Upload Image (only if new file selected)
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
        alert('Failed to upload image. Please try again.');
        setIsUploading(false);
        return;
      }
    }

    if (!finalImageUrl) {
      alert("Please upload a profile photo.");
      setIsUploading(false);
      return;
    }

    // 2. Save Data
    const token = localStorage.getItem('token');
    const employeeData = { ...formData, image: finalImageUrl };

    const url = isEditing && editId
      ? `http://localhost:5000/api/admin/employees/${editId}`
      : 'http://localhost:5000/api/admin/employees';

    const method = isEditing ? 'PUT' : 'POST'; // Assuming backend supports PUT

    try {
      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify(employeeData),
      });

      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error("Failed to save", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/employees/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    fetchEmployees();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Manage Team</h2>

      {/* Form */}
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 mb-12 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="text-amber" /> : <Plus className="text-crimson" />}
            {isEditing ? 'Edit Expert' : 'Add New Expert'}
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
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Full Name</label>
              <input type="text" placeholder="e.g. Sarah Connor" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 focus:border-crimson outline-none transition-colors" required />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Role / Title</label>
              <input type="text" placeholder="e.g. Lead Analyst" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none" required />
            </div>

            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Profile Photo</label>
              <div className="bg-slate-800 p-3 rounded border border-slate-700 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-600 overflow-hidden shrink-0 flex items-center justify-center">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Users size={24} className="text-slate-600" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-slate-700 text-white text-xs rounded hover:bg-slate-600 transition-colors">
                      Choose File
                    </button>
                    {previewUrl && (
                      <button type="button" onClick={clearImage} className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs rounded hover:bg-red-500 hover:text-white transition-colors">
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">Recommended: Square aspect ratio (500x500px)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-full">
            <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Bio / Description</label>
            <textarea
              placeholder="Short professional bio..."
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 flex-1 resize-none outline-none focus:border-crimson transition-colors"
              required
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Achievement</label>
              <input
                type="text"
                placeholder="e.g. Led 50+ incident responses"
                value={formData.achievement}
                onChange={e => setFormData({ ...formData, achievement: e.target.value })}
                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Speciality</label>
              <input
                type="text"
                placeholder="e.g. Cloud Security, DFIR"
                value={formData.speciality}
                onChange={e => setFormData({ ...formData, speciality: e.target.value })}
                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-2">LinkedIn Profile URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-slate-800 p-3 rounded text-white border border-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-4 border-t border-slate-800">
            <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isUploading}>
              {isUploading ? <span className="animate-pulse">Uploading...</span> : isEditing ? 'Update Expert' : 'Add To Team'}
            </Button>
          </div>
        </form>
      </div>

      {/* Grid List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.length > 0 ? employees.map(emp => (
          <div key={emp._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-crimson/5">
            <div className="p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full border-2 border-slate-700 p-1 mb-4 group-hover:border-crimson transition-colors">
                <img src={emp.image} alt={emp.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{emp.name}</h3>
              <p className="text-xs text-crimson font-mono uppercase tracking-widest mb-4">{emp.role}</p>
              <p className="text-sm text-slate-400 line-clamp-3 mb-4 h-16">{emp.bio}</p>
              <div className="text-left space-y-2 text-sm text-slate-300 bg-slate-800/50 border border-slate-800 rounded-lg p-3">
                <div><span className="text-slate-500 text-[11px] uppercase">Achievement:</span> <span className="text-white">{emp.achievement}</span></div>
                <div><span className="text-slate-500 text-[11px] uppercase">Speciality:</span> <span className="text-white">{emp.speciality}</span></div>
                <div className="break-words"><span className="text-slate-500 text-[11px] uppercase">Email:</span> <span className="text-white">{emp.email}</span></div>
                {emp.linkedin && (
                  <div className="break-words">
                    <span className="text-slate-500 text-[11px] uppercase">LinkedIn:</span>{' '}
                    <a href={emp.linkedin} target="_blank" rel="noreferrer" className="text-crimson hover:underline break-all">{emp.linkedin}</a>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-2 pt-4 border-t border-slate-800/50">
                <button onClick={() => handleEdit(emp)} className="p-2 text-slate-400 hover:text-amber hover:bg-slate-800 rounded transition-colors" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(emp._id!)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="md:col-span-3 text-center py-12 text-slate-500 bg-slate-900/20 rounded-xl border border-slate-800 border-dashed">
            No team members found.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManager;