import { Container } from '@mui/material';

import Footer from '../main-layout/Footer';
import Navbar from '../main-layout/Navbar';
import AboutBannerSection from './Banner/AboutBannerSection';
import CallToActionSection from './CallToAction/CallToActionSection';

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar variant="dark" />
      <AboutBannerSection />
      <Container maxWidth="xl">{children}</Container>
      <CallToActionSection />
      <Footer />
    </>
  );
}
