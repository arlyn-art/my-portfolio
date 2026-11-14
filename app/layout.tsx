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

const siteUrl = "https://arlynarta.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arlyn Arta Pradipa | Full Stack Developer",
    template: "%s | Arlyn Arta Pradipa",
  },
  description:
    "Portfolio resmi Arlyn Arta Pradipa, Full Stack Developer berbasis di Jakarta yang berpengalaman membangun aplikasi web modern menggunakan Laravel, Next.js, React, dan Tailwind CSS.",
  keywords: [
    "Arlyn Arta Pradipa",
    "Full Stack Developer",
    "Web Developer Jakarta",
    "Laravel Developer",
    "Next.js Developer",
    "React Developer",
    "Portfolio Programmer",
  ],
  authors: [{ name: "Arlyn Arta Pradipa", url: siteUrl }],
  creator: "Arlyn Arta Pradipa",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Arlyn Arta Pradipa Portfolio",
    title: "Arlyn Arta Pradipa | Full Stack Developer",
    description:
      "Lihat karya, proyek web, dan keahlian pengembangan aplikasi Full Stack oleh Arlyn Arta Pradipa.",
    images: [
      {
        url: "/assets/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Arlyn Arta Pradipa - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arlyn Arta Pradipa | Full Stack Developer",
    description:
      "Portfolio resmi Arlyn Arta Pradipa, Full Stack Developer (Laravel, Next.js, React).",
    images: ["/assets/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans bg-slate-950 text-white flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}