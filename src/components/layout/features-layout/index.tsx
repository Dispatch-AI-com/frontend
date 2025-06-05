import { Container } from '@mui/material';

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
      <FeaturesBanner />
      <FeaturesSection />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </>
  );
}
