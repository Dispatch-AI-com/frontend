import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

export interface TranscriptChunksResponse {
  data: ITranscriptChunk[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const transcriptChunksApi = createApi({
  reducerPath: 'transcriptChunksApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['TranscriptChunk'],
  endpoints: builder => ({
    getTranscriptChunks: builder.query<
      TranscriptChunksResponse,
      {
        transcriptId: string;
        limit?: number;
        page?: number;
        speakerType?: 'AI' | 'User';
      }
    >({
      query: ({ transcriptId, limit = 20, page = 1, speakerType }) => {
        if (!transcriptId) {
          throw new Error('transcriptId is required');
        }
        const params: Record<string, string> = {
          limit: limit.toString(),
          page: page.toString(),
        };
        if (speakerType) params.speakerType = speakerType;

        return {
          url: `/transcripts/${transcriptId}/chunks`,
          method: 'GET',
          params,
        };
      },
      providesTags: (result, error, { transcriptId }) => [
        { type: 'TranscriptChunk', id: transcriptId },
      ],
      // Enable caching and merging for infinite scroll
      serializeQueryArgs: ({ queryArgs }) => {
        const { transcriptId, limit, speakerType } = queryArgs;
        return { transcriptId, limit, speakerType };
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          // Reset cache for first page
          return newItems;
        }
        // Merge data for subsequent pages
        return {
          ...newItems,
          data: [...(currentCache?.data || []), ...newItems.data],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const { useGetTranscriptChunksQuery, useLazyGetTranscriptChunksQuery } =
  transcriptChunksApi;
