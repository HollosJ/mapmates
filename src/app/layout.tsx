import Nav from "@/components/Nav";
import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "@/lib/auth";
import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Map Mates",
  description: "Show off your own online scratch map",
};

export const viewport: Viewport = {
  themeColor: "#3730a3",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} min-h-dvh bg-offwhite antialiased`}
      >
        <SessionProvider session={session}>
          <Nav />

          {children}

          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
