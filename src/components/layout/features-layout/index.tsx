import { Container } from '@mui/material';
import Navbar from "../main-layout/Navbar"
import Footer from "../main-layout/Footer"

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Container maxWidth="xl">
              <Navbar variant='dark'/>
            </Container>
            
            <Container maxWidth="xl" sx={{py: 4}} >
                {children}
            </Container>
            
            <Container maxWidth="xl">
                <Footer />
            </Container>
        </>
    );
}