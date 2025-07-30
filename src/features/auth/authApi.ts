import { createApi } from '@reduxjs/toolkit/query/react';

import { logout, setCredentials } from '@/features/auth/authSlice';
import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { UserInfo } from '@/types/user.d';

interface LoginDTO {
  email: string;
  password: string;
}

interface LoginResp {
  token: string;
  user: UserInfo;
}

interface SignupDTO {
  name: string;
  email: string;
  password: string;
}
interface SignupResp {
  token: string;
  user: UserInfo;
}

interface LinkGoogleAccountDTO {
  googleEmail: string;
}

interface LinkGoogleAccountResp {
  success: boolean;
  message: string;
  googleAccountLink?: {
    googleEmail: string;
    calendarAccessGranted: boolean;
  };
}

interface GoogleAuthURLResp {
  authUrl: string;
  state: string;
}

interface GoogleAuthCallbackDTO {
  code: string;
  state: string;
}

interface GoogleAuthCallbackResp {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  calendarAccessGranted: boolean;
}

// refresh google token
interface RefreshGoogleTokenResp {
  success: boolean;
  accessToken?: string;
  expiresIn?: number;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    loginUser: builder.mutation<LoginResp, LoginDTO>({
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
    }),
    signupUser: builder.mutation<SignupResp, SignupDTO>({
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
    }),
    logoutUser: builder.mutation<{ message: string }, null>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      onQueryStarted(_, { dispatch }) {
        dispatch(logout());
      },
    }),
    // link google account
    linkGoogleAccount: builder.mutation<
      LinkGoogleAccountResp,
      LinkGoogleAccountDTO
    >({
      query: body => ({
        url: '/auth/link-google-account',
        method: 'POST',
        data: body,
      }),
    }),
    // get google account link status
    getGoogleAccountLink: builder.query<LinkGoogleAccountResp, void>({
      query: () => ({
        url: '/auth/google-account-link',
        method: 'GET',
      }),
    }),
    // get google oauth auth url
    getGoogleAuthURL: builder.mutation<
      GoogleAuthURLResp,
      { redirectUri?: string }
    >({
      query: params => ({
        url: '/auth/google/authorize',
        method: 'POST',
        data: params,
      }),
    }),
    // google oauth callback
    handleGoogleAuthCallback: builder.mutation<
      GoogleAuthCallbackResp,
      GoogleAuthCallbackDTO
    >({
      query: body => ({
        url: '/auth/google/callback',
        method: 'POST',
        data: body,
      }),
    }),
    // refresh google access token
    refreshGoogleToken: builder.mutation<RefreshGoogleTokenResp, void>({
      query: () => ({
        url: '/auth/google/refresh-token',
        method: 'POST',
      }),
    }),
    // revoke google auth
    revokeGoogleAuth: builder.mutation<
      { success: boolean; message: string },
      void
    >({
      query: () => ({
        url: '/auth/google/revoke',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useSignupUserMutation,
  useLinkGoogleAccountMutation,
  useGetGoogleAccountLinkQuery,
  useGetGoogleAuthURLMutation,
  useHandleGoogleAuthCallbackMutation,
  useRefreshGoogleTokenMutation,
  useRevokeGoogleAuthMutation,
} = authApi;
