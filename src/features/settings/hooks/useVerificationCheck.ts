import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useGetVerificationQuery } from '@/features/settings/settingsApi';
import { useAppSelector } from '@/redux/hooks';

export const useVerificationCheck = () => {
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);

  const { data: verificationData, isLoading } = useGetVerificationQuery(
    user?._id ?? '',
    {
      skip: !user?._id,
    },
  );

  const isFullyVerified =
    verificationData?.emailVerified && verificationData?.mobileVerified;
  const isEmailVerified = verificationData?.emailVerified ?? false;
  const isPhoneVerified = verificationData?.mobileVerified ?? false;

  const checkVerificationAndRedirect = useCallback(() => {
    if (isLoading) return false;

    if (!isFullyVerified) {
      router.push('/admin/settings');
      return false;
    }

    return true;
  }, [isLoading, isFullyVerified, router]);

  const showVerificationModal = useCallback(() => {
    if (!isFullyVerified) {
      router.push('/admin/settings');
      return true;
    }
    return false;
  }, [isFullyVerified, router]);

  // New function to check verification with detailed error message
  const checkVerificationWithMessage = useCallback(
    (operation: string) => {
      if (isLoading) {
        return { allowed: false, message: 'Verification status is loading...' };
      }

      if (!isFullyVerified) {
        const unverifiedItems = [];
        if (!isEmailVerified) unverifiedItems.push('email');
        if (!isPhoneVerified) unverifiedItems.push('phone');

        return {
          allowed: false,
          message: `Cannot ${operation}. Please verify your ${unverifiedItems.join(' and ')} first.`,
          unverifiedItems,
          redirect: () => router.push('/admin/settings'),
        };
      }

      return { allowed: true };
    },
    [isLoading, isFullyVerified, isEmailVerified, isPhoneVerified, router],
  );

  // Function to block operations with alert
  const blockOperationWithAlert = useCallback(
    (operation: string) => {
      const result = checkVerificationWithMessage(operation);
      if (!result.allowed) {
        alert(
          `🚨 Verification Required\n\n${result.message}\n\nYou will be redirected to Settings to complete verification.`,
        );
        result.redirect?.();
      }
      return result.allowed;
    },
    [checkVerificationWithMessage],
  );

  return {
    isFullyVerified,
    isEmailVerified,
    isPhoneVerified,
    isLoading,
    verificationData,
    checkVerificationAndRedirect,
    showVerificationModal,
    checkVerificationWithMessage,
    blockOperationWithAlert,
  };
};
