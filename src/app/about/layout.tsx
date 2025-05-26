import AboutUsLayoutStyled from '@/components/layout/aboutus-layout';

export default function AboutUsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AboutUsLayoutStyled>{children}</AboutUsLayoutStyled>;
}
