import React, { useState } from 'react';
import { Trophy, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@nairobi-fc.com', role: 'Admin', password: 'password123' },
    { email: 'coach@nairobi-fc.com', role: 'Coach', password: 'password123' },
    { email: 'medical@nairobi-fc.com', role: 'Medical Staff', password: 'password123' },
    { email: 'parent@example.com', role: 'Parent', password: 'password123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            ProAcademy360
          </h2>
          <p className="mt-2 text-sm text-green-100">
            Football Academy Management System
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 block w-full border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 py-3 px-4"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="pl-10 pr-10 block w-full border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 py-3 px-4"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="mt-8">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts:</h3>
              <div className="space-y-2">
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                    }}
                    className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border transition-colors"
                  >
                    <span className="font-medium">{account.role}</span>
                    <br />
                    <span className="text-gray-600 text-xs">{account.email}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Password for all demo accounts: <code className="bg-gray-100 px-1 rounded">password123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}