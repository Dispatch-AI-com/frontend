import { createApi } from '@reduxjs/toolkit/query/react';

import { logout, setCredentials } from '@/features/auth/authSlice';
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

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
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
    // CSRF token management - refresh only
    refreshCSRFToken: builder.mutation<{ message: string }, void>({
      query: () => ({ url: '/auth/refresh-csrf', method: 'POST' }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // After refresh, the new token is automatically set in httpOnly cookie
          // No need to manually get it via API
        } catch {
          // If refresh fails, logout user
          dispatch(logout());
        }
      },
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
} = authApi;
