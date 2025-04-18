import { Container } from '@mui/material';
import HeroSection from '../components/features/landing/HeroSection';
import Footer from '../components/features/landing/Footer';


export default function LandingPage() {
  return (
    <Container>
      <HeroSection />
      <Footer />
    </Container>
  );
}