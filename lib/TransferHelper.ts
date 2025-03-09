import { ethers } from 'ethers';
import { getBrowserProvider } from './utils';

// Function to check for MetaMask, request connection, and transfer Ether
export async function transferEther(walletAddress: string, amount: number) {
    // Check if MetaMask (Ethereum provider) is available
    const provider = await getBrowserProvider();
    if (provider) {
        // Get the signer (the connected account)
        const signer = await provider.getSigner();

        const parsedAmount = ethers.parseEther(amount.toString());

        const balance = await provider.getBalance(signer.address);
        if (balance <= parsedAmount) {
            throw Error("Low Balance!")
        }

        // Define the transaction details
        const tx = {
            to: walletAddress,
            value: parsedAmount
        };

        // Send the transaction
        const transactionResponse = await signer.sendTransaction(tx);

        // Wait for the transaction to be mined (optional)
        await transactionResponse.wait();

        console.log('Transaction successful:', transactionResponse);
    } else {
        throw Error('MetaMask is not installed!');
    }
}