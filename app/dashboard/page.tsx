import AuthGuard from '../components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8">
            <p className="text-white/80">
              Welcome to your protected dashboard! This page is only accessible to authenticated users.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
