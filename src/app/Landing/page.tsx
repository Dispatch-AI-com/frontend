import { Container } from '@mui/material';
import HeroSection from './components/HeroSection';
import ProcessFlow from './components/ProcessFlow';

export default function Landing() {
  return (
    <Container>
      <HeroSection />
      <ProcessFlow />
    </Container>
  );
}