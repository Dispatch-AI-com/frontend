import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
