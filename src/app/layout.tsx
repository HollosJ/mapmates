import "@/app/globals.css";
import Nav from "@/components/Nav";
import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "@/lib/auth";
import type { Metadata, Viewport } from "next";
import { getServerSession } from "next-auth";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { Bricolage_Grotesque, Lato } from "next/font/google";

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      <head>
        <meta name="apple-mobile-web-app-title" content="Map Mates" />
      </head>

      <body
        className={`${lato.variable} ${bricolageGrotesque.variable} min-h-dvh bg-offwhite antialiased`}
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
