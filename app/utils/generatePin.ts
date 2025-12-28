/**
 * Generates a random 4-digit numeric PIN.
 * @returns A string representing a 4-digit PIN (e.g., "1234").
 */
export function generatePin(): string {
  const pin = Math.floor(1000 + Math.random() * 9000);
  return pin.toString();
}
