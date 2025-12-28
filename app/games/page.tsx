'use client';

import Link from 'next/link';

export default function GamesPage() {
  const games = [
    {
      id: 'tic-tac-toe',
      name: 'Tic Tac Toe',
      description: 'Classic strategy game with unbeatable AI and local multiplayer',
      icon: '❌⭕',
      path: '/games/tic-tac-toe'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
            🎮 GAMES HUB
          </h1>
          <p className="text-white/70 text-xl">
            Choose your battle and enter the arena
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-6xl mb-6">{game.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-4">{game.name}</h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  {game.description}
                </p>
                <Link
                  href={game.path}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  PLAY NOW
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
