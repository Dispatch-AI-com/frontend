import { Box, Container } from '@mui/material';

import FeaturesBanner from '@/app/(public)/features/components/FeaturesBanner';
import FeaturesSection from '@/app/(public)/features/components/FeaturesSection';

import Footer from '../main-layout/Footer';
import Navbar from '../main-layout/Navbar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar variant="dark" />
      <Box id="features-banner" sx={{ background: '#060606', width: '100%' }}>
        <Container maxWidth="xl">
          <FeaturesBanner />
        </Container>
      </Box>
      <Box sx={{ background: '#fafafa', width: '100%' }}>
        <Container maxWidth="xl">
          <FeaturesSection />
        </Container>
      </Box>
      <Box sx={{ background: '#ffffff', width: '100%' }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
