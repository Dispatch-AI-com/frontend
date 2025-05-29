import { combineReducers } from '@reduxjs/toolkit';

import auth from '@/state/features/auth/slice';

export const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;
