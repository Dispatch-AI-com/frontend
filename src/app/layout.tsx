import StoreProvider from '@/app/StoreProvider';
import ClientProviders from '@/components/providers/ClientProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <StoreProvider>{children}</StoreProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
