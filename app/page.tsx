export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
          <h1 className="text-4xl font-bold text-white mb-8 tracking-wide">
            GLITCHLY
          </h1>
          <p className="text-white/80 mb-8">
            Welcome to the ultimate gaming experience. Register or login to start your adventure.
          </p>
          <div className="space-y-4">
            <a
              href="/auth/register"
              className="block w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Register
            </a>
            <a
              href="/auth/login"
              className="block w-full py-3 px-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
