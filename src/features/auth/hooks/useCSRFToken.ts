import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  useLazyGetCSRFTokenQuery,
  useRefreshCSRFTokenMutation,
} from '../authApi';
import { updateCSRFToken } from '../authSlice';

/**
 * Hook for managing CSRF token lifecycle
 * Handles token refresh, validation, and automatic renewal
 */
export const useCSRFToken = () => {
  const dispatch = useAppDispatch();
  const { csrfToken, isAuthenticated } = useAppSelector(state => state.auth);

  const [refreshCSRF] = useRefreshCSRFTokenMutation();
  const [getCSRFToken] = useLazyGetCSRFTokenQuery();

  /**
   * Refresh CSRF token manually
   */
  const refreshToken = useCallback(async () => {
    if (!isAuthenticated) {
      // eslint-disable-next-line no-console
      console.warn('Cannot refresh CSRF token: user not authenticated');
      return false;
    }

    try {
      await refreshCSRF().unwrap();
      // After refresh, get the new token
      const result = await getCSRFToken().unwrap();
      dispatch(updateCSRFToken(result.csrfToken));
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to refresh CSRF token:', error);
      return false;
    }
  }, [isAuthenticated, refreshCSRF, getCSRFToken, dispatch]);

  /**
   * Get current CSRF token, refresh if needed
   */
  const getToken = useCallback(async () => {
    if (!isAuthenticated) {
      return null;
    }

    try {
      const result = await getCSRFToken().unwrap();
      dispatch(updateCSRFToken(result.csrfToken));
      return result.csrfToken;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to get CSRF token:', error);
      return null;
    }
  }, [isAuthenticated, getCSRFToken, dispatch]);

  /**
   * Validate if current CSRF token is still valid
   * This is a client-side check based on token format
   */
  const isTokenValid = useCallback(() => {
    if (!csrfToken) {
      return false;
    }

    // Basic validation: check if token has the expected format
    const parts = csrfToken.split('.');
    if (parts.length !== 3) {
      return false;
    }

    // Check if token is not too old (client-side estimation)
    try {
      const timestamp = parseInt(parts[0], 10);
      const now = Date.now();

      // If token is older than 50 minutes, consider it close to expiration
      return now - timestamp < 50 * 60 * 1000;
    } catch {
      return false;
    }
  }, [csrfToken]);

  /**
   * Proactive token refresh before expiration
   */
  useEffect(() => {
    if (!isAuthenticated || !csrfToken) {
      return;
    }

    // Check if token is close to expiration (50 minutes)
    if (!isTokenValid()) {
      // eslint-disable-next-line no-console
      console.log('CSRF token is close to expiration, refreshing...');
      void refreshToken();
    }
  }, [isAuthenticated, csrfToken, isTokenValid, refreshToken]);

  return {
    csrfToken,
    isTokenValid,
    refreshToken,
    getToken,
  };
};
