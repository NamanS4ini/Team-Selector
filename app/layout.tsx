import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from 'next/font/google';
import ProgressBar from '@/components/ProgressBar'
import Head from "next/head";

const poppins = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Team Selector",
  description: "Randomly select players, captains, and toss results for cricket matches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d47a1" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <body
        className={` ${poppins.className} poppins-regular dark antialiased`}
      >
        <Navbar />
        <div className="">
        <ProgressBar />
        {children}
        </div>
      </body>
    </html>
  );
}
