import ProductsLayout from '@/components/layout/products-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProductsLayout>{children}</ProductsLayout>;
}
