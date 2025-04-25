import type { Metadata } from "next";
import ThemeRegister from '@/components/providers/ThemeRegister';

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
        <ThemeRegister>
          {children}
        </ThemeRegister>
      </body>
    </html>
  );
}