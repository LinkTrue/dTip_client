import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Toaster as SimpleToast } from "@/components/ui/toaster"
import { Toaster } from "@/components/ui/sonner"

import { StepsProvider } from "@/context/StepsContext";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { SmartContractProvider } from '@/context/SmartContractContext';
import { BlockchainProvider } from '@/context/BlockchainProvider';
import { LoggerProvider } from '@/context/LoggerContext';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'LinkTrue',
  description: 'Your uncensorable crypto profile'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="/" className="flex text-center justify-center pt-8 text-2xl">
          <strong>Link</strong>True<sup><span className="text-xs">Join now!</span></sup>
        </a>
        <LoggerProvider>
          <BlockchainProvider>
            <GlobalStateProvider>
              <StepsProvider>
                <SmartContractProvider>
                  {children}
                </SmartContractProvider>
              </StepsProvider>
            </GlobalStateProvider>
          </BlockchainProvider>
          <Toaster position="top-center" expand={true} />
          <SimpleToast />
        </LoggerProvider>
      </body>
    </html>
  );
}
