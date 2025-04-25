import { Container } from '@mui/material';
import HeroSection from '../components/features/landing/HeroSection';
import LandingPageComponent from './Landing/page';

export default function LandingPage() {
  return (
    <Container>
      <HeroSection />
      <LandingPageComponent />
    </Container>
  );
}