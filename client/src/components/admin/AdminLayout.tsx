import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  LogOut,
  Shield,
  LineChart,
  Image as ImageIcon,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login', { replace: true });
    } else {
      // Optionally: validate token with server here for stronger security
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-crimson border-slate-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect already triggered)
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/insights', label: 'Insights', icon: LineChart },
    { path: '/admin/services', label: 'Services', icon: Briefcase },
    { path: '/admin/employees', label: 'Team Members', icon: Users },
    { path: '/admin/partners', label: 'Partners', icon: Shield },
    { path: '/admin/photos', label: 'Media Library', icon: ImageIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
          <Shield className="text-crimson w-6 h-6 mr-3" />
          <h1 className="text-lg font-bold text-white tracking-wide">
            PHEZULU <span className="text-crimson">CYBER</span>
          </h1>
          <button
            className="ml-auto lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive
                    ? 'bg-crimson/10 text-crimson font-medium border-l-2 border-crimson'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border-l-2 border-transparent'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-crimson' : 'text-slate-500 group-hover:text-white transition-colors'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile / Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/30">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-semibold border border-slate-600">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Administrator</p>
              <p className="text-xs text-slate-500 truncate">admin@phezulu.co.za</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-slate-950 relative">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-8 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb-ish or Page Title */}
            <h2 className="text-sm font-medium text-slate-300 lg:block hidden">
              <span className="text-slate-500">Console</span> <span className="mx-2">/</span>
              <span className="text-white capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar - hidden on small mobile */}
            <div className="hidden sm:flex items-center relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-slate-950 border border-slate-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-slate-600 w-48 transition-all focus:w-64"
              />
            </div>

            <div className="h-6 w-px bg-slate-800 mx-1"></div>

            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson rounded-full border border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div >
  );
};

export default AdminLayout;
