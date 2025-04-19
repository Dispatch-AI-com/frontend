import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "DispatchAI - Automated Call Handling",
  description: "Save time and grow your business with automated call handling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
