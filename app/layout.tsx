import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ChatWidget from "@/components/ai/chat-widget";

export const metadata: Metadata = {
  title: "Gourmet Brand | Modern Multi-Branch Restaurant",
  description: "Experience fine dining at our multiple locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
