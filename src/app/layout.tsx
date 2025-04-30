import type { Metadata } from "next";
import ThemeProvider from '@/components/providers/ThemeProvider';
import Navbar from '@/components/layout/header-body-footer-layout/Navbar';
import Footer from '@/components/layout/header-body-footer-layout/Footer';

export const metadata: Metadata = {
  title: "Dispatch AI",
  description: "Dispatch AI - Let AI Handle Your Calls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}