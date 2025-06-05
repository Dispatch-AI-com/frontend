import { Box, Container } from '@mui/material';

import FeaturesBanner from '@/app/features/components/FeaturesBanner';
import FeaturesSection from '@/app/features/components/FeaturesSection';

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
      {/* Banner 区块 */}
      <Box sx={{ background: '#060606', width: '100%' }}>
        <Container maxWidth="xl">
          <FeaturesBanner />
        </Container>
      </Box>
      {/* Features Section 区块 */}
      <Box sx={{ background: '#fafafa', width: '100%' }}>
        <Container maxWidth="xl">
          <FeaturesSection />
        </Container>
      </Box>
      {/* 其他 children 区块 */}
      <Box sx={{ background: '#ffffff', width: '100%' }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
