import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

export const transcriptChunksApi = createApi({
  reducerPath: 'transcriptChunksApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['TranscriptChunk'],
  endpoints: builder => ({
    getTranscriptChunks: builder.query<
      ITranscriptChunk[],
      { transcriptId: string; limit?: number; page?: number }
    >({
      query: ({ transcriptId, limit, page }) => {
        if (!transcriptId) {
          throw new Error('transcriptId is required');
        }
        const params: Record<string, string> = {};
        if (limit) params.limit = limit.toString();
        if (page) params.page = page.toString();

        return {
          url: `/transcripts/${transcriptId}/chunks`,
          method: 'GET',
          params,
        };
      },
      providesTags: (result, error, { transcriptId }) => [
        { type: 'TranscriptChunk', id: transcriptId },
      ],
    }),
  }),
});

export const { useGetTranscriptChunksQuery, useLazyGetTranscriptChunksQuery } =
  transcriptChunksApi;
