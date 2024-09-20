import React, { useEffect, useState } from "react";
import { useBlockchain } from "@/context/BlockchainProvider";
import { useLogger } from '@/context/LoggerContext';


const BlockchainComponent: React.FC = () => {
    const { log, logException } = useLogger();
    const {
        handleConnectWallet,
        networkName,
        isConnecting,
        isConnected,
        signer,
    } = useBlockchain();

    return (
        <div>
            {/* Button to connect the wallet */}
            {!isConnected && (
                <button
                    className="
                    rounded-full border border-solid border-transparent
                     transition-colors flex items-center justify-center
                      bg-foreground text-background gap-2
                       hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base 
                       h-10 sm:h-12 px-4 sm:px-5
                       "
                    onClick={() => handleConnectWallet(true)}
                >
                    {isConnecting ? 'Waiting for MetaMask to connect...' : 'Connect Wallet'}

                </button>
            )}
        </div>
    );
};

export default BlockchainComponent;
