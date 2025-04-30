import { Container } from '@mui/material';
import Navbar from "./Navbar";
import Footer from "./Footer";

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
            
            <Container maxWidth="xl">
                {children}
            </Container>
            
            <Container maxWidth="xl">
                <Footer />
            </Container>
        </>
    );
}