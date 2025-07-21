import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { clearAuthError, logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { AUTH_ERROR_MESSAGES, AuthErrorType } from '@/types/auth-errors';

interface AuthStatusModalProps {
  visible: boolean;
  errorType?: AuthErrorType;
  onClose?: () => void;
}

export const AuthStatusModal: React.FC<AuthStatusModalProps> = ({
  visible,
  errorType,
  onClose,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const errorInfo = errorType ? AUTH_ERROR_MESSAGES[errorType] : null;

  const handleRelogin = () => {
    setIsRedirecting(true);

    // 清除认证状态
    dispatch(logout());
    dispatch(clearAuthError());

    // 延迟跳转，给用户看到处理过程
    setTimeout(() => {
      router.push('/login?reason=auth_required');
    }, 1000);
  };

  const handleContactSupport = () => {
    // 跳转到客服页面或显示联系方式
    window.open('/support', '_blank');
  };

  const handleRetry = () => {
    dispatch(clearAuthError());
    onClose?.();
    // 刷新当前页面
    window.location.reload();
  };

  if (!errorInfo) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${visible ? 'block' : 'hidden'}`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-orange-500 text-xl">⚠️</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {errorInfo.title}
            </h3>
          </div>

          <div className="mb-6">
            <div
              className={`p-4 rounded-md ${
                errorType === AuthErrorType.USER_BANNED
                  ? 'bg-red-50 border border-red-200 text-red-700'
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
              }`}
            >
              <p className="text-sm">{errorInfo.message}</p>
            </div>
          </div>

          {isRedirecting && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-gray-600 text-sm">
                  Redirecting to sign in...
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            {errorInfo.action === 'contact_support' && (
              <>
                <button
                  onClick={handleContactSupport}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Contact Support
                </button>
                <button
                  onClick={handleRelogin}
                  disabled={isRedirecting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Sign In Again
                </button>
              </>
            )}

            {errorInfo.action === 'relogin' && (
              <>
                {errorInfo.canRetry && (
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Retry
                  </button>
                )}
                <button
                  onClick={handleRelogin}
                  disabled={isRedirecting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Sign In Again
                </button>
              </>
            )}

            {errorInfo.action === 'retry' && (
              <>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Retry
                </button>
                <button
                  onClick={handleRelogin}
                  disabled={isRedirecting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Sign In Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
