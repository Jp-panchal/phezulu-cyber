import React, { useEffect, useState } from 'react';
import {
  fetchInsights,
  fetchPartners,
  fetchPillars,
  fetchPhotos,
  fetchEmployees
} from '../../lib/api';
import {
  Briefcase,
  Shield,
  Image as ImageIcon,
  LineChart,
  Activity,
  FileText,
  ArrowUpRight,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    insights: { total: 0, byCategory: {} as Record<string, number> },
    services: { total: 0, byPillar: [] as { name: string; count: number }[] },
    partners: 0,
    photos: 0,
    employees: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [insights, partners, pillars, photos, employees] = await Promise.all([
          fetchInsights(),
          fetchPartners(),
          fetchPillars(),
          fetchPhotos(),
          fetchEmployees()
        ]);

        const serviceStats = pillars.reduce((acc, pillar) => {
          acc.total += pillar.details.length;
          acc.byPillar.push({ name: pillar.title, count: pillar.details.length });
          return acc;
        }, { total: 0, byPillar: [] as { name: string; count: number }[] });

        const insightBreakdown = insights.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setStats({
          insights: { total: insights.length, byCategory: insightBreakdown },
          services: serviceStats,
          partners: partners.length,
          photos: photos.length,
          employees: employees.length
        });

        // Mock Activity Log based on latest items
        const activities = [
          ...insights.slice(0, 3).map(i => ({ type: 'Insight', action: 'Published', name: i.title, date: 'Just now', icon: FileText, color: 'text-blue-400' })),
          ...photos.slice(0, 2).map(p => ({ type: 'Photo', action: 'Uploaded', name: p.title || 'Untitled Image', date: '2h ago', icon: ImageIcon, color: 'text-purple-400' })),
        ].slice(0, 5);

        setRecentActivity(activities);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 animate-pulse">Initializing Dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Overview</h2>
          <p className="text-slate-400 text-sm mt-1">Welcome back, Administrator. Here is what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM OPERATIONAL
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Insight Card with Sparkline visual */}
        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-blue-500/10" />

          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 group-hover:scale-110 transition-transform">
              <LineChart size={22} />
            </div>
            <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full gap-1">
              <ArrowUpRight size={10} /> +12%
            </span>
          </div>

          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Insights</h3>
            <p className="text-3xl font-bold text-white mt-1 tabular-nums">{stats.insights.total}</p>
          </div>

          <div className="flex gap-3 text-[10px] font-mono text-slate-500 mt-4 pt-3 border-t border-slate-800/50">
            <span className="hover:text-slate-300 transition-colors cursor-help" title="Blogs">{stats.insights.byCategory['Blog'] || 0} Blogs</span>
            <span className="hover:text-slate-300 transition-colors cursor-help" title="Webinars">{stats.insights.byCategory['Webinar'] || 0} Webinars</span>
          </div>
        </div>

        {/* Services Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-amber/10" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber/10 rounded-lg text-amber group-hover:scale-110 transition-transform">
              <Briefcase size={22} />
            </div>
          </div>
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Active Services</h3>
            <p className="text-3xl font-bold text-white mt-1 tabular-nums">{stats.services.total}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/50">
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden flex">
              <div className="bg-amber w-[60%] h-full" />
              <div className="bg-amber/30 w-[40%] h-full" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 text-right">Capacity Usage</p>
          </div>
        </div>

        {/* Partners Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-emerald-500/10" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500 group-hover:scale-110 transition-transform">
              <Shield size={22} />
            </div>
            <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              Stable
            </span>
          </div>
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Trusted Partners</h3>
            <p className="text-3xl font-bold text-white mt-1 tabular-nums">{stats.partners}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/50 text-[10px] text-slate-500 flex justify-between">
            <span>Verified</span>
            <span className="text-white font-medium">100%</span>
          </div>
        </div>

        {/* Photos Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-purple-500/10" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500 group-hover:scale-110 transition-transform">
              <ImageIcon size={22} />
            </div>
          </div>
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Media Assets</h3>
            <p className="text-3xl font-bold text-white mt-1 tabular-nums">{stats.photos}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/50 text-[10px] text-slate-500">
            Updated recently
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Services Breakdown */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur rounded-xl border border-slate-800 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity size={18} className="text-crimson" /> Service Distribution
            </h3>
            <button className="text-xs text-slate-500 hover:text-white transition-colors">View Report</button>
          </div>

          <div className="flex-1 space-y-5">
            {stats.services.byPillar.map((p, idx) => {
              const percentage = Math.round((p.count / (stats.services.total || 1)) * 100);
              return (
                <div key={idx} className="group">
                  <div className="flex justify-between text-sm mb-2 text-slate-300 group-hover:text-white transition-colors">
                    <span className="font-medium">{p.name}</span>
                    <span className="font-bold">{p.count} <span className="text-slate-500 text-xs font-normal">({percentage}%)</span></span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${idx === 0 ? 'bg-gradient-to-r from-crimson to-rose-600' : idx === 1 ? 'bg-gradient-to-r from-amber to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}

            {stats.services.total === 0 && (
              <div className="text-center py-10 text-slate-600 text-sm italic">No service data available.</div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-slate-900/50 backdrop-blur rounded-xl border border-slate-800 p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Logs</h3>
            <Clock size={16} className="text-slate-500" />
          </div>

          <div className="flex-1 overflow-y-auto max-h-[300px] p-2 space-y-1">
            {recentActivity.length > 0 ? recentActivity.map((act, idx) => (
              <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors group cursor-default">
                <div className={`mt-1 p-2 rounded-full bg-slate-800 border border-slate-700 ${act.color}`}>
                  {act.icon ? <act.icon size={14} /> : <Activity size={14} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium flex items-center gap-2">
                    {act.action}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{act.name}</p>
                </div>
                <span className="text-[10px] uppercase font-mono text-slate-600 whitespace-nowrap pt-1">{act.date}</span>
              </div>
            )) : (
              <div className="p-8 text-center">
                <p className="text-slate-500 text-sm">No recent interactions.</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-900/80 border-t border-slate-800 text-center">
            <button className="text-xs text-crimson hover:text-white transition-colors font-medium">View Full Audit Log</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
