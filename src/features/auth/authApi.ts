import { createApi } from '@reduxjs/toolkit/query/react';

import {
  logout,
  setCredentials,
  updateCSRFToken,
} from '@/features/auth/authSlice';
import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { UserInfo } from '@/types/user.d';

interface LoginDTO {
  email: string;
  password: string;
}

interface AuthResponse {
  user: UserInfo;
  csrfToken: string;
}

interface SignupDTO {
  name: string;
  email: string;
  password: string;
}

interface AuthStatusResponse {
  user: UserInfo;
}

interface CSRFTokenResponse {
  csrfToken: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'CSRFToken'],
  endpoints: builder => ({
    loginUser: builder.mutation<AuthResponse, LoginDTO>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        data: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          return;
        }
      },
      invalidatesTags: ['User'],
    }),
    signupUser: builder.mutation<AuthResponse, SignupDTO>({
      query: body => ({
        url: '/auth/signup',
        method: 'POST',
        data: body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          return;
        }
      },
      invalidatesTags: ['User'],
    }),
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      onQueryStarted(_, { dispatch }) {
        dispatch(logout());
      },
      invalidatesTags: ['User'],
    }),
    checkAuthStatus: builder.query<AuthStatusResponse, void>({
      query: () => ({ url: '/auth/me', method: 'GET' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // If we can get user data, we're authenticated (cookie is valid)
          dispatch(
            setCredentials({
              user: data.user,
              csrfToken: '', // CSRF token will be set from login/signup
            }),
          );
        } catch {
          // If request fails, user is not authenticated
          dispatch(logout());
        }
      },
      providesTags: ['User'],
    }),
    // New endpoints for CSRF token management
    refreshCSRFToken: builder.mutation<{ message: string }, void>({
      query: () => ({ url: '/auth/refresh-csrf', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // After refresh, get the new token
          dispatch(authApi.util.invalidateTags(['CSRFToken']));
        } catch {
          // If refresh fails, logout user
          dispatch(logout());
        }
      },
    }),
    getCSRFToken: builder.query<CSRFTokenResponse, void>({
      query: () => ({ url: '/auth/csrf-token', method: 'GET' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateCSRFToken(data.csrfToken));
        } catch {
          // If getting token fails, user might not be authenticated
          dispatch(logout());
        }
      },
      providesTags: ['CSRFToken'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useSignupUserMutation,
  useCheckAuthStatusQuery,
  useLazyCheckAuthStatusQuery,
  useRefreshCSRFTokenMutation,
  useGetCSRFTokenQuery,
  useLazyGetCSRFTokenQuery,
} = authApi;
