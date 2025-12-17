import React, { useEffect, useState } from 'react';
import {
  fetchInsights,
  fetchPartners,
  fetchPillars,
  fetchPhotos,
  fetchEmployees
} from '../../lib/api';
import { LayoutDashboard, Users, Briefcase, Shield, Image as ImageIcon, LineChart, Activity, FileText, Video, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    insights: { total: 0, byCategory: {} as Record<string, number> },
    services: { total: 0, byPillar: [] as { name: string; count: number }[] },
    partners: 0,
    photos: 0,
    employees: 0
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const loadStats = async () => {
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
        ...insights.slice(0, 3).map(i => ({ type: 'Insight', action: 'Published', name: i.title, date: i.date })),
        ...photos.slice(0, 2).map(p => ({ type: 'Photo', action: 'Uploaded', name: p.title, date: 'Recent' })),
      ].slice(0, 6);

      setRecentActivity(activities);
    };

    loadStats();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <LayoutDashboard className="text-crimson" /> Dashboard Overview
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <LineChart size={24} />
            </div>
            <div>
              <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Insights</h3>
              <p className="text-3xl font-bold text-white mt-1">{stats.insights.total}</p>
            </div>
          </div>
          <div className="flex gap-2 text-[10px] font-mono uppercase text-slate-500 mt-2 pt-2 border-t border-slate-800">
            <span className="flex items-center gap-1"><FileText size={10} className="text-blue-400" /> {stats.insights.byCategory['Blog'] || 0} Blog</span>
            <span className="flex items-center gap-1"><Video size={10} className="text-amber" /> {stats.insights.byCategory['Webinar'] || 0} Webinar</span>
            <span className="flex items-center gap-1"><AlertTriangle size={10} className="text-crimson" /> {stats.insights.byCategory['Threat Report'] || 0} Report</span>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-amber/10 rounded-lg text-amber">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Services</h3>
            <p className="text-3xl font-bold text-white mt-1">{stats.services.total}</p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Partners</h3>
            <p className="text-3xl font-bold text-white mt-1">{stats.partners}</p>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
            <ImageIcon size={24} />
          </div>
          <div>
            <h3 className="text-slate-400 text-xs uppercase font-bold tracking-wider">Photos</h3>
            <p className="text-3xl font-bold text-white mt-1">{stats.photos}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Services Breakdown */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
            <Activity size={16} /> Service Distribution
          </h3>
          <div className="space-y-4">
            {stats.services.byPillar.map((p, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1 text-slate-300">
                  <span>{p.name}</span>
                  <span className="font-bold text-white">{p.count}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${idx === 0 ? 'bg-crimson' : idx === 1 ? 'bg-amber' : 'bg-rose-500'}`}
                    style={{ width: `${(p.count / stats.services.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-xs">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivity.length > 0 ? recentActivity.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-slate-800 last:border-0">
                <div className="w-2 h-2 rounded-full bg-crimson mt-2" />
                <div>
                  <p className="text-sm text-white font-medium">{act.action}: <span className="text-slate-400">{act.name}</span></p>
                  <p className="text-xs text-slate-500 mt-1">{act.type} • {act.date}</p>
                </div>
              </div>
            )) : (
              <p className="text-slate-500 text-sm">No recent interactions logged.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
