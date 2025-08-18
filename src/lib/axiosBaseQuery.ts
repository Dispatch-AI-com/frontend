// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { logout } from '@/features/auth/authSlice';
import type { RootState } from '@/redux/store';

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
    try {
      const { csrfToken } = (getState() as RootState).auth;

      const result = await axios({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
          // Try to refresh CSRF token
          await axios({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            url: '/auth/refresh-csrf',
            method: 'POST',
            withCredentials: true,
          });

          // After refresh, the new CSRF token is automatically set in httpOnly cookie
          // We can retry the original request - the browser will send the new token
          const retryResult = await axios({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            url,
            method,
            data,
            params,
            headers: {
              'Content-Type': 'application/json',
              // Don't set x-csrf-token header - let the browser send it from cookie
              ...headers,
            },
            withCredentials: true,
          });

          return { data: retryResult.data };
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
