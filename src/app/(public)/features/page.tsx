'use client';

import { useEffect } from 'react';

import FeaturersComparison from '@/app/(public)/features/components/FeaturersComparison';
import SetupSteps from '@/app/(public)/features/components/SetupSteps';

export default function Features() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SetupSteps />
      <FeaturersComparison />
    </>
  );
}
