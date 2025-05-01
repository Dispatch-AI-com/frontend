import { Container } from '@mui/material';

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Container maxWidth="xl">
              <Navbar />
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