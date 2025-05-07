import HeroSection from '@/app/landing/components/HeroSection';
import TestimonialsSection from '@/app/landing/components/TestimonialsSection';

import PlanSection from './components/PlanSection/PlanSection';
import ProcessFlow from "./components/ProcessFlow";

export default function Landing() {
  return (
    <>
      <HeroSection />
      <PlanSection />
      <ProcessFlow />
      <TestimonialsSection />
    </>
  );
}
