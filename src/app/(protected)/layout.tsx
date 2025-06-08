// app/(protected)/layout.tsx
'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useAppSelector } from '@/redux/hooks';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const token = useAppSelector(state => state.auth.token);
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      redirect(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [token, pathname]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
}
