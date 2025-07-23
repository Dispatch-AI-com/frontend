import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { clearAuthError, logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { AUTH_ERROR_MESSAGES, AuthErrorType } from '@/types/auth-errors';

interface AuthStatusModalProps {
  errorType?: AuthErrorType;
  onClose?: () => void;
}

export const AuthStatusModal: React.FC<AuthStatusModalProps> = ({
  errorType,
  onClose,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration errors - ensure only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const errorInfo = errorType ? AUTH_ERROR_MESSAGES[errorType] : null;

  // Don't show modal during server-side rendering or before mounting
  if (!isMounted || !errorInfo) return null;

  const handleRelogin = () => {
    setIsRedirecting(true);

    // Clear authentication status
    dispatch(logout());
    dispatch(clearAuthError());

    // Delay navigation to show user the process
    setTimeout(() => {
      router.push('/login?reason=auth_required');
    }, 1000);
  };

  const handleContactSupport = () => {
    // Navigate to support page or show contact info
    window.open('/support', '_blank');
  };

  const handleRetry = () => {
    dispatch(clearAuthError());
    onClose?.();
    // Refresh current page
    window.location.reload();
  };

  // Use portal to render modal to document.body, ensuring it doesn't affect page layout
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        zIndex: 99999, // Use style to ensure highest priority
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            onClose?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      ></div>
      {/* 模态框内容 - 使用 relative 确保在遮罩之上 */}
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200 scale-100"
        style={{ zIndex: 1 }}
      >
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
    </div>,
    document.body,
  );
};
