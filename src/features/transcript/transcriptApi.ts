import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';
import type { ITranscript } from '@/types/transcript.d';

export const transcriptApi = createApi({
  reducerPath: 'transcriptApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Transcript'],
  endpoints: builder => ({
    getTranscript: builder.query<ITranscript, string>({
      query: (calllogId: string) => ({
        url: `/calllogs/${calllogId}/transcript`,
        method: 'GET',
      }),
      providesTags: ['Transcript'],
    }),
  }),
});

export const { useGetTranscriptQuery } = transcriptApi;
export const getTranscript = transcriptApi.endpoints.getTranscript.initiate;
