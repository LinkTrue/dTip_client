"use client"
import React, { useEffect, useState } from 'react';
import { Web3Item } from '@/context/GlobalStateContext';
import { toast } from 'sonner';
import TransferComponent from './TransferComponent';

interface IChain {
    name: string;
    chainId: number;
    shortName: string;
    networkId: number;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpc: string[];
    faucets: string[];
    infoURL: string;
}

export const ValueTransfer = ({ item }:
    { item: Web3Item }
) => {

    const chainName = item.icon.split('/').pop()?.split('.')[0]
    const [isVTModalOpen, setIsVTModalOpen] = useState<boolean>(false);

    const [chains, setChains] = useState<IChain[]>([]);
    const [supportedChain, setSelectedChain] = useState<IChain | null>(null);

    useEffect(() => {
        // Fetch the chains.json file
        fetch("/chains.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load chains.json");
                }
                return response.json();
            })
            .then((data) => setChains(data as IChain[]))
            .catch((err) => toast.error(err.message));
    }, []);

    useEffect(() => {
        if (chains.length) {
            const selectedChainConfig = chains.find(c => c.shortName.toLowerCase() == chainName);
            setSelectedChain(selectedChainConfig || null);
        }
    }, [chains, item.icon]);

    const openModal = () => {
        if (supportedChain) setIsVTModalOpen(true);
        else {
            toast.warning(`Direct payments to ${chainName} are not currently supported.\n
                You can still COPY or SCAN the address to transfer value using alternative methods.`,
                {
                    duration: 10000
                }
            );
        }
    };
    const closeModal = () => setIsVTModalOpen(false);

    return isVTModalOpen ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50" >
            <div className="bg-white p-4 rounded-md">
                <TransferComponent item={item} onClose={() => closeModal()} nativeSymbol={supportedChain?.nativeCurrency?.symbol} />
            </div>
        </div>
    ) :
        <button onClick={openModal}
            disabled={!supportedChain}
            className={`
                px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow-md flex items-center gap-2 transition-all
                    ${!supportedChain ? 'opacity-10' : ''}
                `}
        >
            Support
            <span>
                <i className="fas fa-hand-holding-heart"></i>
            </span>
        </button>
};
