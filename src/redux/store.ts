import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
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

import { rootReducer } from './root-reducer';

const persistConfig = { key: 'root', storage, whitelist: ['auth'] };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// ----------------------------------------------------------------------------
// Hot Module Replacement for reducers:
// This block checks if the Vite HMR API is available (import.meta.hot). If so,
// it listens for updates to the "./root-reducer" module. When that file changes,
// it dynamically re-imports the new reducer and uses store.replaceReducer()
// (wrapped again with persistReducer to reapply redux-persist settings) so that
// the Redux store updates to the new reducer logic without resetting the current state.
// ----------------------------------------------------------------------------

if (process.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept('./root-reducer', () => {
    void import('./root-reducer').then(({ rootReducer: nextRootReducer }) => {
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  });
}
