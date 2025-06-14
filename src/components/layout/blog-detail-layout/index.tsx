import { Container } from '@mui/material';

import Navbar from '../main-layout/Navbar';

export default function BlogDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {children}
      </Container>
    </>
  );
}
