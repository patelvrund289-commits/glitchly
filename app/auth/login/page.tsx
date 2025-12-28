'use client';

import { useState } from 'react';
import { getUser, validateLogin } from '../../utils/userStorage';
import { loginUser } from '../../utils/authGuard';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = getUser(username);
    if (!user) {
      setError('User not found');
      return;
    }

    if (!validateLogin(username, pin)) {
      setError('Incorrect PIN');
      return;
    }

    // Success - log in the user and redirect to dashboard
    loginUser(username);
    router.push('/dashboard');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Login Successful!</h2>
            <p className="text-white/80 mb-6">Welcome back, {username}!</p>
            <p className="text-white/80 text-sm mb-6">
              Your gaming adventure awaits. Ready to start playing?
            </p>
            <button
              onClick={() => {
                // TODO: Navigate to main game interface
                alert('Game interface coming soon!');
              }}
              className="py-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
            LOGIN
          </h1>
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
                4-Digit PIN
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                placeholder="Enter your PIN"
                maxLength={4}
                pattern="[0-9]{4}"
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm text-center">
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
        </div>
      </div>
    </div>
  );
}
