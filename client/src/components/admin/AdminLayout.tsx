
import React, { useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Briefcase, LogOut, Shield, LineChart } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-midnight text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold text-white mb-8">Phezulu <span className="text-crimson">Admin</span></h1>
        
        <nav className="flex-1 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/employees" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Users size={18} /> Team
          </Link>
          <Link to="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Briefcase size={18} /> Services & Pillars
          </Link>
          <Link to="/admin/partners" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Shield size={18} /> Partners
          </Link>
          <Link to="/admin/insights" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <LineChart size={18} /> Insights/Blog
          </Link>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
