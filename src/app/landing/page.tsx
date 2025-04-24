import { Container } from '@mui/material';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';

export default function LandingPage() {
  return (
    <Container>
      <HeroSection />
      <FeaturesSection />
    </Container>
  );
}