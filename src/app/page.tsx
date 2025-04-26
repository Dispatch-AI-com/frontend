import { Container } from '@mui/material';
import HeroSection from '../components/features/landing/HeroSection';
import Navbar from '../components/features/landing/Navbar';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Container>
        <HeroSection />
      </Container>
    </>
  );
}