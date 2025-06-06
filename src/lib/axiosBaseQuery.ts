// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation'; // Next.js App Router 的跳转

import { logout } from '@/features/auth/authSlice';
import api from '@/lib/api';
import type { AppDispatch } from '@/redux/store';

interface ApiResponse<T = unknown> {
  data: T;
}

interface ErrorResponse {
  message: string;
}

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: unknown;
      params?: unknown;
    },
    unknown,
    { status?: number; data?: string }
  > =>
  async ({ url, method = 'GET', data, params }, { dispatch }) => {
    try {
      const res = await api<ApiResponse>({ url, method, data, params });
      return { data: res.data };
    } catch (axiosErr) {
      const err = axiosErr as AxiosError<ErrorResponse>;
      // 如果后端返回 401，就自动清空 token + 跳转到登录
      if (err.response?.status === 401) {
        dispatch(logout() as unknown as AppDispatch);
        redirect('/signin');
      }
      const errorData = err.response?.data;
      return {
        error: {
          status: err.response?.status,
          data: errorData?.message ?? err.message,
        },
      };
    }
  };
