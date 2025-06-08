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
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useSignupUserMutation,
} = authApi;
