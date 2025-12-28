'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import { getCurrentUser } from '../utils/authGuard';
import { getUser } from '../utils/userStorage';
import { User } from '../utils/userStorage';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Access localStorage only after component mounts on the client
    const currentUsername = getCurrentUser();
    const userData = currentUsername ? getUser(currentUsername) : null;
    setUser(userData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-white">Loading profile...</div>
        </div>
      </AuthGuard>
    );
  }

  if (!user) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-white">User not found. Please log in again.</div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

          {/* Player Profile */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Player Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/80">Username:</p>
                <p className="text-xl font-semibold text-purple-300">{user.username}</p>
              </div>
              <div>
                <p className="text-white/80">Gender:</p>
                <p className="text-xl font-semibold text-purple-300 capitalize">{user.gender}</p>
              </div>
              <div>
                <p className="text-white/80">Character:</p>
                <p className="text-xl font-semibold text-purple-300">{user.character}</p>
              </div>
              <div>
                <p className="text-white/80">PIN:</p>
                <p className="text-xl font-mono font-semibold text-pink-300">{user.pin}</p>
              </div>
            </div>
          </div>

          {/* Game Statistics */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Game Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-300">{user.gameStats.gamesPlayed || 0}</p>
                <p className="text-white/80">Games Played</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-300">{user.gameStats.wins || 0}</p>
                <p className="text-white/80">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-300">{user.gameStats.losses || 0}</p>
                <p className="text-white/80">Losses</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-300">{user.gameStats.highScore || 0}</p>
                <p className="text-white/80">High Score</p>
              </div>
            </div>
          </div>

          {/* Game Interface Placeholder */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Game Interface</h2>
            <div className="text-center">
              <p className="text-white/80 mb-6">
                Your gaming adventure awaits! The main game interface will be implemented here.
              </p>
              <button
                onClick={() => alert('Game interface coming soon!')}
                className="py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
