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
  title: 'dTip',
  description: 'Decentralized Tip'
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
        <Link href="/" className="flex text-center justify-center pt-8 text-2xl animate-pulse">
          <strong>L</strong>ink<strong>T</strong>rue
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
                    {/* Footer */}
                    <footer className="relative z-10 mt-10 p-4 bg-gray-500 text-white text-center rounded-lg shadow-lg w-full mx-auto flex flex-col items-center justify-center">

                      <div className="flex justify-between w-full mt-6">
                        <Link href="/faq" className="hover:underline flex items-center">
                          <i className="fa-solid fa-question-circle fa-lg mr-2"></i>
                          FAQ
                        </Link>
                        <Link href="/roadmap" className="hover:underline flex items-center">
                          <i className="fa-solid fa-road fa-lg mr-2"></i>
                          Roadmap
                        </Link>
                        <a
                          href="https://github.com/orgs/LinkTrue/repositories"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center"
                        >
                          <i className="fa-brands fa-github fa-lg mr-2"></i>
                          trust but VERIFY
                        </a>
                      </div>
                      <Link href="https://t.me/+nGn36o2JAv42ODAx" target="_blank" className="hover:underline flex items-center mt-8">
                        <i className="fa-solid fa-question-circle fa-lg mr-2"></i>
                        Join the Community
                      </Link>
                      <p className="text-sm mt-12">
                        &copy; {new Date().getFullYear()} dTip.
                      </p>
                    </footer>
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
