// app/(protected)/layout.tsx
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hooks';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const token = useAppSelector(s => s.auth.token);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && !token) {
      router.replace(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [ready, token, pathname, router]);

  if (!ready || !token) return null;
  return <>{children}</>;
}
