/**
 * Get the API base URL from environment variables
 */
export function getApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'http://localhost:4000/api'
  );
}
