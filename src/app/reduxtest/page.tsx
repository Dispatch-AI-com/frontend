'use client';

import { useEffect } from 'react';

import { useAppSelector } from '@/redux/hooks';

export default function ReduxTestPage() {
  // 只取关键的 auth 状态
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    console.groupCollapsed('🔑 Auth State');
    console.log('Token:', token);
    console.log('User:', user);
    console.groupEnd();
  }, [token, user]);

  return (
    <main style={{ padding: 40 }}>
      <h1>Redux Key State Test (see console)</h1>
      <p>登录成功后，打开控制台查看 Token 和 User 信息。</p>
    </main>
  );
}
