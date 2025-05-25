import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Analytics } from "@vercel/analytics/react";
import { Toaster as SimpleToast } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";

import { StepsProvider } from "@/context/StepsContext";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { SmartContractProvider } from "@/context/SmartContractContext";
import { BlockchainProvider } from "@/context/BlockchainProvider";
import { LoggerProvider } from "@/context/LoggerContext";
import { PrivyProvider } from "@privy-io/react-auth";
import Link from "next/link";
import ConnectWallet from '@/components/ConnectWallet';

export const metadata: Metadata = {
  title: "dTip - Your ID-Fi Hub",
  description: 'The easiest way to share your finance addresses with no limits.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col`}
      >
        {/* Hero Section */}
        <header className="flex flex-col md:flex-row justify-between items-center pt-4 space-y-4 md:space-y-0 px-2">
          <Link href={"/"}>
            <div className="flex gap-1">
              <img src="/images/dtip_logo.png" width={24} height={24} />
              <h1 className="text-2xl font-bold ">dTip</h1>
            </div>
          </Link>
          <nav className="
          flex flex-wrap justify-center md:justify-end space-x-4 text-sm border-b 
          md:border-none 
          border-gray-300 
          pb-2 md:pb-0
          ">
            <React.Fragment key={0}>
              <Link href="https://dtip.gitbook.io/docs/" target="_blank" className="hover:underline">How it works</Link>
              <span className="hidden md:inline-block text-gray-400">|</span>
            </React.Fragment>
            <React.Fragment key={1}>
              <Link href="/start" className="hover:underline">Join</Link>
            </React.Fragment>
            <ConnectWallet />
          </nav>
        </header>

        <LoggerProvider>
          <PrivyProvider appId="cmb38tpev01tvl40mzw5q0pwe">
            <BlockchainProvider>
              <GlobalStateProvider>
                <StepsProvider>
                  <SmartContractProvider>
                    {children}
                    {/* Footer */}
                    <footer className="
                    mt-auto bg-black text-white text-center py-6 px-6
                    w-full mx-auto flex flex-col
                    items-center justify-center
                    gap-4
                    ">
                      <Link
                        href="https://dtip.gitbook.io/docs/"
                        className="hover:underline flex items-center"
                      >
                        <i className="fa-solid fa-question-circle fa-lg mr-2"></i>
                        Docs
                      </Link>

                      <Link
                        href="https://github.com/orgs/LinkTrue/repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center"
                      >
                        <i className="fa-brands fa-github fa-lg mr-2"></i>
                        Source Code
                      </Link>

                      <Link
                        className="text-md"
                        href="https://dtip.gitbook.io/docs/terms/terms-of-use"
                        target="_blank"
                      >
                        <i className="fa-solid fa-handshake fa-lg mr-2"></i>
                        TERMS OF USE
                      </Link>

                      <Link
                        href="https://t.me/+nGn36o2JAv42ODAx"
                        target="_blank"
                        className="hover:underline flex items-center"
                      >
                        <i className="fa-solid fa-face-smile fa-lg mr-2"></i>
                        Join the Community
                      </Link>
                    </footer>
                  </SmartContractProvider>
                </StepsProvider>
              </GlobalStateProvider>
            </BlockchainProvider>
          </PrivyProvider>
          <Toaster position="top-center" expand={true} />
          <SimpleToast />
          <Analytics />
        </LoggerProvider>
      </body>
    </html>
  );
}
