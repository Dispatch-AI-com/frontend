import { AUTH_ERROR_MESSAGES, AuthErrorType } from '@/types/auth-errors';

interface ErrorResponse {
  status?: number;
  data?: {
    message?: string;
  };
}

interface ErrorWithResponse {
  response?: ErrorResponse;
  message?: string;
}

export class AuthErrorHandler {
  static identifyErrorType(error: ErrorWithResponse): AuthErrorType {
    const status = error?.response?.status;
    const message = error?.response?.data?.message ?? error?.message ?? '';

    // 基于HTTP状态码和错误信息识别错误类型
    if (status === 401) {
      if (
        message.includes('User account no longer exists') ||
        message.includes('User not found')
      ) {
        return AuthErrorType.USER_DELETED;
      }

      if (
        message.includes('User account is banned') ||
        message.includes('banned')
      ) {
        return AuthErrorType.USER_BANNED;
      }

      if (
        message.includes('User account is not active') ||
        message.includes('not active')
      ) {
        return AuthErrorType.USER_INACTIVE;
      }

      if (
        message.includes('Token has been invalidated') ||
        message.includes('Token is no longer valid') ||
        message.includes('tokenVersion') ||
        message.includes('tokenRefreshTime')
      ) {
        return AuthErrorType.TOKEN_INVALID;
      }

      if (
        message.includes('jwt expired') ||
        message.includes('Token expired')
      ) {
        return AuthErrorType.TOKEN_EXPIRED;
      }

      return AuthErrorType.TOKEN_INVALID;
    }

    if (status === 403) {
      return AuthErrorType.PERMISSION_DENIED;
    }

    if (status === 404) {
      // 404 often means user doesn't exist or token is invalid
      return AuthErrorType.USER_DELETED;
    }

    return AuthErrorType.NETWORK_ERROR;
  }

  static getErrorInfo(errorType: AuthErrorType) {
    return AUTH_ERROR_MESSAGES[errorType];
  }

  static shouldForceLogout(errorType: AuthErrorType): boolean {
    return [
      AuthErrorType.USER_DELETED,
      AuthErrorType.USER_BANNED,
      AuthErrorType.TOKEN_EXPIRED,
      AuthErrorType.TOKEN_INVALID,
      AuthErrorType.PERMISSION_DENIED,
    ].includes(errorType);
  }
}
