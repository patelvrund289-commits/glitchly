'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { assignRandomCharacter } from '../../utils/assignCharacter';
import { generatePin } from '../../utils/generatePin';
import { User, saveUser } from '../../utils/userStorage';
import { loginUser } from '../../utils/authGuard';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedCharacter, setAssignedCharacter] = useState('');
  const [assignedPin, setAssignedPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !gender) return;

    try {
      // Assign random character based on gender
      const randomCharacter = assignRandomCharacter(gender as 'male' | 'female');

      // Generate 4-digit PIN
      const pin = generatePin();

      // Create user object
      const user: User = {
        username,
        gender: gender as 'male' | 'female',
        character: randomCharacter,
        pin,
        gameStats: {
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          highScore: 0
        }
      };

      // Save user
      saveUser(user);

      // Log in the user
      loginUser(username);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
              REGISTER
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
                  placeholder="Enter unique username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Gender
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2 text-purple-400 focus:ring-purple-400"
                    />
                    <span className="text-white">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2 text-purple-400 focus:ring-purple-400"
                    />
                    <span className="text-white">Female</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Register
              </button>
            </form>
          </div>
        ) : (
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Registration Complete!</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white/80">Assigned Character:</p>
                <p className="text-xl font-semibold text-purple-300">{assignedCharacter}</p>
              </div>
              <div>
                <p className="text-white/80">Your PIN:</p>
                <p className="text-2xl font-mono font-bold text-pink-300 tracking-wider">{assignedPin}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <p className="text-white/80 text-sm">
                Please remember your assigned character and PIN for future login.
              </p>
              <a
                href="/auth/login"
                className="block w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 text-center"
              >
                Go to Login
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
