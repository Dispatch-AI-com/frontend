import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ICallLog } from '@/types/calllog.d';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

export const calllogsApi = createApi({
  reducerPath: 'calllogsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['CallLog'],
  endpoints: builder => ({
    getCallLogs: builder.query<
      ICallLog[],
      { userId: string; params?: Record<string, string> }
    >({
      query: ({ userId, params }) => ({
        url: `/users/${userId}/calllogs`,
        method: 'GET',
        params,
      }),
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
