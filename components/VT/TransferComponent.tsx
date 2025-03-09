import { Web3Item } from '@/context/GlobalStateContext';
import React, { useEffect, useState } from 'react';
import { transferEther } from '@/lib/TransferHelper';
import { toast } from 'sonner';
import { getBrowserProvider } from '@/lib/utils';
import { BrowserProvider, ethers } from 'ethers';

const TransferComponent = ({ item, onClose, nativeSymbol = "ETH" }: { item: Web3Item, onClose: () => void, nativeSymbol: string | undefined }) => {
    const [step, setStep] = useState(0);
    const [amount, setAmount] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [provider, setProvider] = useState<BrowserProvider | undefined>(undefined);

    useEffect(() => {
        getBrowserProvider().then(setProvider)
    }, []);

    useEffect(() => {
        if (provider) {
            provider.getSigner().then(_signer => {
                provider.getBalance(_signer.address).then(_bal => {
                    try {
                        debugger
                        setBalance(
                            parseFloat(
                                ethers.formatEther(
                                    _bal
                                )
                            )
                        )
                    }
                    catch (err: any) {
                        toast.error(err.message);
                    }
                }
                )
            })
        }
    }, [provider])

    const handleSend = async () => {
        try {
            await transferEther(item.walletAddress, amount);
            onClose();

        }
        catch (err: any) {
            debugger
            toast.error(err.message)
        }
    };

    const renderStepContent = () => {
        return (
            <div className="flex flex-col relative mb-4">
                <button
                    className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                    onClick={onClose}
                >
                    Cancel
                </button>
                {(() => {
                    switch (step) {
                        case 0: // NOTIFICATION
                            return (
                                <div className='pt-10'>
                                    <h2 className="text-lg font-semibold">You are about to transfer value to:</h2>
                                    <p className="font-italic text-xs px-4 italic">{item.walletAddress}</p>
                                    <div className="flex justify-end">
                                        <button className="px-4 py-2 mt-4 bg-blue-600 text-white rounded" onClick={() => setStep(1)}>
                                            OK
                                        </button>
                                    </div>
                                </div>
                            );
                        case 1: // AMOUNT
                            return (
                                <>
                                    <div className="mb-4 mt-8">
                                        <label className="block font-semibold">Amount to transfer:</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 mt-2 border rounded"
                                            placeholder="Enter amount"
                                            value={amount}
                                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                                        />
                                        <div>Your balance: {balance.toFixed(3)}</div>
                                        {amount > balance && (
                                            <p className="text-red-500">Amount exceeds your balance.</p>
                                        )}
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded"
                                            onClick={
                                                () => amount && amount <= balance && setStep(2)
                                            }
                                            disabled={amount > balance}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </>
                            );
                        case 2: // CONFIRMATION
                            return (
                                <div className="mb-4">
                                    <h2 className="text-lg font-semibold pt-8">Confirm Transfer</h2>
                                    <p className="font-italic text-xs px-4">Transfer to: {item.walletAddress}</p>
                                    <p className="font-italic text-xs px-4">Amount: <strong>{amount}</strong>
                                        <>
                                            {" $"}{nativeSymbol}
                                        </>
                                    </p>
                                    <div className="flex justify-end gap-2 mt-4">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSend}>
                                            Confirm Transfer
                                        </button>
                                    </div>
                                </div>
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-md">
            {renderStepContent()}
        </div>
    );


};

export default TransferComponent;
