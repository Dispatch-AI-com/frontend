import HeroSection from '@/app/(public)/landing/components/HeroSection';
import TestimonialsSection from '@/app/(public)/landing/components/TestimonialsSection';

import FeaturesSection from './components/FeaturesSection';
import PlanSection from './components/PlanSection/PlanSection';
import ProcessFlow from './components/ProcessFlow';

export default function Landing() {
  return (
    <>
      <HeroSection />
      <PlanSection />
      <FeaturesSection />
      <ProcessFlow />
      <TestimonialsSection />
    </>
  );
}
