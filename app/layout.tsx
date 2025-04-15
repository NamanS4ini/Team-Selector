import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from 'next/font/google';
import ProgressBar from '@/components/ProgressBar';

const poppins = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Team Selector",
  description: "Randomly select players, captains, and toss results for cricket matches.",
  themeColor: "#0d47a1",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} poppins-regular dark antialiased`}>
        <Navbar />
        <div>
          <ProgressBar />
          {children}
        </div>
      </body>
    </html>
  );
}
