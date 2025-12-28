import { getUser } from './userStorage';

/**
 * Checks if a user is currently authenticated
 * @returns boolean indicating if user is logged in
 */
export function isAuthenticated(): boolean {
  // Check if there's a logged-in user in localStorage
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (!loggedInUser) return false;

  // Verify the user still exists in our user database
  const user = getUser(loggedInUser);
  return !!user;
}

/**
 * Gets the currently logged-in username
 * @returns username or null if not authenticated
 */
export function getCurrentUser(): string | null {
  return localStorage.getItem('loggedInUser');
}

/**
 * Logs in a user by storing their username
 * @param username - the username to log in
 */
export function loginUser(username: string): void {
  localStorage.setItem('loggedInUser', username);
}

/**
 * Logs out the current user
 */
export function logoutUser(): void {
  localStorage.removeItem('loggedInUser');
}
