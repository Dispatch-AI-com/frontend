/**
 * Get the API base URL from environment variables
 * Keeps the same behavior as before: uses NEXT_PUBLIC_API_BASE_URL with localhost fallback
 */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';
}
