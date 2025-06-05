'use client';

import { useEffect, useState } from 'react';

import { logout, setToken } from '@/redux/features/auth/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function ReduxTestPage() {
  /** 标记 “已水合” */

  const token = useAppSelector(s => s.auth.token);
  const dispatch = useAppDispatch();

  /** token 每次变化时打印到浏览器控制台 */
  useEffect(() => {
    console.log('[ReduxTest] current token →', token);
  }, [token]);

  return (
    <main style={{ padding: 40 }}>
      <h1>Redux Connectivity Test (see console)</h1>

      <p>当前，点击按钮测试 Redux / 持久化逻辑，具体值请看浏览器控制台。</p>
    </main>
  );
}
