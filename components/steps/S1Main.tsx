"use client"
import EllipsifiedWalletAddress from '@/components/EllipsifiedAddress';
import { useSteps } from '@/context/StepsContext'
import { useBlockchain } from "@/context/BlockchainProvider";
import BlockchainComponent from '../ConnectWallet';
import Link from 'next/link';
import Typed from 'typed.js';
import { useEffect, useRef } from 'react';

const S1Main = () => {
    const { nextStep } = useSteps();
    const { signer } = useBlockchain();

    // Create a reference to attach the Typed.js animation
    const typedElement = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedElement.current, {
            strings: [
                'Influencers',
                'Entrepreneurs',
                'Creators',
                "Solo Builders",

            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
            fadeOut: false,
        });

        return () => {
            typed.destroy(); // Destroy Typed.js instance on unmount
        };
    }, []);

    console.log(signer?.address);


    return (
        <div className='flex flex-col gap-4 text-center'>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
                <p className="text-lg font-semibold text-gray-900 mb-4">
                    For <strong><span ref={typedElement}></span></strong>
                </p>

                <p className="text-gray-700 mb-4">
                    Share a single link in your bio: containing your wallet addresses and any www website.
                </p>

                <h2 className="text-2xl font-bold text-blue-600 mb-2">LinkTrue</h2>

                <p className="text-gray-700 mb-4">
                    Unlike Linktr.ee, LinkTrue is fully decentralized and open-source, giving you complete ownership of your data without relying on third parties.
                </p>

                <p className="text-lg font-medium text-gray-900">
                    Own your data. Share with confidence.
                    <br />
                    Try now
                </p>
            </div>


            {signer &&
                <ul className="list-inside list-disc 
            md:text-xl font-thin text-xs lg:text-2xl
            text-center font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">
                        <EllipsifiedWalletAddress walletAddress={signer?.address} />
                        can
                        <a href="/" className='shadow-lg text-red-400'>
                            <b> modify </b>
                        </a>
                        data
                    </li>
                </ul>
            }

            <span className="p-10">
                <Link href={'/@abc'}>
                    View a sample profile{' '}
                    <i className="fas fa-external-link-alt"></i>
                </Link>
            </span>

            <div className="flex gap-4 items-center flex-col">
                <div>
                    <BlockchainComponent />
                    {signer && (
                        <button
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                            onClick={nextStep}
                        >
                            Build a profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
export default S1Main;
