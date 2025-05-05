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
            <Container maxWidth={false}>
              <Navbar variant='dark'/>
            </Container>
            
            <Container maxWidth="xl" sx={{py: 4}} >
                {children}
            </Container>
            
            <Container maxWidth={false}>
                <Footer />
            </Container>
        </>
    );
}