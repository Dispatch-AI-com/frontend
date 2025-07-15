'use client';

import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import OnboardingLayout from '@/components/layout/onboarding-layout';
import { useAppSelector } from '@/redux/hooks';

export default function OnboardingProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const token = useAppSelector(s => s.auth.token);

  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !token) {
      router.replace('/login');
    }
  }, [ready, token, pathname, router]);

  if (!ready || !token) return null;

  return <OnboardingLayout>{children}</OnboardingLayout>;
}
