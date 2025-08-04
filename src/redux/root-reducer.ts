// src/redux/root-reducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { calendarApi } from '@/features/calendar/calendarApi';
import { calllogsApi } from '@/features/callog/calllogApi';
import { companyApi } from '@/features/company/companyApi';
import { onboardingApi } from '@/features/onboarding/onboardingApi';
import { overviewApi } from '@/features/overview/overviewApi';
import { publicApiSlice } from '@/features/public/publicApiSlice';
import { serviceApi } from '@/features/service/serviceApi';
import { serviceBookingApi } from '@/features/service/serviceBookingApi';
import { serviceManagementApi } from '@/features/service-management/serviceManagementApi';
import { settingsApi } from '@/features/settings/settingsApi';
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
  [settingsApi.reducerPath]: settingsApi.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
  [overviewApi.reducerPath]: overviewApi.reducer,
  [transcriptApi.reducerPath]: transcriptApi.reducer,
  [transcriptChunksApi.reducerPath]: transcriptChunksApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [calendarApi.reducerPath]: calendarApi.reducer,
  [serviceBookingApi.reducerPath]: serviceBookingApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [serviceManagementApi.reducerPath]: serviceManagementApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
