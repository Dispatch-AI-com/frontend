'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import FeaturersComparison from '@/app/(public)/features/components/FeaturersComparison';
import SetupSteps from '@/app/(public)/features/components/SetupSteps';

export default function Features() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Force scroll to top when visiting features page
    const scrollToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Clear any hash in the URL to prevent scrolling to anchors
    if (window.location.hash) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Use a timeout to ensure the page is fully loaded before scrolling
    const timeoutId = setTimeout(scrollToTop, 0);

    // Also immediately scroll
    scrollToTop();

    return () => clearTimeout(timeoutId);
  }, [pathname, isMounted]);

  return (
    <>
      <SetupSteps />
      <FeaturersComparison />
    </>
  );
}
