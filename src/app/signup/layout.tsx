import HeaderBodyFooterLayout from "@/components/layout/header-body-footer-layout";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HeaderBodyFooterLayout>
        {children}
    </HeaderBodyFooterLayout>
  );
}