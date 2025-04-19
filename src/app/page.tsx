import { Container } from '@mui/material';
import HeroSection from '../components/features/landing/HeroSection';
import FeaturesSection from '../components/features/landing/FeaturesSection';

export default function LandingPage() {
  return (
    <Container>
      <HeroSection />
      <FeaturesSection />
    </Container>
  );
}