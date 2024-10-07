"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { useLogger } from '@/context/LoggerContext';
import { ethers, VoidSigner, ZeroAddress } from "ethers";
import { toast } from "sonner";

const supportedBlockchains = [
    // 10, //TODO uncomment on Mainnet launch
    11155420
];
interface BlockchainContextType {
    isConnected: boolean;
    isConnecting: boolean;
    networkName: string;
    chainId: number;
    signer: any;
    provider: any;
    handleConnectWallet: (usingMetamask: boolean) => Promise<Boolean>;
    handleDisconnectWallet: () => void;
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

    const CUSTOM_RPC_URL = "https://sepolia.optimism.io";
    // const CUSTOM_RPC_URL = "https://optimism.drpc.org";  //TODO use mainnet


    const handleDisconnectWallet = () => {
        debugger
        setSigner(null);
        setNetworkName("");
        setIsConnected(false);
        log('Disconnected from provider');
    }

    const connectWallet = async (usingMetamask: boolean = true): Promise<void> => {
        let ethersProvider;

        if (usingMetamask) {
            // Check if MetaMask is available and use it, otherwise use the custom RPC provider
            if (typeof window !== "undefined" && (window as any).ethereum) {
                const metaMaskProvider = (window as any).ethereum;
                const accounts = await metaMaskProvider.request({ method: 'eth_requestAccounts' });
                let chainIdRaw = await metaMaskProvider.request({ method: 'eth_chainId' });
                let chainId = parseInt(chainIdRaw, 16);

                // Add Optimism to MetaMask.
                if (!supportedBlockchains.includes(chainId)) {
                    await (window as any).ethereum.request(
                        // {
                        //     method: 'wallet_addEthereumChain',
                        //     params: [{
                        //         chainId: '0xA', // Hexadecimal for 11155111 (Sepolia Testnet)
                        //         chainName: 'OP Mainnet',
                        //         nativeCurrency: {
                        //             name: 'ETH Token',
                        //             symbol: 'ETH',
                        //             decimals: 18
                        //         },
                        //         rpcUrls: ['https://mainnet.optimism.io'],
                        //         blockExplorerUrls: ['https://optimistic.etherscan.io/']
                        //     }]
                        // },
                        {
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0xaa37dc', // Hexadecimal for 11155111 (Sepolia Testnet) or 11155420
                                chainName: 'OP Sepolia Testnet',
                                nativeCurrency: {
                                    name: 'Sepolia Ether',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                rpcUrls: ['https://sepolia.optimism.io'],
                                blockExplorerUrls: ['https://optimism-sepolia.blockscout.com']
                            }]
                        }

                    );
                }

                chainIdRaw = await metaMaskProvider.request({ method: 'eth_chainId' });
                chainId = parseInt(chainIdRaw, 16);

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

            const fallbackSigner = new ethers.VoidSigner(ZeroAddress, ethersProvider);

            // No need for a signer in this case, just read-only operations
            setSigner(fallbackSigner);  // Set signer as null for custom RPC
        }

        setProvider(ethersProvider);

        const network = await ethersProvider.getNetwork();
        setChainId(Number(network.chainId));

        setIsConnected(true);
        log('Wallet connected');
    };

    const handleConnectWallet = async (usingMetamask: boolean = true) => {
        if (isConnecting) return false;

        setIsConnecting(true);

        try {
            await connectWallet(usingMetamask);
            setIsConnecting(false);
        } catch (error: any) {
            if (error.message.includes("User rejected the request")) {
                toast.warning("To own a profile, connect your wallet and change the network to Ethereum Layer 2 (Optimism).")
            } else {
                debugger
                log("Failed to connect wallet:");
                logException(error);
            }
            setIsConnecting(false);
            return false;
        }
        return true;
    };

    return (
        <BlockchainContext.Provider value={
            {
                isConnected,
                networkName,
                chainId,
                signer,
                isConnecting,
                provider,
                // smartContract,
                handleConnectWallet,
                handleDisconnectWallet
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
