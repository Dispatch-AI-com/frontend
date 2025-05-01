import type { Metadata } from "next";

import Footer from '@/components/features/landing/Footer';
import Navbar from '@/components/features/landing/Navbar';
import ThemeProvider from '@/components/providers/ThemeProvider';

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}