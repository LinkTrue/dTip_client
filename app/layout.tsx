import type { Metadata } from "next";
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
import Link from "next/link";

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
        <Link href="/" className="flex text-center justify-center pt-8 text-2xl">
          <strong>L</strong>ink<strong>T</strong>rue<sup><span className="text-xs">Join now!</span></sup>
        </Link>
        <LoggerProvider>
          <BlockchainProvider>
            <GlobalStateProvider>
              <StepsProvider>
                <SmartContractProvider>
                  <div className="h-screen flex flex-col justify-between">
                    <div className="mx-4 my-4">
                      {children}
                    </div>
                    <footer className="flex flex-col text-center bg-gray-200 bg-foreground pt-1 gap-4">

                      <Link href="/faq">FAQ</Link>

                      <div className="">
                        <a
                          className="flex justify-center gap-2 hover:underline hover:underline-offset-4"
                          href="https://github.com/orgs/LinkTrue/repositories"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>
                            <i className="fa-brands fa-github text-xs"></i>
                          </span>
                          Explore source code
                        </a>
                      </div>

                      <Link href="/roadmap">ROADMAP</Link>
                    </footer>
                  </div>
                </SmartContractProvider>
              </StepsProvider>
            </GlobalStateProvider>
          </BlockchainProvider>
          <Toaster position="top-center" expand={true} />
          <SimpleToast />
        </LoggerProvider>
        <div className="badge">
          {"TESTNET"}
        </div>
      </body>
    </html>
  );
}
