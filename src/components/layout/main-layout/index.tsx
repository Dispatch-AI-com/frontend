import { Container } from '@mui/material';

import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
