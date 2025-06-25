import { Box } from '@mui/material';

import Footer from '../main-layout/Footer';
import Navbar from '../main-layout/Navbar';

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar variant="dark" />
      <Box>{children}</Box>
      <Footer />
    </>
  );
}
