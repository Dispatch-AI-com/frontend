/**
 * Get the API base URL from environment variables
 * In production, environment variables must be set
 * In development, falls back to localhost for convenience
 */
export function getApiBaseUrl(): string {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiBaseUrl) {
    return apiBaseUrl;
  }

  // Only allow localhost fallback in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      '⚠️  API base URL not set. Using localhost fallback for development.',
    );
    return 'http://localhost:4000/api';
  }

  // In production, throw error if API URL is not configured
  throw new Error(
    'API base URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable.',
  );
}
