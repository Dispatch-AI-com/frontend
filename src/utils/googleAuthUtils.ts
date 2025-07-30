import type {
  useGetGoogleAuthURLMutation,
  useHandleGoogleAuthCallbackMutation,
  useRefreshGoogleTokenMutation,
} from '@/features/auth/authApi';

// google oauth config
export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
  redirectUri:
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ??
    'http://localhost:3000/auth/google/callback',
  scopes: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

// auth state management
export interface GoogleAuthState {
  isAuthorizing: boolean;
  authUrl?: string;
  state?: string;
  error?: string;
}

// token management
export interface GoogleTokenInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tokenType: string;
}

/**
 * check if token is expiring soon (refresh 5 minutes before expiration)
 */
export function isTokenExpiringSoon(expiresAt: Date): boolean {
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
  return expiresAt <= fiveMinutesFromNow;
}

/**
 * auto refresh google access token
 */
export async function refreshGoogleTokenIfNeeded(
  refreshGoogleToken: ReturnType<typeof useRefreshGoogleTokenMutation>[0],
  currentTokenInfo?: GoogleTokenInfo,
): Promise<string | null> {
  if (!currentTokenInfo) {
    return null;
  }

  // check if token is expiring soon
  if (isTokenExpiringSoon(currentTokenInfo.expiresAt)) {
    try {
      const result = await refreshGoogleToken().unwrap();
      if (result.success && result.accessToken) {
        return result.accessToken;
      }
    } catch {
      // Failed to refresh Google token
      return null;
    }
  }

  return currentTokenInfo.accessToken;
}

/**
 * initiate google auth
 */
export async function initiateGoogleAuth(
  getGoogleAuthURL: ReturnType<typeof useGetGoogleAuthURLMutation>[0],
  redirectUri?: string,
): Promise<{ authUrl: string; state: string }> {
  try {
    const result = await getGoogleAuthURL({ redirectUri }).unwrap();
    return {
      authUrl: result.authUrl,
      state: result.state,
    };
  } catch {
    throw new Error('Failed to get Google authorization URL');
  }
}

/**
 * google auth callback
 */
export async function handleGoogleAuthCallback(
  handleCallback: ReturnType<typeof useHandleGoogleAuthCallbackMutation>[0],
  code: string,
  state: string,
): Promise<{
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  calendarAccessGranted: boolean;
}> {
  try {
    const result = await handleCallback({ code, state }).unwrap();
    return {
      success: result.success,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: result.expiresIn,
      calendarAccessGranted: result.calendarAccessGranted,
    };
  } catch {
    return {
      success: false,
      calendarAccessGranted: false,
    };
  }
}

/**
 * check if there is a Google OAuth callback in the URL parameters
 */
export function checkForGoogleAuthCallback(): {
  code?: string;
  state?: string;
  error?: string;
} {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code') ?? undefined;
  const state = urlParams.get('state') ?? undefined;
  const error = urlParams.get('error') ?? undefined;

  return { code, state, error };
}

/**
 * build google oauth auth url
 */
export function buildGoogleAuthURL(redirectUri?: string): string {
  const params = new URLSearchParams({
    client_id: GOOGLE_OAUTH_CONFIG.clientId,
    redirect_uri: redirectUri ?? GOOGLE_OAUTH_CONFIG.redirectUri,
    response_type: 'code',
    scope: GOOGLE_OAUTH_CONFIG.scopes.join(' '),
    access_type: 'offline', // important: get refresh_token
    prompt: 'consent',
    state: generateRandomState(),
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

/**
 * generate random state parameter for CSRF protection
 */
export function generateRandomState(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * validate google email format
 */
export function isValidGoogleEmail(email: string): boolean {
  const googleDomains = ['@gmail.com', '@googlemail.com'];
  return googleDomains.some(domain => email.toLowerCase().endsWith(domain));
}

/**
 * get google calendar api base url
 */
export const GOOGLE_CALENDAR_API_BASE =
  'https://www.googleapis.com/calendar/v3';

/**
 * build google calendar api request headers
 */
export function buildGoogleCalendarHeaders(
  accessToken: string,
): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}
