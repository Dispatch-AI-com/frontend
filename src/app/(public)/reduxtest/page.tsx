'use client';

import { useEffect } from 'react';

import { logout } from '@/features/auth/authSlice';
import { useLazyGetUnauthorizedQuery } from '@/features/test/testApiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ReduxTestPage() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const csrfToken = useAppSelector(state => state.auth.csrfToken);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.groupCollapsed('🔑 Auth State');
    // eslint-disable-next-line no-console
    console.log('Authenticated:', isAuthenticated);
    // eslint-disable-next-line no-console
    console.log('User:', user);
    // eslint-disable-next-line no-console
    console.log('CSRF Token:', csrfToken);
    // eslint-disable-next-line no-console
    console.groupEnd();
  }, [isAuthenticated, user, csrfToken]);

  const [triggerUnauthorized, { isFetching, error }] =
    useLazyGetUnauthorizedQuery();

  const handleTrigger401 = async () => {
    try {
      await triggerUnauthorized(undefined).unwrap();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('❌ API Error:', JSON.stringify(err, null, 2));
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Redux Key State Test (see console)</h1>
      <p>login success, see token and user info in console</p>
      <button onClick={() => dispatch(logout())} style={{ marginTop: 24 }}>
        Clear Auth State (redux)
      </button>

      <button
        onClick={() => void handleTrigger401()}
        style={{ marginTop: 24, marginLeft: 16 }}
        disabled={isFetching}
      >
        Simulate 401 Error (axiosBaseQuery + redux)
      </button>

      {error && <p style={{ color: 'red' }}>401 Error Triggered</p>}
    </main>
  );
}
