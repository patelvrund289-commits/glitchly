'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserStats, getMatchHistory } from '@/app/actions/playerActions';

interface UserStats {
  userId: string;
  username: string;
  points: number;
  wins: number;
  losses: number;
  draws: number;
}

interface MatchHistory {
  id: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  date: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [history, setHistory] = useState<MatchHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userStats, matchHistory] = await Promise.all([
          getUserStats(),
          getMatchHistory()
        ]);
        setStats(userStats);
        setHistory(matchHistory);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white">Please log in to view your dashboard.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            PLAYER DASHBOARD
          </h1>
          <p className="text-xl text-white/70">Welcome back, {stats.username}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-white">{stats.points}</div>
            <div className="text-white/70">Points</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{stats.wins}</div>
            <div className="text-white/70">Wins</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-400">{stats.losses}</div>
            <div className="text-white/70">Losses</div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-400">{stats.draws}</div>
            <div className="text-white/70">Draws</div>
          </div>
        </div>

        {/* Match History */}
        <div className="bg-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Match History</h2>
          {history.length === 0 ? (
            <p className="text-white/70">No matches played yet.</p>
          ) : (
            <div className="space-y-2">
              {history.map((match) => (
                <div key={match.id} className="flex justify-between items-center bg-white/5 rounded p-3">
                  <div className="text-white">
                    vs {match.opponent}
                  </div>
                  <div className={`font-semibold ${
                    match.result === 'win' ? 'text-green-400' :
                    match.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {match.result.toUpperCase()}
                  </div>
                  <div className="text-white/70 text-sm">
                    {new Date(match.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Games */}
        <div className="text-center mt-8">
          <Link
            href="/games"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Games Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
