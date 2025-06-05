// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import api from '@/lib/api';

interface ApiResponse<T = unknown> {
  data: T;
}

interface ErrorResponse {
  message: string;
}

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: unknown;
    params?: unknown;
  }> =>
  async ({ url, method = 'GET', data, params }) => {
    try {
      const res = await api<ApiResponse>({ url, method, data, params });
      return { data: res.data };
    } catch (axiosErr) {
      const err = axiosErr as AxiosError<ErrorResponse>;
      const errorData = err.response?.data;
      return {
        error: {
          status: err.response?.status,
          data: errorData?.message ?? err.message,
        },
      };
    }
  };
