import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ICallLog } from '@/types/calllog.d';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

type SortOption = 'newest' | 'oldest';
type TagOption = 'all' | 'Missed' | 'Completed' | 'Follow-up';

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
  status?: TagOption;
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
        const {
          search,
          status,
          sort = 'newest',
          pageSize = 20,
          page = 1,
        } = options;
        const params = {
          page: page.toString(),
          limit: pageSize.toString(),
          sort,
          ...(search && { search: search.trim() }),
          ...(status && status !== 'all' && { status }),
        };
        return {
          url: `/users/${userId}/calllogs`,
          method: 'GET',
          params,
        };
      },
      providesTags: ['CallLog'],
    }),
    getTranscriptChunks: builder.query<ITranscriptChunk[], string>({
      query: transcriptId => ({
        url: `/transcripts/${transcriptId}/chunks`,
        method: 'GET',
      }),
      providesTags: ['CallLog'],
    }),
  }),
});

// Export hooks
export const { useGetCallLogsQuery, useGetTranscriptChunksQuery } = calllogsApi;

// Export raw API functions
export const getCallLogs = calllogsApi.endpoints.getCallLogs.initiate;
export const getTranscriptChunks =
  calllogsApi.endpoints.getTranscriptChunks.initiate;
