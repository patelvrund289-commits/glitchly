'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/authGuard';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side authentication guard component
 * Redirects to login page if user is not authenticated
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsChecking(false);

      if (!authenticated) {
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  // Don't render children until authentication check is complete
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuth) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
