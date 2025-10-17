'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsCalendarRedirect() {
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const qs = search.toString();
    router.replace(`/admin/settings${qs ? `?${qs}` : '?connected=google'}`);
  }, [router, search]);

  return null;
}
