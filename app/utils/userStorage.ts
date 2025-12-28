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
  points: number;
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

export function updateUserStats(username: string, stats: Partial<User['gameStats']>): void {
  const users = getAllUsers();
  if (users[username]) {
    users[username].gameStats = { ...users[username].gameStats, ...stats };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
}

export function getAllUsersForAdmin(): Record<string, User> {
  return getAllUsers();
}

export function removeUser(username: string): void {
  const users = getAllUsers();
  if (users[username]) {
    delete users[username];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }
}

export function isMasterLogin(username: string, pin: string): boolean {
  return username === 'admin' && pin === '1234';
}

function getAllUsers(): Record<string, User> {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
}
