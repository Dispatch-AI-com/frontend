'use client';

import React from 'react';

import { useVerificationCheck } from '@/features/settings/hooks/useVerificationCheck';

interface VerificationGuardProps {
  children: React.ReactNode;
  operation: string;
  fallback?: React.ReactNode;
}

/**
 * A guard component that blocks operations if user is not fully verified
 * Shows fallback content or nothing if verification is required
 */
export default function VerificationGuard({
  children,
  operation: _operation,
  fallback,
}: VerificationGuardProps) {
  const { isFullyVerified, isLoading } = useVerificationCheck();

  if (isLoading) {
    return <>{fallback ?? <div>Loading verification status...</div>}</>;
  }

  if (!isFullyVerified) {
    return <>{fallback ?? null}</>;
  }

  return <>{children}</>;
}

/**
 * Hook to wrap functions that require verification
 */
export const useVerificationGuard = () => {
  const { blockOperationWithAlert } = useVerificationCheck();

  const guardFunction = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    operation: string,
  ): T => {
    return ((...args: Parameters<T>) => {
      if (!blockOperationWithAlert(operation)) {
        return;
      }
      return fn(...args);
    }) as T;
  };

  return { guardFunction };
};
