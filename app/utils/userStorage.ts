const STORAGE_KEY = 'gamingUsers';

export interface User {
  username: string;
  gender: 'male' | 'female';
  character: string;
  pin: string;
  gameStats: {
    gamesPlayed: number;
    wins: number;
    losses: number;
    highScore: number;
  };
}

export function saveUser(user: User): void {
  const users = getAllUsers();
  if (users[user.username]) {
    throw new Error('Username already exists');
  }
  users[user.username] = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getUser(username: string): User | null {
  const users = getAllUsers();
  return users[username] || null;
}

export function validateLogin(username: string, pin: string): boolean {
  const user = getUser(username);
  return user ? user.pin === pin : false;
}

function getAllUsers(): Record<string, User> {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}
