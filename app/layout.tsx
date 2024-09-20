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
        <LoggerProvider>
          <BlockchainProvider>
            <GlobalStateProvider>
              <StepsProvider>
                <SmartContractProvider>

                  <div className="
            grid 
            grid-rows-[20px_1fr_20px] 
            items-center 
            justify-items-center 
            min-h-screen 
            p-8 pb-10 gap-16 sm:p-10 
            font-[family-name:var(--font-geist-sans)]
            ">
                    <a href="/" >
                      <Image
                        src="logo.svg"
                        alt="Next.js logo"
                        width={180}
                        height={38}
                        priority
                      />
                    </a>
                    {children}
                  </div>
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
