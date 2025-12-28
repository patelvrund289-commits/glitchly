export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Animated logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 mb-4 tracking-wider animate-pulse">
            GLITCHLY
          </h1>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-ping delay-75"></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping delay-150"></div>
          </div>
        </div>

        {/* Hero content */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            🚀 Enter the Ultimate Gaming Universe
          </h2>
          <p className="text-lg text-white/80 mb-6">
            Join thousands of players in epic adventures. Get assigned legendary Game of Thrones characters and battle your way to glory!
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <p className="text-sm text-white/70">Epic Battles</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👑</div>
              <p className="text-sm text-white/70">Legendary Characters</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-white/70">High Scores</p>
            </div>
          </div>

          <p className="text-sm text-purple-300 font-semibold">
            ✨ New players get instant character assignment!
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/register"
              className="inline-block py-4 px-8 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-1 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-2xl animate-pulse"
            >
              🎮 Start Your Adventure
            </a>
            <a
              href="/games"
              className="inline-block py-4 px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-110 hover:-rotate-1 focus:outline-none focus:ring-4 focus:ring-green-400 shadow-2xl"
            >
              🎯 Play Games Now
            </a>
          </div>
          <div className="text-center">
            <a
              href="/auth/login"
              className="inline-block py-2 px-6 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            >
              Already a Warrior? Login Here
            </a>
          </div>
        </div>

        {/* Fun stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-300">1000+</div>
            <div className="text-xs text-white/60">Active Players</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-300">50+</div>
            <div className="text-xs text-white/60">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-300">24/7</div>
            <div className="text-xs text-white/60">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-300">Free</div>
            <div className="text-xs text-white/60">To Play</div>
          </div>
        </div>
      </div>
    </div>
  );
}
