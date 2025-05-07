import { Container } from '@mui/material';

import Footer from "../main-layout/Footer"
import Navbar from "../main-layout/Navbar"

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Navbar variant='dark'/>
            <Container maxWidth="xl" sx={{py: 4}} >
                {children}
            </Container>
            <Footer />
        </>
    );
}