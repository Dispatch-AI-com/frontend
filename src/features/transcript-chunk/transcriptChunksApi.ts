import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ITranscriptChunk } from '@/types/transcript-chunk.d';

export const transcriptChunksApi = createApi({
  reducerPath: 'transcriptChunksApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['TranscriptChunk'],
  endpoints: builder => ({
    getTranscriptChunks: builder.query<ITranscriptChunk[], string>({
      query: transcriptId => {
        if (!transcriptId) {
          throw new Error('transcriptId is required');
        }
        return {
          url: `/transcripts/${transcriptId}/chunks`,
          method: 'GET',
        };
      },
      providesTags: (result, error, transcriptId) => [
        { type: 'TranscriptChunk', id: transcriptId },
      ],
    }),
  }),
});

export const { useGetTranscriptChunksQuery, useLazyGetTranscriptChunksQuery } =
  transcriptChunksApi;
