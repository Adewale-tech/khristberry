import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"; // Import global styles
import { prisma } from "@/lib/db";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Krisberry Pizza Planet",
  description: "Chinese & Intercontinental Restaurant and Bakery",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const branches = await prisma.branch.findMany({
    select: { id: true, name: true }
  });

  return (
    <html lang="en">
      <body
        className={`antialiased bg-background text-foreground font-sans`}
      >
        <div className="flex flex-col min-h-screen">
          <Header branches={branches} />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
