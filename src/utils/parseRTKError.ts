// src/utils/parseRTKError.ts

export interface RTKError {
  status?: number;
  data?: unknown;
}

export function parseRTKError(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'An unexpected error occurred.';
  }

  const { status, data } = error as RTKError;

  if (typeof data === 'string') {
    return data;
  }

  if (typeof data === 'object' && data !== null) {
    if (typeof (data as { message?: string }).message === 'string') {
      return (
        (data as { message?: string }).message ??
        'An unexpected error occurred.'
      );
    }
  }

  switch (status) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Unauthorized. Please log in again.';
    case 403:
      return 'Forbidden. You do not have permission to perform this action.';
    case 404:
      return 'Resource not found.';
    case 409:
      return 'Conflict. The resource already exists.';
    case 422:
      return 'Unprocessable entity. Please check your data.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return 'An unexpected error occurred.';
  }
}
