'use client';

import { Box, Container } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import FeaturesSection from '@/app/(public)//features/components/FeaturesSection';
import FeaturesBanner from '@/app/(public)/features/components/FeaturesBanner';

import Footer from '../main-layout/Footer';
import Navbar from '../main-layout/Navbar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/features' && typeof window !== 'undefined') {
      if (window.location.hash === '#features-banner') {
        const banner = document.getElementById('features-banner');
        if (banner) {
          banner.scrollIntoView({ behavior: 'instant' });
        }
        window.history.replaceState({}, document.title, '/features');
      }
    }
  }, [pathname]);
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
