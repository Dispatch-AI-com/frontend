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
  // 判断是否为用户账户相关的问题（需要重新登录）
  static isUserAccountIssue(error: ErrorWithResponse): boolean {
    const status = error?.response?.status;
    const message = error?.response?.data?.message ?? error?.message ?? '';

    // 用户被删除/不存在
    if (
      message.includes('User account no longer exists') ||
      message.includes('User not found') ||
      message.includes('user does not exist') ||
      message.includes('User has been deleted') ||
      message.includes('Account no longer exists') ||
      message.includes('User account deleted') ||
      message.includes('User does not exist')
    ) {
      return true;
    }

    // 用户被禁用
    if (
      message.includes('User account is banned') ||
      message.includes('banned')
    ) {
      return true;
    }

    // 用户未激活
    if (
      message.includes('User account is not active') ||
      message.includes('not active')
    ) {
      return true;
    }

    // Token 相关问题
    if (
      message.includes('Token has been invalidated') ||
      message.includes('Token is no longer valid') ||
      message.includes('tokenVersion') ||
      message.includes('tokenRefreshTime') ||
      message.includes('jwt expired') ||
      message.includes('Token expired')
    ) {
      return true;
    }

    // 明确的认证失败
    if (
      status === 401 &&
      (message.includes('Unauthorized') ||
        message.includes('Invalid token') ||
        message.includes('Authentication failed'))
    ) {
      return true;
    }

    // 明确的权限问题
    if (
      status === 403 &&
      (message.includes('Forbidden') ||
        message.includes('Access denied') ||
        message.includes('Insufficient permissions'))
    ) {
      return true;
    }

    return false;
  }

  static identifyErrorType(error: ErrorWithResponse): AuthErrorType {
    const status = error?.response?.status;
    const message = error?.response?.data?.message ?? error?.message ?? '';

    // 基于HTTP状态码和错误信息识别错误类型
    if (status === 401) {
      // 用户被删除/不存在的情况
      if (
        message.includes('User account no longer exists') ||
        message.includes('User not found')
      ) {
        return AuthErrorType.USER_DELETED;
      }

      // 用户被禁用
      if (
        message.includes('User account is banned') ||
        message.includes('banned')
      ) {
        return AuthErrorType.USER_BANNED;
      }

      // 用户未激活
      if (
        message.includes('User account is not active') ||
        message.includes('not active')
      ) {
        return AuthErrorType.USER_INACTIVE;
      }

      // Token 失效相关
      if (
        message.includes('Token has been invalidated') ||
        message.includes('Token is no longer valid') ||
        message.includes('tokenVersion') ||
        message.includes('tokenRefreshTime')
      ) {
        return AuthErrorType.TOKEN_INVALID;
      }

      // Token 过期
      if (
        message.includes('jwt expired') ||
        message.includes('Token expired')
      ) {
        return AuthErrorType.TOKEN_EXPIRED;
      }

      // 其他 401 可能是业务相关的认证错误，不一定需要弹窗
      // 只有明确的认证问题才返回 TOKEN_INVALID
      if (
        message.includes('Unauthorized') ||
        message.includes('Invalid token') ||
        message.includes('Authentication failed')
      ) {
        return AuthErrorType.TOKEN_INVALID;
      }

      // 其他 401 错误视为网络/业务错误
      return AuthErrorType.NETWORK_ERROR;
    }

    if (status === 403) {
      // 只有明确的权限问题才触发认证模态框
      if (
        message.includes('Forbidden') ||
        message.includes('Access denied') ||
        message.includes('Insufficient permissions')
      ) {
        return AuthErrorType.PERMISSION_DENIED;
      }
      return AuthErrorType.NETWORK_ERROR;
    }

    if (status === 404) {
      // 只有明确提到用户相关的 404 错误才认为是用户被删除
      if (
        message.includes('User not found') ||
        message.includes('User account no longer exists') ||
        message.includes('user does not exist') ||
        message.includes('User has been deleted') ||
        message.includes('Account no longer exists') ||
        message.includes('User account deleted') ||
        message.includes('User does not exist')
      ) {
        return AuthErrorType.USER_DELETED;
      }
      // 其他 404 错误是资源不存在（如 subscriptions、invoices 等），不触发认证错误
      return AuthErrorType.NETWORK_ERROR;
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

  static isAuthenticationError(errorType: AuthErrorType): boolean {
    // 只有这些类型才是真正的认证错误，需要显示认证模态框
    return [
      AuthErrorType.USER_DELETED,
      AuthErrorType.USER_BANNED,
      AuthErrorType.USER_INACTIVE,
      AuthErrorType.TOKEN_EXPIRED,
      AuthErrorType.TOKEN_INVALID,
      AuthErrorType.PERMISSION_DENIED,
    ].includes(errorType);
  }
}
