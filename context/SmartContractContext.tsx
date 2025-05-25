"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { SmartContractService, BlockchainServiceInterface } from "@/lib/SmartContractService";
import { useBlockchain } from "./BlockchainProvider";
import { toast } from "sonner";

interface SmartContractContextType {
    smartContractService: BlockchainServiceInterface | null;
}

const SmartContractContext = createContext<SmartContractContextType | undefined>(undefined);

export const SmartContractProvider: React.FC<
    { children: ReactNode }
> = ({ children }) => {
    // Retrieve signer and chainId from the BlockchainProvider.
    // chainId is crucial for ensuring SmartContractService interacts with the correct blockchain network.
    const { signer, chainId } = useBlockchain(); 
    const [smartContractService, setSmartContractService] = useState<BlockchainServiceInterface | null>(null);

    useEffect(() => {
        // This effect hook re-initializes SmartContractService whenever the signer or chainId changes.
        // Signer changes when the user connects/disconnects a wallet or changes accounts.
        // ChainId changes when the user switches to a different blockchain network.
        if (signer && chainId) { // Check for both signer and chainId
            try {
                // Re-initialize SmartContractService with the new signer and chainId.
                // This is critical for multi-chain support, ensuring that contract interactions
                // are always targeted at the currently selected network and account.
                const service = SmartContractService(signer, chainId);
                setSmartContractService(service);
            } catch (error: any) {
                toast.error("Failed to setup Web3!");
            }
        } else {
            // If signer or chainId is unavailable (e.g., wallet disconnected),
            // set the service to null to prevent errors.
            setSmartContractService(null); 
        }
    }, [signer, chainId]); // Dependencies: re-run if signer or chainId changes.


    return (
        <SmartContractContext.Provider value={{ smartContractService }}>
            {children}
        </SmartContractContext.Provider>
    );
};

export const useSmartContract = () => {
    const context = useContext(SmartContractContext);
    if (context === undefined) {
        throw new Error("useSmartContract must be used within a SmartContractProvider");
    }
    return context.smartContractService;
};
