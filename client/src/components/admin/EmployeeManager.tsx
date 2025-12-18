import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Upload, X, Edit2, Users, Linkedin, Mail, Search } from 'lucide-react';

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
  const [isFormOpen, setIsFormOpen] = useState(false);
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
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeForm = () => {
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
    setIsFormOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (emp: Employee) => {
    setFormData(emp);
    setPreviewUrl(emp.image);
    setSelectedFile(null);
    setIsEditing(true);
    setEditId(emp._id || null);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let finalImageUrl = formData.image;

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

    const token = localStorage.getItem('token');
    const employeeData = { ...formData, image: finalImageUrl };

    const url = isEditing && editId
      ? `http://localhost:5000/api/admin/employees/${editId}`
      : 'http://localhost:5000/api/admin/employees';

    const method = isEditing ? 'PUT' : 'POST';

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
      closeForm();
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Team Management</h2>
          <p className="text-slate-400 text-sm">Manage employee profiles and roles.</p>
        </div>
        <button
          onClick={() => { setIsFormOpen(true); setIsEditing(false); }}
          className="bg-crimson hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-crimson/20 transition-all flex items-center gap-2"
        >
          <Plus size={18} /> Add Team Member
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl animate-fade-up relative">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-crimson w-full absolute top-0 left-0" />

          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {isEditing ? <Edit2 className="text-amber" size={18} /> : <Plus className="text-crimson" size={18} />}
              {isEditing ? 'Edit Profile' : 'New Team Member'}
            </h3>
            <button onClick={closeForm} className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div className="bg-slate-950/50 p-4 rounded-xl border border-dashed border-slate-700 flex flex-col items-center justify-center gap-4">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl bg-slate-800">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900">
                        <Users size={40} />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="text-white" size={24} />
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-crimson hover:text-white transition-colors uppercase tracking-wider">
                    Change Photo
                  </button>
                  {previewUrl && (
                    <button type="button" onClick={clearImage} className="block mx-auto mt-2 text-[10px] text-red-500 hover:underline">
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Full Name</label>
                  <input type="text" placeholder="e.g. Sarah Connor" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 focus:border-crimson focus:ring-1 focus:ring-crimson outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Role / Title</label>
                  <input type="text" placeholder="e.g. Lead Analyst" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all" required />
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Bio / Description</label>
                <textarea
                  placeholder="Short professional bio..."
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 h-32 resize-none outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Achievement</label>
                  <input
                    type="text"
                    placeholder="e.g. Led 50+ responses"
                    value={formData.achievement}
                    onChange={e => setFormData({ ...formData, achievement: e.target.value })}
                    className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Speciality</label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud Security"
                    value={formData.speciality}
                    onChange={e => setFormData({ ...formData, speciality: e.target.value })}
                    className="w-full bg-slate-950 p-3 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <input
                      type="email"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 p-3 pl-10 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-500 font-bold mb-2 ml-1">LinkedIn</label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                    <input
                      type="url"
                      placeholder="https://linkedin.com/..."
                      value={formData.linkedin}
                      onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full bg-slate-950 p-3 pl-10 rounded-lg text-white border border-slate-800 outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
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
                className="px-8 py-2.5 rounded-lg bg-crimson hover:bg-red-700 text-white font-semibold shadow-lg shadow-crimson/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : isEditing ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {employees.length > 0 ? employees.map(emp => (
          <div key={emp._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-crimson/5 flex flex-col">
            <div className="p-6 text-center flex-1">
              <div className="w-24 h-24 mx-auto bg-slate-950 rounded-full border-2 border-slate-800 p-1 mb-4 group-hover:border-crimson transition-colors shadow-inner">
                <img src={emp.image} alt={emp.name} className="w-full h-full rounded-full object-cover" />
              </div>
              <h3 className="text-lg font-bold text-white mb-0.5">{emp.name}</h3>
              <p className="text-xs text-crimson font-mono uppercase tracking-widest mb-4">{emp.role}</p>
              <p className="text-sm text-slate-400 line-clamp-3 mb-6 h-[4.5em]">{emp.bio}</p>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Speciality</div>
                  <div className="text-xs text-slate-300 font-medium truncate" title={emp.speciality}>{emp.speciality}</div>
                </div>
                <div className="bg-slate-950/50 p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Achievement</div>
                  <div className="text-xs text-slate-300 font-medium truncate" title={emp.achievement}>{emp.achievement}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
              <div className="flex gap-2">
                <a href={`mailto:${emp.email}`} className="text-slate-500 hover:text-white transition-colors"><Mail size={16} /></a>
                {emp.linkedin && <a href={emp.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors"><Linkedin size={16} /></a>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(emp)} className="p-1.5 text-slate-400 hover:text-amber hover:bg-slate-800 rounded transition-colors" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(emp._id!)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-800 rounded transition-colors" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        )) : (
          !isFormOpen && (
            <div className="md:col-span-3 text-center py-12 text-slate-500 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
              <div className="flex justify-center mb-4"><Search size={32} className="opacity-50" /></div>
              <p>No team members found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EmployeeManager;