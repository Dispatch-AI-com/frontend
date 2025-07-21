export enum AuthErrorType {
  USER_DELETED = 'USER_DELETED',
  USER_BANNED = 'USER_BANNED',
  USER_INACTIVE = 'USER_INACTIVE',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export interface AuthError {
  type: AuthErrorType;
  message: string;
  action: 'relogin' | 'contact_support' | 'retry';
  details?: string;
}

export const AUTH_ERROR_MESSAGES = {
  [AuthErrorType.USER_DELETED]: {
    title: 'Account Deleted',
    message:
      'Your account has been deleted by an administrator. Please contact support if you have questions.',
    action: 'relogin' as const,
    canRetry: false,
  },
  [AuthErrorType.USER_BANNED]: {
    title: 'Account Suspended',
    message:
      'Your account has been temporarily suspended. Please contact support for more details.',
    action: 'contact_support' as const,
    canRetry: false,
  },
  [AuthErrorType.USER_INACTIVE]: {
    title: 'Account Inactive',
    message:
      'Your account status is inactive. Please sign in again or contact support.',
    action: 'relogin' as const,
    canRetry: true,
  },
  [AuthErrorType.TOKEN_EXPIRED]: {
    title: 'Session Expired',
    message: 'Your session has expired. Please sign in again.',
    action: 'relogin' as const,
    canRetry: false,
  },
  [AuthErrorType.TOKEN_INVALID]: {
    title: 'Session Invalid',
    message:
      'A security issue was detected. For your account safety, please sign in again.',
    action: 'relogin' as const,
    canRetry: false,
  },
  [AuthErrorType.PERMISSION_DENIED]: {
    title: 'Access Denied',
    message:
      'Your account permissions have changed. Please sign in again to get updated access.',
    action: 'relogin' as const,
    canRetry: false,
  },
  [AuthErrorType.NETWORK_ERROR]: {
    title: 'Network Error',
    message:
      'Unable to connect to the server. Please check your internet connection and try again.',
    action: 'retry' as const,
    canRetry: true,
  },
};
