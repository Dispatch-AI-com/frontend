import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

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

  // 定期检查认证状态（可选）
  const checkAuthStatus = useCallback(async () => {
    if (!isAuthenticated || !token) return;

    const now = Date.now();
    const timeSinceLastCheck = now - lastAuthCheck;

    // 每5分钟检查一次
    if (timeSinceLastCheck > 5 * 60 * 1000) {
      dispatch(setCheckingAuth(true));

      try {
        // 调用 /auth/me 端点验证用户状态
        const headers: Record<string, string> = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers,
          },
        );

        if (response.ok) {
          dispatch(updateLastAuthCheck());
        } else {
          // 处理认证失败
          const errorType = AuthErrorHandler.identifyErrorType({
            response: { status: response.status },
          });
          dispatch(setAuthError(errorType));
        }
      } catch {
        // Auth status check failed silently
      } finally {
        dispatch(setCheckingAuth(false));
      }
    }
  }, [isAuthenticated, lastAuthCheck, dispatch, token]);

  // 页面可见性变化时检查认证状态
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        void checkAuthStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [checkAuthStatus, isAuthenticated]);

  // 监听存储事件（多标签页同步）
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_logout') {
        // 其他标签页已登出，同步状态
        dispatch(logout());
        router.push('/login?reason=logged_out_elsewhere');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch, router]);

  return (
    <>
      {children}

      {/* 全局认证错误模态框 */}
      <AuthStatusModal
        visible={!!authError?.showModal}
        errorType={authError?.type}
        onClose={() => dispatch(clearAuthError())}
      />
    </>
  );
};
