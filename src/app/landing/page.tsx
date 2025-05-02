import { Container } from '@mui/material';
import HeroSection from './components/HeroSection';
import ProcessFlow from './components/ProcessFlow';

export default function LandingPage() {
  return (
    <Container>
      <HeroSection />
      <ProcessFlow />
    </Container>
  );
}