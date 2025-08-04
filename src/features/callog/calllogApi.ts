import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ICallLog } from '@/types/calllog.d';

type SortOption = 'newest' | 'oldest';

interface CallLogResponse {
  data: ICallLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface UseCallLogsOptions {
  search?: string;
  sort?: SortOption;
  pageSize?: number;
  page?: number;
}

export const calllogsApi = createApi({
  reducerPath: 'calllogsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CallLog'],
  endpoints: builder => ({
    getCallLogs: builder.query<
      CallLogResponse,
      { userId: string; options?: UseCallLogsOptions }
    >({
      query: ({ userId, options = {} }) => {
        const { search, sort = 'newest', pageSize = 20, page = 1 } = options;
        const params = {
          page: page.toString(),
          limit: pageSize.toString(),
          sort,
          ...(search && { search: search.trim() }),
        };
        return {
          url: `/users/${userId}/calllogs`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['CallLog'],
    }),
    deleteCallLog: builder.mutation<
      ICallLog,
      { userId: string; calllogId: string }
    >({
      query: ({ userId, calllogId }) => ({
        url: `/users/${userId}/calllogs/${calllogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CallLog'],
    }),

    getTodayMetrics: builder.query<
      { totalCalls: number; liveCalls: number },
      string
    >({
      query: userId => ({
        url: `/users/${userId}/calllogs/metrics/today`,
        method: 'GET',
      }),
      providesTags: ['CallLog'],
    }),
  }),
});

// Export hooks
export const {
  useGetCallLogsQuery,
  useDeleteCallLogMutation,
  useGetTodayMetricsQuery,
} = calllogsApi;

// Export raw API functions
export const getCallLogs = calllogsApi.endpoints.getCallLogs.initiate;
export const getTodayMetrics = calllogsApi.endpoints.getTodayMetrics.initiate;
