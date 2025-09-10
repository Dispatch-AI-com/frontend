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

  return {
    isFullyVerified,
    isEmailVerified,
    isPhoneVerified,
    isLoading,
    verificationData,
    checkVerificationAndRedirect,
    showVerificationModal,
  };
};
