'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllUsersForAdmin, removeUser, User } from '../utils/userStorage';

export default function AdminPage() {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== 'admin') {
      router.push('/auth/login');
      return;
    }

    // Load all users
    const allUsers = getAllUsersForAdmin();
    setUsers(allUsers);
    setIsLoading(false);
  }, [router]);

  const handleRemoveUser = (username: string) => {
    if (confirm(`Are you sure you want to remove user "${username}"?`)) {
      removeUser(username);
      const updatedUsers = getAllUsersForAdmin();
      setUsers(updatedUsers);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⚔️</div>
          <div className="text-white text-xl font-bold">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-wide">
              🛡️ ADMIN PANEL
            </h1>
            <p className="text-white/70">Master control of the realm</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-200 hover:scale-105"
          >
            🚪 Logout
          </button>
        </div>

        {/* Stats */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-3xl font-bold text-white mb-4">Realm Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-500/30">
                <div className="text-3xl mb-2">👥</div>
                <p className="text-3xl font-bold text-purple-300">{Object.keys(users).length}</p>
                <p className="text-white/80">Total Players</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl border border-green-500/30">
                <div className="text-3xl mb-2">♂️</div>
                <p className="text-3xl font-bold text-green-300">
                  {Object.values(users).filter(u => u.gender === 'male').length}
                </p>
                <p className="text-white/80">Male Warriors</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl border border-pink-500/30">
                <div className="text-3xl mb-2">♀️</div>
                <p className="text-3xl font-bold text-pink-300">
                  {Object.values(users).filter(u => u.gender === 'female').length}
                </p>
                <p className="text-white/80">Female Warriors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Player List */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center mb-6">
            <div className="text-4xl mr-4">📋</div>
            <h2 className="text-3xl font-bold text-white">Player Registry</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Username</th>
                  <th className="text-left py-3 px-4">Gender</th>
                  <th className="text-left py-3 px-4">Character</th>
                  <th className="text-left py-3 px-4">PIN</th>
                  <th className="text-left py-3 px-4">Games Played</th>
                  <th className="text-left py-3 px-4">Wins</th>
                  <th className="text-left py-3 px-4">Losses</th>
                  <th className="text-left py-3 px-4">High Score</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(users).map(([username, user]) => (
                  <tr key={username} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 font-semibold">{username}</td>
                    <td className="py-3 px-4 capitalize">{user.gender}</td>
                    <td className="py-3 px-4">{user.character}</td>
                    <td className="py-3 px-4 font-mono">{user.pin}</td>
                    <td className="py-3 px-4">{user.gameStats.gamesPlayed}</td>
                    <td className="py-3 px-4 text-green-300">{user.gameStats.wins}</td>
                    <td className="py-3 px-4 text-red-300">{user.gameStats.losses}</td>
                    <td className="py-3 px-4 text-yellow-300">{user.gameStats.highScore}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRemoveUser(username)}
                        className="px-3 py-1 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 text-red-300 rounded text-sm transition-all duration-200 hover:scale-105"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {Object.keys(users).length === 0 && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🏰</div>
              <p className="text-white/70">No players registered yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
