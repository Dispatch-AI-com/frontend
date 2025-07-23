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

      // 智能错误识别和处理 - 401/403/404都可能是认证问题
      if (
        err.response?.status === 401 ||
        err.response?.status === 403 ||
        err.response?.status === 404
      ) {
        // 排除登录相关的API，避免循环处理
        if (
          url !== '/auth/login' &&
          url !== '/auth/signup' &&
          url !== '/auth/google' &&
          url !== '/auth/logout'
        ) {
          const errorType = AuthErrorHandler.identifyErrorType(err);

          // 记录错误类型，触发用户友好的提示
          dispatch(setAuthError(errorType) as unknown as AppDispatch);

          // 注意：不在这里立即登出，让 AuthStatusModal 处理用户交互
          // 如果需要强制登出，由用户在模态框中确认
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
