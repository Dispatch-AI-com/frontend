import BlogDetailLayout from '@/components/layout/blog-detail-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <BlogDetailLayout>{children}</BlogDetailLayout>;
}
