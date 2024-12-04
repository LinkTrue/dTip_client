"use client";

import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen">

      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-2xl z-0"></div>


      {/* Hero Section */}
      <header className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto p-6 lg:p-12 rounded-lg">
        {/* Hero Message */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            Crypto Donation Platform
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Receive value to multiple blockchain wallets through one simple link.
          </p>
          <div className="flex justify-center lg:justify-start gap-6 mt-8">
            <Link
              href="/faq"
              className="px-6 py-3 bg-blue-200 text-white rounded-lg hover:bg-blue-400 transition-shadow"
            >
              Learn More
            </Link>
            <Link
              href="/start"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-300 transition-shadow"
            >
              Launch App!
            </Link>
          </div>
        </div>

        {/* Floating Images */}
        <div className="lg:w-1/2 relative h-80 md:h-96 lg:h-[28rem] w-full flex items-center justify-center mt-2 opacity-30">
          <div className="relative w-full h-full">
            {/* Image 1 */}
            <Image
              src="/icons/chains/ton.svg"
              alt="TON Blockchain Icon"
              width={80}
              height={80}
              className="absolute top-5 left-8 md:left-16 lg:left-20 animate-float-slow-1"
            />
            {/* Image 2 */}
            <Image
              src="/icons/chains/btc.svg"
              alt="Bitcoin Blockchain Icon"
              width={600}
              height={600}
              className="absolute top-24 left-6 md:left-16 lg:left-24 animate-float-fast opacity-40 hover:opacity-100"
            />
            {/* Image 3 */}
            <Image
              src="/icons/landing/youtube.svg"
              alt="Youtube Icon"
              width={90}
              height={90}
              className="absolute top-1 right-1 md:right-14 lg:right-24 animate-float-slow-3"
            />
            {/* Image 4 */}
            <Image
              src="/icons/landing/mastercard.svg"
              alt="Master Card Icon"
              width={80}
              height={80}
              className="absolute bottom-12 right-6 md:right-16 lg:right-28 animate-float-slow-2"
            />
            {/* Image 5 */}
            <Image
              src="/icons/landing/shopify.svg"
              alt="Shopify Icon"
              width={100}
              height={100}
              className="absolute top-32 right-12 md:right-20 lg:right-28 animate-float-medium"
            />
            {/* Image 6 */}
            <Image
              src="/icons/landing/twitch.svg"
              alt="Twitch Icon"
              width={80}
              height={80}
              className="absolute top-32 left-12 md:left-16 lg:left-24 animate-float-slow-2"
            />
            {/* Image 7 */}
            <Image
              src="/icons/landing/discord.svg"
              alt="Discord Icon"
              width={80}
              height={80}
              className="absolute bottom-12 left-8 md:left-24 lg:left-32 animate-float-medium"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto p-6 lg:p-12 mt-12 rounded-lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            Unlock <span className="text-indigo-600">LinkTrue</span> Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1: Single Decentralized Link */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <i className="fa-solid fa-link text-4xl mb-6"></i>
            <h3 className="text-xl font-semibold">Unified Crypto Link</h3>
            <p className="text-center mt-2">
              Get all your crypto wallets in one link.
            </p>
          </div>

          {/* Feature 2: Easy & Secure Donations */}
          <div className="p-6 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <i className="fa-solid fa-shield-alt text-4xl mb-6"></i>
            <h3 className="text-xl font-semibold">Secure Donations</h3>
            <p className="text-center mt-2">
              Make donations across blockchains easy and secure.
            </p>
          </div>

          {/* Feature 3: Control Over Your Data */}
          <div className="p-6 bg-gradient-to-r from-gray-700 to-blue-700 text-white rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <i className="fa-solid fa-key text-4xl mb-6"></i>
            <h3 className="text-xl font-semibold">Data Ownership</h3>
            <p className="text-center mt-2">
              Keep full control over your data.
            </p>
          </div>

          {/* Feature 4: No Fees from LinkTrue */}
          <div className="p-6 bg-gradient-to-r from-indigo-400 to-pink-400 text-white rounded-lg shadow-lg flex flex-col items-center transition-transform transform hover:scale-105">
            <i className="fa-solid fa-coins text-4xl mb-6"></i>
            <h3 className="text-xl font-semibold">No Hidden Fees</h3>
            <p className="text-center mt-2">
              Only pay the blockchain network fee once.
            </p>
          </div>
        </div>
      </section>

      <div className="text-indigo-400 hover:text-indigo-700 mt-16 pb-6 z-20">
        <Link href={'/@miladtsx'} target='_blank' className="text-2xl">
          Example Profile{' '}
          <i className="fas fa-external-link-alt"></i>
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;
