import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate a slight delay for realism/polish if API is too fast, or just hit it.
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-crimson to-transparent opacity-50" />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl relative z-10 overflow-hidden">
        {/* Decorative Header Bar */}
        <div className="h-1.5 bg-gradient-to-r from-rose-600 via-crimson to-rose-600 w-full" />
        
        <div className="p-8 sm:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 border border-slate-700 shadow-inner mb-6">
              <ShieldCheck className="text-crimson w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Admin Console</h2>
            <p className="text-slate-400 text-sm mt-2">Phezulu Cybersecurity Solutions</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-fade-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-slate-500 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-crimson/20 focus:border-crimson block w-full pl-10 p-3 transition-all placeholder:text-slate-600"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500 group-focus-within:text-white transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-crimson/20 focus:border-crimson block w-full pl-10 p-3 transition-all placeholder:text-slate-600"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-crimson hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-crimson/20 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Secure Login'}
            </button>
          </form>
        </div>
        
        <div className="px-8 py-4 bg-slate-950/50 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">Restricted Access only • Local Server Environment</p>
        </div>
      </div>
      
      {/* Footer Copyright */}
      <div className="absolute bottom-6 text-center text-slate-600 text-xs text-opacity-40">
        &copy; {new Date().getFullYear()} Phezulu Cyber. All Systems Operational.
      </div>
    </div>
  );
};

export default Login;
