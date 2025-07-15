import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Outfit } from 'next/font/google';
const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Football Lineup Maker",
  description: "Create and customize your football lineup with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={outfit.className} >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        
      </body>
    </html>
  );
}
