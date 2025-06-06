'use client';

import { useEffect } from 'react';

import { logout } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ReduxTestPage() {
  const dispatch = useAppDispatch();

  // 只取关键的 auth 状态
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    console.groupCollapsed('🔑 Auth State');
    console.log('Token:', token);
    console.log('User:', user);
    console.groupEnd();
  }, [token, user]);

  const handleClearAuth = () => {
    dispatch(logout());
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Redux Key State Test (see console)</h1>
      <p>登录成功后，打开控制台查看 Token 和 User 信息。</p>

      <button onClick={handleClearAuth} style={{ marginTop: 24 }}>
        Clear Auth State
      </button>
    </main>
  );
}
