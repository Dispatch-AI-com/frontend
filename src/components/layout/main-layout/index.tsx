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
            <Container maxWidth={false}>
              <Navbar />
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