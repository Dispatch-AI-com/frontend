import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '@/lib/axiosBaseQuery';

/* ---------- types ---------- */
export interface SaveAnswerDTO {
  userId: string;
  stepId: number;
  answer: string;
  field: string;
}
export interface SaveAnswerResp {
  success: boolean;
  currentStep: number;
}

export interface ProgressResp {
  currentStep: number;
  answers: Record<string, string>;
  status: 'in_progress' | 'completed';
}

export interface CompleteResp {
  success: boolean;
}

/* ---------- API slice ---------- */
export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Progress'],
  endpoints: builder => ({
    getProgress: builder.query<ProgressResp, string>({
      query: userId => ({
        url: '/onboarding/progress',
        method: 'GET',
        params: { userId },
      }),
      providesTags: ['Progress'],
    }),
    saveAnswer: builder.mutation<SaveAnswerResp, SaveAnswerDTO>({
      query: body => ({
        url: '/onboarding/answer',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Progress'],
    }),
    complete: builder.mutation<CompleteResp, string>({
      query: userId => ({
        url: '/onboarding/complete',
        method: 'POST',
        data: { userId },
      }),
      invalidatesTags: ['Progress'],
    }),
  }),
});

export const {
  useGetProgressQuery,
  useSaveAnswerMutation,
  useCompleteMutation,
} = onboardingApi;
