'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../../utils/authGuard';
import { validateLogin, isMasterLogin } from '../../utils/userStorage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !pin) {
      setError('Please fill in all fields');
      return;
    }

    // Client-side validation for PIN
    if (!/^\d{4}$/.test(pin)) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    const success = loginUser(username, pin);
    if (success) {
      router.push('/dashboard');
    } else if (isMasterLogin(username, pin)) {
      // Master login
      localStorage.setItem('currentUser', 'admin');
      router.push('/admin');
    } else {
      setError('Invalid username or PIN');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <div className="mb-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-white/70 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">🔑</div>
            <h1 className="text-3xl font-bold text-white tracking-wide">
              LOGIN TO YOUR REALM
            </h1>
            <p className="text-white/70 mt-2">Enter the gates of glory!</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-white/80 mb-2">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your 4-digit PIN"
                maxLength={4}
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              New to Glitchly?{' '}
              <a href="/auth/register" className="text-purple-300 hover:text-purple-200 underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
