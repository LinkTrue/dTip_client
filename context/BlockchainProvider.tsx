"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { useLogger } from '@/context/LoggerContext';
import { ethers, VoidSigner, ZeroAddress } from "ethers";

interface BlockchainContextType {
    isConnected: boolean;
    isConnecting: boolean;
    networkName: string;
    chainId: number;
    signer: any;
    handleConnectWallet: (usingMetamask: boolean) => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { log, logException } = useLogger();
    const [networkName, setNetworkName] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [provider, setProvider] = useState<ethers.BrowserProvider | ethers.JsonRpcProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | VoidSigner | null>(null);
    const [chainId, setChainId] = useState<number>(0);
    const [isConnecting, setIsConnecting] = useState<boolean>(false);

    const CUSTOM_RPC_URL = "https://sepolia.optimism.io";  // Your custom RPC URL

    useEffect(() => {
        if (!isConnected) return;

        const handleChainChanged = () => {
            window.location.reload();  // Reload the page when the chain changes
        };

        const handleAccountsChanged = () => {
            if (signer) {
                window.location.reload();
            }
        };

        if (typeof window !== "undefined" && (window as any).ethereum) {
            (window as any).ethereum.on("chainChanged", handleChainChanged);
            (window as any).ethereum.on("accountsChanged", handleAccountsChanged);
        }

        return () => {
            if (typeof window !== "undefined" && (window as any).ethereum) {
                (window as any).ethereum.removeListener("chainChanged", handleChainChanged);
                (window as any).ethereum.removeListener("accountsChanged", handleAccountsChanged);
            }
        };
    }, [isConnected, signer]);

    useEffect(() => {
        setOnDisconnectCallback(() => {
            setSigner(null);
            setNetworkName("");
            setIsConnected(false);
            log('Disconnected from provider');
            alert("Wallet disconnected");
        });
    }, []);

    const onDisconnectCallback = useRef<(() => void) | null>(null);
    const setOnDisconnectCallback = (callback: () => void): void => {
        onDisconnectCallback.current = callback;
    };

    const connectWallet = async (usingMetamask: boolean = true): Promise<void> => {
        let ethersProvider;


        if (usingMetamask) {
            // Check if MetaMask is available and use it, otherwise use the custom RPC provider
            if (typeof window !== "undefined" && (window as any).ethereum) {
                const metaMaskProvider = (window as any).ethereum;
                await metaMaskProvider.request({ method: 'eth_requestAccounts' });
                const chainIdRaw = await metaMaskProvider.request({ method: 'eth_chainId' });
                setChainId(parseInt(chainIdRaw, 16));

                ethersProvider = new ethers.BrowserProvider(metaMaskProvider);

                // Get signer only when using MetaMask
                const walletSigner = await ethersProvider.getSigner();
                setSigner(walletSigner);


            } else {
                throw new Error("No MetaMask browser extension found. Please install MetaMask.");
            }
        } else {
            log('MetaMask not found, using custom RPC node');
            ethersProvider = new ethers.JsonRpcProvider(CUSTOM_RPC_URL);
            const network = await ethersProvider.getNetwork();
            setChainId(Number(network.chainId));

            const fallbackSigner = new ethers.VoidSigner(ZeroAddress, ethersProvider);

            // No need for a signer in this case, just read-only operations
            setSigner(fallbackSigner);  // Set signer as null for custom RPC
        }

        setProvider(ethersProvider);

        const network = await ethersProvider.getNetwork();
        setNetworkName(network.name);

        setIsConnected(true);
        log('Wallet connected');
    };

    const handleConnectWallet = async (usingMetamask: boolean = true) => {
        if (isConnecting) return;

        setIsConnecting(true);

        try {
            await connectWallet(usingMetamask);
            setIsConnecting(false);
        } catch (error: any) {
            log("Failed to connect wallet:");
            logException(error);
            alert("Failed to connect to Blockchain. Make sure MetaMask is installed.");
            setIsConnecting(false);
        }
    };

    return (
        <BlockchainContext.Provider value={
            {
                isConnected,
                networkName,
                chainId,
                signer,
                isConnecting,
                handleConnectWallet
            }
        }>
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
