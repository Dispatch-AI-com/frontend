import Navbar from "./Navbar";
import Footer from "./Footer";

export default function HeaderBodyFooterLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            </>
    );
}