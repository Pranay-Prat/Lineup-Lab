
// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import AuthProvider from "@/context/AuthProvider";
import { Outfit } from 'next/font/google';
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/Footer";


const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const siteConfig = {
  name: "Lineup Lab",
  description: "Create stunning football lineups with our intuitive drag-and-drop builder. Design custom formations, add player names, export high-quality images, and share your tactical masterpieces with the world.",
  url: "https://football-lineup-maker.vercel.app", 

  keywords: [
    "lineup lab",
    "football lineup maker",
    "soccer lineup builder",
    "football formation creator",
    "tactical board",
    "football tactics",
    "soccer formation",
    "team lineup generator",
    "football team builder",
    "create football lineup",
    "lineup creator",
    "football formation maker",
    "soccer tactics",
    "starting eleven generator",
    "football pitch builder",
    "custom football lineup",
  ],
  author: "Pranay Pratap",
};

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Lineup Lab - Free Football Lineup Maker",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,

  // Canonical URL
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@lineuplab", 
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // App Manifest
  manifest: "/manifest.json",

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Verification (add your verification codes)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },

  // Additional meta tags
  category: "sports",
  classification: "Sports/Football/Tools",

  // App-specific
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Other
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": siteConfig.name,
    "mobile-web-app-capable": "yes",
    "theme-color": "#10B981", // Emerald green theme
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans bg-background text-foreground`}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}