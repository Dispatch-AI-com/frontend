// src/features/test/testApiSlice.ts
import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

interface UnauthorizedResponse {
  message: string;
}

export const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    getUnauthorized: builder.query<UnauthorizedResponse, undefined>({
      query: () => ({
        url: '/health/unauthorized',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetUnauthorizedQuery } = testApi;
