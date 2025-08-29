'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import OnboardingLayout from '@/components/layout/onboarding-layout';
import { useCheckAuthStatusQuery } from '@/features/auth/authApi';
import { useAppSelector } from '@/redux/hooks';

export default function OnboardingProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);

  // Check authentication status using cookies
  const { isLoading: isCheckingAuth } = useCheckAuthStatusQuery();

  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !isCheckingAuth && !isAuthenticated) {
      router.replace('/login');
    }
  }, [ready, isAuthenticated, pathname, router, isCheckingAuth]);

  if (!ready || isCheckingAuth || !isAuthenticated) return null;

  return <OnboardingLayout>{children}</OnboardingLayout>;
}
