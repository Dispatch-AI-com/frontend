import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from '@/features/auth/authApi';
import { calllogsApi } from '@/features/callog/calllogApi';
import { publicApiSlice } from '@/features/public/publicApiSlice';
import { testApi } from '@/features/test/testApiSlice';
import { transcriptApi } from '@/features/transcript/transcriptApi';
import { transcriptChunksApi } from '@/features/transcript-chunk/transcriptChunksApi';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      publicApiSlice.middleware,
      testApi.middleware,
      calllogsApi.middleware,
      transcriptApi.middleware,
      transcriptChunksApi.middleware,
    ),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
