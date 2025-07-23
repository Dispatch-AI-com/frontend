'use client';

import { Box, Container, styled } from '@mui/material';

import Footer from '../main-layout/Footer';
import Navbar from '../main-layout/Navbar';

const PageWrapper = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Navbar variant="green" />
      <Container component="main" sx={{ flex: 1 }}>
        {children}
      </Container>
      <Footer />
    </PageWrapper>
  );
}
