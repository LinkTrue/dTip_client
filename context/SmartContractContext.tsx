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
    const { signer } = useBlockchain();
    const [smartContractService, setSmartContractService] = useState<BlockchainServiceInterface | null>(null);

    useEffect(() => {
        if (!smartContractService && signer) {
            try {
                const service = SmartContractService(signer)
                setSmartContractService(service);
            } catch (error: any) {
                toast.error("Failed to setup Web3!")
            }
        }
    }, [signer]);


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
