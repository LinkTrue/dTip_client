"use client"
import { formatEther } from "ethers";
import { useBlockchain } from "@/context/BlockchainProvider";

export const Native = () => {
    const { signer, provider } = useBlockchain();
    const account = signer?.address;

    const getNativeBalance = async (): Promise<number> => {
        if (provider && account) {
            const balance = await provider.getBalance(account)

            const parsedBalance = parseFloat(formatEther(balance.toString())).toFixed(3);
            return parseFloat(parsedBalance)
        }
        throw Error("No Provider to check Native Balance");
    };

    return {
        getNativeBalance
    }
}

