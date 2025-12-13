
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400 text-sm uppercase">Total Employees</h3>
          <p className="text-3xl font-bold text-white mt-2">--</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h3 className="text-slate-400 text-sm uppercase">Active Services</h3>
          <p className="text-3xl font-bold text-white mt-2">3 Pillars</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
           <h3 className="text-slate-400 text-sm uppercase">System Status</h3>
           <p className="text-3xl font-bold text-green-500 mt-2">Operational</p>
        </div>
      </div>
      <p className="mt-8 text-slate-400">Select a category from the sidebar to manage content.</p>
    </div>
  );
};

export default Dashboard;
