// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { redirect } from 'next/navigation';

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
  },
  unknown,
  { status?: number; data?: string }
> => {
  return async (
    { url, method = 'GET', data, params },
    { dispatch, getState },
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      const result = await axios({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;
      if (err.response?.status === 401) {
        dispatch(logout() as unknown as AppDispatch);
        redirect('/signin');
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
