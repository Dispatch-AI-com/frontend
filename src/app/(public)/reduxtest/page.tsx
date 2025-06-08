'use client';

import { useEffect } from 'react';

import { logout } from '@/features/auth/authSlice';
import { useLazyGetUnauthorizedQuery } from '@/features/test/testApiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ReduxTestPage() {
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    console.groupCollapsed('🔑 Auth State');
    console.log('Token:', token);
    console.log('User:', user);
    console.groupEnd();
  }, [token, user]);

  const [triggerUnauthorized, { isFetching, error }] =
    useLazyGetUnauthorizedQuery();

  const handleTrigger401 = async () => {
    try {
      await triggerUnauthorized(undefined).unwrap();
    } catch (err) {
      console.error('❌ API Error:', JSON.stringify(err, null, 2));
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
