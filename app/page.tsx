"use client";

import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center mb-10">
        <div className="flex flex-col text-lg font-bold text-red-500 mb-12">
          <p className="mb-4">Lost donations?</p>
          <p className="mb-4">Too much platform Fees?</p>
          <p className="mb-4">Must trust, but can&apos;t verify?</p>
          <p className="mb-4">Payment processing taking too long?</p>
        </div>
        <div className="flex justify-center my-4">
          <Image src="/images/donation_neon.png" alt="Bitcoin"
            width={160} height={160} className="opacity-70 rounded-2xl" style={{ filter: 'brightness(80%)' }} />
        </div>

        {/* {<h1 className="text-5xl font-bold mb-4"> <span>&#8383;</span></h1>} */}
        <p className="mt-4 text-lg text-gray-600">
          Enable Crypto Donations on <br />
          <span
            className="text-red-500 font-bold animate-pulse shadow-sm rounded-lg p-1 border-red-500">
            ANY BLOCKCHAIN
          </span>
          network!
        </p>

        <div className="flex justify-center my-6 opacity-55">
          {'{'}
          <Image src="icons/chains/ada.svg" alt="supported_chain_ada" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/algo.svg" alt="supported_chain_algo" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/avax.svg" alt="supported_chain_avax" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/bnb.svg" alt="supported_chain_bnb" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/btc.svg" alt="supported_chain_btc" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/dot.svg" alt="supported_chain_dot" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/eth.svg" alt="supported_chain_eth" width={24} height={24} className="mr-1" />


          <span className="w-6 h-6 mr-1">
            ...
          </span>

          <Image src="icons/chains/matic.svg" alt="supported_chain_matic" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/sol.svg" alt="supported_chain_sol" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/ton.svg" alt="supported_chain_ton" width={24} height={24} className="mr-1" />
          <Image src="icons/chains/trx.svg" alt="supported_chain_trx" width={24} height={24} className="mr-1" />
          {'}'}

        </div>

      </header>

      <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why <span>&#8383;</span>?</h2>
            <p className="text-lg mb-8 break-all">Cryptocurrencies offer a decentralized, secure, and transparent way to transfer value. They empower individuals to take control of their financial transactions, free from intermediaries and their associated fees.</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Why LinkTrue?</h2>
            <ul className="list-disc list-inside mb-8 space-y-2">
              <li>Share a single link</li>
              <li>Full ownership and control</li>
              <li>Secure and transparent as <span>&#8383;</span></li>
              <li>Free and open-source, forever</li>
            </ul>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <h2 className="text-3xl font-semibold mb-4 w-full">Who Should Use LinkTrue?</h2>
            <div className="p-4 bg-white rounded-lg shadow-md w-1/2 md:w-1/4 transition-transform duration-200 ease-in-out transform hover:scale-110 flex items-center hover:bg-blue-100">
              <i className="fa fa-hand-holding-heart text-2xl mr-2"></i>
              <p className="text-lg mb-2">Non-profits</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md w-1/2 md:w-1/4 transition-transform duration-200 ease-in-out transform hover:scale-110 flex items-center hover:bg-green-100">
              <i className="fa fa-video-camera text-2xl mr-2"></i>
              <p className="text-lg mb-2">Creators</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md w-1/2 md:w-1/4 transition-transform duration-200 ease-in-out transform hover:scale-110 flex items-center hover:bg-yellow-100">
              <i className="fa fa-handshake text-2xl mr-2"></i>
              <p className="text-lg mb-2">Cause supporters</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md w-1/2 md:w-1/4 transition-transform duration-200 ease-in-out transform hover:scale-110 flex items-center hover:bg-red-100">
              <i className="fa fa-gift text-2xl mr-2"></i>
              <p className="text-lg mb-2">Donation recipients</p>
            </div>
            <p className="text-lg mb-8 break-all w-full">LinkTrue simplifies cryptocurrency donations for users from all backgrounds, fostering community engagement and support.</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/faq" className="inline-block px-4 py-2 text-white bg-gray-500 rounded hover:bg-blue-300 mr-2">
            Learn More
          </Link>
          <Link href="/main" className="inline-block px-4 py-2 text-white bg-orange-600 rounded hover:bg-blue-700">
            MINT yours now!
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LandingPage; 