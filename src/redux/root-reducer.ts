// src/redux/root-reducer.ts
import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { publicApiSlice } from '@/features/public/publicApiSlice';
import { testApi } from '@/features/test/testApiSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [testApi.reducerPath]: testApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
