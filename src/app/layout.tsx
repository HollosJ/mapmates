import Nav from '@/components/Nav';
import SessionProvider from '@/components/SessionProvider';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Map Mates',
  description: 'Show off your own online scratch map',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased min-h-dvh`}>
        <SessionProvider session={session}>
          <Nav />

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
