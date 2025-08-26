'use client';

import { useEffect } from 'react';

import { logout } from '@/features/auth/authSlice';
import { useCSRFToken } from '@/features/auth/hooks/useCSRFToken';
import { useLazyGetUnauthorizedQuery } from '@/features/test/testApiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ReduxTestPage() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);
  const csrfToken = useAppSelector(state => state.auth.csrfToken);

  const { isTokenValid, refreshToken, getToken } = useCSRFToken();

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
    console.log('CSRF Token Valid:', isTokenValid());
    // eslint-disable-next-line no-console
    console.groupEnd();
  }, [isAuthenticated, user, csrfToken, isTokenValid]);

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

  const handleRefreshCSRF = async () => {
    try {
      const success = await refreshToken();
      // eslint-disable-next-line no-console
      console.log('🔄 CSRF Token Refresh:', success ? 'Success' : 'Failed');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('❌ CSRF Refresh Error:', err);
    }
  };

  const handleGetCSRF = async () => {
    try {
      const token = await getToken();
      // eslint-disable-next-line no-console
      console.log('📋 Get CSRF Token:', token ? 'Success' : 'Failed');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('❌ Get CSRF Error:', err);
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Redux Key State Test (see console)</h1>
      <p>login success, see token and user info in console</p>

      <div style={{ marginTop: 24 }}>
        <button onClick={() => dispatch(logout())} style={{ marginRight: 16 }}>
          Clear Auth State (redux)
        </button>

        <button
          onClick={() => void handleTrigger401()}
          style={{ marginRight: 16 }}
          disabled={isFetching}
        >
          Simulate 401 Error (axiosBaseQuery + redux)
        </button>

        <button
          onClick={() => void handleRefreshCSRF()}
          style={{ marginRight: 16 }}
        >
          Refresh CSRF Token
        </button>

        <button
          onClick={() => void handleGetCSRF()}
          style={{ marginRight: 16 }}
        >
          Get CSRF Token
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>401 Error Triggered</p>}

      <div style={{ marginTop: 24 }}>
        <h3>CSRF Token Status:</h3>
        <p>Token: {csrfToken ? `${csrfToken.substring(0, 20)}...` : 'None'}</p>
        <p>Valid: {isTokenValid() ? '✅ Yes' : '❌ No'}</p>
        <p>Authenticated: {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
      </div>
    </main>
  );
}
