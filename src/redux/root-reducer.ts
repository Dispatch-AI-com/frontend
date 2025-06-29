import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '@/features/auth/authApi';
import authReducer from '@/features/auth/authSlice';
import { publicApiSlice } from '@/features/public/publicApiSlice';
import { serviceApi } from '@/features/service/serviceApi';
import { serviceBookingApi } from '@/features/service/serviceBookingApi';
import { testApi } from '@/features/test/testApiSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [serviceBookingApi.reducerPath]: serviceBookingApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
