// app/admin/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminRootRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    if (params) {
      router.replace(`/admin/settings?${params}`);
    } else {
      router.replace('/admin/overview');
    }
  }, [router, searchParams]);

  return null;
}
