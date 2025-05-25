"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { usePrivy, User } from '@privy-io/react-auth';
import { ethers } from "ethers";
import { useLogger } from '@/context/LoggerContext'; // Assuming useLogger is still needed

// const supportedBlockchains = [
//     1868, // Soneium
//     1946 // Soneium Minato Testnet
// ]; // This might be handled by Privy or configured elsewhere now

interface BlockchainContextType {
    walletAddress: string | undefined;
    isConnected: boolean;
    networkName: string; // This might need to be derived differently or removed if Privy handles it
    chainId: number | undefined; // This will come from the Privy wallet or provider
    signer: ethers.Signer | null;
    ethersProvider: ethers.BrowserProvider | null; // Renamed from provider
    login: () => Promise<User | null>;
    logout: () => Promise<void>;
    user: User | null;
    ready: boolean;
    authenticated: boolean;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { log, logException } = useLogger(); // Assuming logger is still useful
    const privy = usePrivy();

    const [ethersProvider, setEthersProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.Signer | null>(null);
    const [networkName, setNetworkName] = useState<string>(""); // May need adjustment
    const [chainId, setChainId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const setupProviderAndSigner = async () => {
            if (privy.ready && privy.authenticated && privy.user?.wallet?.provider) {
                try {
                    const externalProvider = await privy.user.wallet.getEthereumProvider();
                    if (externalProvider) {
                        const newEthersProvider = new ethers.BrowserProvider(externalProvider);
                        setEthersProvider(newEthersProvider);
                        const network = await newEthersProvider.getNetwork();
                        setNetworkName(network.name);
                        setChainId(Number(network.chainId));
                        
                        const newSigner = await newEthersProvider.getSigner();
                        setSigner(newSigner);
                        log('Ethers provider and signer set up from Privy wallet.');
                    } else {
                        throw new Error("Failed to get Ethereum provider from Privy wallet.");
                    }
                } catch (error) {
                    logException(error);
                    setEthersProvider(null);
                    setSigner(null);
                    setNetworkName("");
                    setChainId(undefined);
                }
            } else {
                setEthersProvider(null);
                setSigner(null);
                setNetworkName("");
                setChainId(undefined);
                if (privy.ready && !privy.authenticated) {
                    log('User is not authenticated, clearing provider and signer.');
                }
            }
        };

        setupProviderAndSigner();
    }, [privy.ready, privy.authenticated, privy.user?.wallet?.provider, log, logException]);
    
    const walletAddress = privy.user?.wallet?.address;
    const isConnected = privy.ready && privy.authenticated && !!privy.user?.wallet;

    return (
        <BlockchainContext.Provider value={{
            walletAddress,
            isConnected,
            networkName,
            chainId,
            signer,
            ethersProvider,
            login: privy.login,
            logout: privy.logout,
            user: privy.user,
            ready: privy.ready,
            authenticated: privy.authenticated,
        }}>
            {children}
        </BlockchainContext.Provider>
    );
};

export const useBlockchain = () => {
    const context = useContext(BlockchainContext);
    if (context === undefined) {
        throw new Error("useBlockchain must be used within a BlockchainProvider");
    }
    return context;
};
