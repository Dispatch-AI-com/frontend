// src/features/public/publicApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Plan } from '@/types/plan.types';

interface HealthResponse {
  status: string;
}

export const publicApiSlice = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: builder => ({
    getPlans: builder.query<Plan[], undefined>({
      query: () => '/plan',
    }),
    getHealth: builder.query<HealthResponse, undefined>({
      query: () => '/health',
    }),
  }),
});

export const { useGetPlansQuery, useGetHealthQuery } = publicApiSlice;
