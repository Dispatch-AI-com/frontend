// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { logout } from '@/features/auth/authSlice';
import type { AppDispatch, RootState } from '@/redux/store';

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
              'X-CSRF-Token': csrfToken,
            }),
          ...headers,
        },
        // Enable credentials to send httpOnly cookies
        withCredentials: true,
      });

      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      if (
        err.response?.status === 401 &&
        url !== '/auth/signup' &&
        url !== '/auth/login'
      ) {
        dispatch(logout() as unknown as AppDispatch);
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data.message ?? err.message,
        },
      };
    }
  };
};
