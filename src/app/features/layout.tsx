import FeaturesLayout from "@/components/layout/features-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FeaturesLayout>{children}</FeaturesLayout>;
}
