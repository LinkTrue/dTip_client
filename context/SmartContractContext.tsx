"use client"
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { SmartContractService, BlockchainServiceInterface } from "@/lib/SmartContractService";
import { useBlockchain } from "./BlockchainProvider";

interface SmartContractContextType {
    smartContractService: BlockchainServiceInterface | null;
}

const SmartContractContext = createContext<SmartContractContextType | undefined>(undefined);

export const SmartContractProvider: React.FC<
    { children: ReactNode }
> = ({ children }) => {
    const { chainId, signer } = useBlockchain();
    const [smartContractService, setSmartContractService] = useState<BlockchainServiceInterface | null>(null);

    useEffect(() => {
        if (!smartContractService && signer && chainId) {
            const service = SmartContractService(signer, chainId);
            setSmartContractService(service);
        }
    }, [signer, chainId, smartContractService]);


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
