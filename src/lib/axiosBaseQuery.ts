// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { logout, updateCSRFToken } from '@/features/auth/authSlice';
import type { RootState } from '@/redux/store';
import { getApiBaseUrl } from '@/utils/api-config';

interface ErrorResponse {
  message: string;
}

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
  },
  unknown,
  { status?: number; data?: string }
> => {
  return async (
    { url, method = 'GET', data, params, headers },
    { dispatch, getState },
  ) => {
    const apiBaseUrl = getApiBaseUrl();

    try {
      let { csrfToken } = (getState() as RootState).auth;
      const { isAuthenticated } = (getState() as RootState).auth;

      // If authenticated but no CSRF token, try to get it
      if (
        isAuthenticated &&
        !csrfToken &&
        ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
          method?.toUpperCase() ?? 'GET',
        )
      ) {
        try {
          const csrfResponse = await axios({
            baseURL: apiBaseUrl,
            url: '/auth/csrf-token',
            method: 'GET',
            withCredentials: true,
          });

          csrfToken = (csrfResponse.data as { csrfToken: string }).csrfToken;
          if (csrfToken) {
            dispatch({ type: 'auth/updateCSRFToken', payload: csrfToken });
          }
        } catch (csrfError) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch CSRF token:', csrfError);
        }
      }

      const result = await axios({
        baseURL: apiBaseUrl,
        url,
        method,
        data,
        params,
        headers: {
          'Content-Type': 'application/json',
          // Add CSRF token for state-changing requests
          ...(csrfToken &&
            ['POST', 'PUT', 'DELETE', 'PATCH'].includes(
              method?.toUpperCase() || 'GET',
            ) && {
              'x-csrf-token': csrfToken,
            }),
          ...headers,
        },
        // Enable credentials to send httpOnly cookies
        withCredentials: true,
      });

      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;

      // Handle CSRF token expiration (403 Forbidden)
      if (
        err.response?.status === 403 &&
        err.response?.data?.message?.includes('CSRF')
      ) {
        try {
          // Try to refresh CSRF token using current token
          const { csrfToken: currentToken } = (getState() as RootState).auth;

          const refreshResponse = await axios({
            baseURL: apiBaseUrl,
            url: '/auth/refresh-csrf',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(currentToken && { 'x-csrf-token': currentToken }),
            },
            withCredentials: true,
          });

          // Get the new token from refresh response
          const newCsrfToken = (refreshResponse.data as { csrfToken: string })
            .csrfToken;

          if (newCsrfToken) {
            // Update Redux state with new CSRF token
            dispatch(updateCSRFToken(newCsrfToken));

            // Retry the original request with new CSRF token
            const retryResult = await axios({
              baseURL: apiBaseUrl,
              url,
              method,
              data,
              params,
              headers: {
                'Content-Type': 'application/json',
                'x-csrf-token': newCsrfToken,
                ...headers,
              },
              withCredentials: true,
            });

            return { data: retryResult.data };
          }
        } catch (refreshError) {
          // If refresh fails, logout user
          // eslint-disable-next-line no-console
          console.error('CSRF token refresh failed:', refreshError);
          dispatch(logout() as unknown as never);
          return {
            error: {
              status: 403,
              data: 'CSRF token expired and refresh failed. Please log in again.',
            },
          };
        }
      }

      // Handle authentication errors (401 Unauthorized)
      if (
        err.response?.status === 401 &&
        url !== '/auth/signup' &&
        url !== '/auth/login'
      ) {
        dispatch(logout() as unknown as never);
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data?.message ?? err.message,
        },
      };
    }
  };
};
