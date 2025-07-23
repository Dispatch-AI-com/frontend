// src/lib/axiosBaseQuery.ts
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { setAuthError } from '@/features/auth/authSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import { AuthErrorHandler } from '@/services/auth-error-handler';

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
  { status?: number; data?: string; type?: string }
> => {
  return async (
    { url, method = 'GET', data, params },
    { dispatch, getState },
  ) => {
    try {
      const token = (getState() as RootState).auth.token;

      const result = await axios({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError<ErrorResponse>;

      // 只处理确实是用户账户相关的认证错误
      if (
        // 排除登录相关的API，避免循环处理
        url !== '/auth/login' &&
        url !== '/auth/signup' &&
        url !== '/auth/google' &&
        url !== '/auth/logout'
      ) {
        // 只有真正的用户账户问题才显示认证模态框
        if (AuthErrorHandler.isUserAccountIssue(err)) {
          const errorType = AuthErrorHandler.identifyErrorType(err);
          dispatch(setAuthError(errorType) as unknown as AppDispatch);
        }
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data?.message ?? err.message,
          type:
            err.response?.status === 401 || err.response?.status === 403
              ? AuthErrorHandler.identifyErrorType(err)
              : undefined,
        },
      };
    }
  };
};
