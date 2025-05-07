import HeroSection from '@/app/landing/components/HeroSection';
import TestimonialsSection from '@/app/landing/components/TestimonialsSection';

import FeaturesSection from './components/FeaturesSection';
import PlanSection from './components/PlanSection/PlanSection';
import ProcessFlow from "./components/ProcessFlow";

export default function Landing() {
  return (
    <>
      <HeroSection />
      <PlanSection />
      <FeaturesSection/>
      <ProcessFlow />
      <TestimonialsSection />
    </>
  );
}
