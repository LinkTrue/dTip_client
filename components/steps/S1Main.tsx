"use client"
import EllipsifiedWalletAddress from '@/components/EllipsifiedAddress';
import { useSteps } from '@/context/StepsContext'
import { useBlockchain } from "@/context/BlockchainProvider";
import BlockchainComponent from '../ConnectWallet';
import Link from 'next/link';

const S1Main = () => {
    const { nextStep } = useSteps();
    const { signer } = useBlockchain();

    return (
        <>
            <p
                className="pb-10 text-center text-2xl font-bold text-wrap"
            >
                Securely Share Your Crypto Addresses with <strong>Full Control</strong>
            </p>

            <ul className="list-inside list-disc text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                <li className="mb-2">
                    <strong>Full Ownership:</strong> Only {signer ?
                        <>
                            <EllipsifiedWalletAddress walletAddress={signer.address} /> {"owns"}
                        </>
                        : "YOU own"} all data
                </li>
                <li className="mb-2">
                    <strong>Exclusive Access:</strong>  Only {" "}
                    {signer ? <EllipsifiedWalletAddress walletAddress={signer?.address} /> : "YOU "} can modify data
                </li>
            </ul>

            <span className="pt-5">
                <Link href={"/@abc"}>Explore a sample profile to see how it looks {" "}
                    <i className="fas fa-external-link-alt"></i>
                </Link>
            </span>


            <div className="flex gap-4 items-center flex-col sm:flex-row">
                <div>
                    < BlockchainComponent />
                    <br />
                    {
                        signer &&
                        <button
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                            onClick={nextStep}
                        >
                            Build a profile
                        </button>
                    }
                </div >
            </div >
        </>
    )
};
export default S1Main;
