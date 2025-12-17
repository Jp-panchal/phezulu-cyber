
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
    }
  };

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl border border-slate-800 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Access</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-slate-800 border border-slate-700 rounded p-3 text-white"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <Button className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
