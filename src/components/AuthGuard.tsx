import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import {
  clearAuthError,
  logout,
  setAuthError,
  setCheckingAuth,
  updateLastAuthCheck,
} from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { AuthErrorHandler } from '@/services/auth-error-handler';

const AuthStatusModal = dynamic(
  () =>
    import('./AuthStatusModal').then(mod => ({ default: mod.AuthStatusModal })),
  { ssr: false },
);

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { authError, isAuthenticated, lastAuthCheck, token } = useAppSelector(
    state => state.auth,
  );
  const [isMounted, setIsMounted] = useState(false);

  // 防止 hydration 错误 - 确保只在客户端执行依赖浏览器 API 的代码
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 定期检查认证状态（可选）
  const checkAuthStatus = useCallback(async () => {
    if (!isAuthenticated || !token) return;

    const now = Date.now();
    const timeSinceLastCheck = now - lastAuthCheck;

    // 每5分钟检查一次
    if (timeSinceLastCheck > 5 * 60 * 1000) {
      dispatch(setCheckingAuth(true));

      try {
        // 使用正确的 API URL
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';
        const headers: Record<string, string> = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${apiBaseUrl}/auth/me`, {
          headers,
        });

        if (response.ok) {
          dispatch(updateLastAuthCheck());
        } else {
          // 只有在明确的用户账户问题时才触发认证错误
          const errorData = (await response.json().catch(() => ({}))) as {
            message?: string;
          };
          const errorMessage = errorData.message ?? '';

          // 使用 AuthErrorHandler 判断是否为用户账户问题
          const mockError = {
            response: {
              status: response.status,
              data: { message: errorMessage },
            },
            message: errorMessage,
          };

          if (AuthErrorHandler.isUserAccountIssue(mockError)) {
            const errorType = AuthErrorHandler.identifyErrorType(mockError);
            dispatch(setAuthError(errorType));
          }
        }
      } catch {
        // 网络错误或其他错误不触发认证模态框
        // console.warn('Auth status check failed:', error);
      } finally {
        dispatch(setCheckingAuth(false));
      }
    }
  }, [isAuthenticated, lastAuthCheck, dispatch, token]);

  // 页面可见性变化时检查认证状态 - 只在客户端执行
  useEffect(() => {
    if (!isMounted) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        void checkAuthStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [checkAuthStatus, isAuthenticated, isMounted]);

  // 监听存储事件（多标签页同步）- 只在客户端执行
  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_logout') {
        // 其他标签页已登出，同步状态
        dispatch(logout());
        router.push('/login?reason=logged_out_elsewhere');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch, router, isMounted]);

  return (
    <>
      {children}

      {/* 全局认证错误模态框 - 只在真正的认证错误时显示 */}
      <AuthStatusModal
        errorType={authError?.type}
        onClose={() => dispatch(clearAuthError())}
      />
    </>
  );
};
