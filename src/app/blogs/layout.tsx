import BlogLayout from "@/components/layout/blog-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BlogLayout>
        {children}
    </BlogLayout>
  );
}