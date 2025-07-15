// src/redux/root-reducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { calllogsApi } from '@/features/callog/calllogApi';
import { companyApi } from '@/features/company/companyApi';
import { onboardingApi } from '@/features/onboarding/onboardingApi';
import { publicApiSlice } from '@/features/public/publicApiSlice';
import { subscriptionApi } from '@/features/subscription/subscriptionApi';
import { testApi } from '@/features/test/testApiSlice';
import { transcriptApi } from '@/features/transcript/transcriptApi';
import { transcriptChunksApi } from '@/features/transcript-chunk/transcriptChunksApi';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [calllogsApi.reducerPath]: calllogsApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
  [transcriptApi.reducerPath]: transcriptApi.reducer,
  [transcriptChunksApi.reducerPath]: transcriptChunksApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
