// src/redux/root-reducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { calllogsApi } from '@/features/callog/calllogApi';
import { publicApiSlice } from '@/features/public/publicApiSlice';
import { testApi } from '@/features/test/testApiSlice';
import { transcriptApi } from '@/features/transcript/transcriptApi';
import { transcriptChunksApi } from '@/features/transcript-chunk/transcriptChunksApi';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [calllogsApi.reducerPath]: calllogsApi.reducer,
  [transcriptApi.reducerPath]: transcriptApi.reducer,
  [transcriptChunksApi.reducerPath]: transcriptChunksApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
