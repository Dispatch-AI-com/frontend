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

  // Prevent hydration errors - ensure browser API dependent code only runs on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Periodically check authentication status (optional)
  const checkAuthStatus = useCallback(async () => {
    if (!isAuthenticated || !token) return;

    const now = Date.now();
    const timeSinceLastCheck = now - lastAuthCheck;

    // Check every 5 minutes
    if (timeSinceLastCheck > 5 * 60 * 1000) {
      dispatch(setCheckingAuth(true));

      try {
        // Use correct API URL
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
          // Only trigger auth error for explicit user account issues
          const errorData = (await response.json().catch(() => ({}))) as {
            message?: string;
          };
          const errorMessage = errorData.message ?? '';

          // Use AuthErrorHandler to determine if it's an auth error
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
        // Network errors or other errors don't trigger auth modal
        // console.warn('Auth status check failed:', error);
      } finally {
        dispatch(setCheckingAuth(false));
      }
    }
  }, [isAuthenticated, lastAuthCheck, dispatch, token]);

  // Check auth status when page visibility changes - only execute on client
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

  // Listen for storage events (multi-tab sync) - only execute on client
  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_logout') {
        // Other tab has logged out, sync state
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
