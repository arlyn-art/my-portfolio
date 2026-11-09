import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/partials/Navbar";
import Footer from "@/components/partials/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arlyn Arta Pradipa | Full Stack Developer",
  description: "Portfolio website of Arlyn Arta Pradipa",
  icons: {
    icon: "/assets/images/foto-profile.jpg",
    shortcut: "/assets/images/foto-profile.jpg",
    apple: "/assets/images/foto-profile.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className="bg-slate-950 text-white flex flex-col min-h-screen">
        <Navbar />

        <main className="grow pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}