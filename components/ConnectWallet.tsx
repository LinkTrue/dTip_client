import React from "react";
import { useBlockchain } from "@/context/BlockchainProvider";

const BlockchainComponent: React.FC = () => {
    const {
        handleConnectWallet,
        isConnecting,
        isConnected,
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
                    {isConnecting ? (
                        (<div className="spinner"></div>)
                    ) : 'Connect Wallet'}

                </button>
            )}
        </div>
    );
};

export default BlockchainComponent;
