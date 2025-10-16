'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useAppSelector } from '@/redux/hooks';
import { persistor, store } from '@/redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  function SessionSync() {
    const user = useAppSelector(s => s.auth.user);
    useEffect(() => {
      if (!user) return;
      try {
        if (user._id) sessionStorage.setItem('userId', user._id);
        if (user.email) sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('user', JSON.stringify(user));
      } catch {
        // ignore storage errors
      }
    }, [user]);
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionSync />
        {children}
      </PersistGate>
    </Provider>
  );
}
