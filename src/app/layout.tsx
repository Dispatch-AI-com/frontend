import type { Metadata } from "next";
import ThemeProvider from '@/components/providers/ThemeProvider';
import Navbar from '@/components/features/landing/Navbar';
import Footer from '@/components/features/landing/Footer';

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
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}