import OnboardingLayout from '@/components/layout/onboarding-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OnboardingLayout>{children}</OnboardingLayout>;
}
