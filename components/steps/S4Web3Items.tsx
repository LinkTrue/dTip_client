import { RefObject, useRef, useState } from "react";
import { useGlobalState, Web3Item } from "@/context/GlobalStateContext";
import { useSteps } from '@/context/StepsContext'
import ChainsComboBox from '@/components/ChainsComboBox';
import EllipsifiedWalletAddress from '@/components/EllipsifiedAddress';
import Image from "next/image";


// Define the type for the ref
interface ChainsComboBoxHandle {
    clearSelection: () => void;
}

const S4Web3Items = () => {
    const { prevStep, nextStep } = useSteps();
    const {
        userProfile,
        addWeb3Item,
        removeWeb3Item
    } = useGlobalState();

    const [web3Item, setWeb3Item] = useState<Web3Item>({
        icon: '',
        walletAddress: '',
    });

    const comboBoxRef: RefObject<ChainsComboBoxHandle> = useRef(null);

    const handleClearSelection = () => {
        if (comboBoxRef.current) {
            comboBoxRef.current.clearSelection();
        }
    };

    const handleWeb3ItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWeb3Item((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSelectChain = (selectedOption: any) => {
        setWeb3Item({
            ...web3Item,
            icon: selectedOption ? selectedOption.value : "", // Update form with selected icon URL
        });
    };

    const handleAddItem = () => {
        if (web3Item.icon && web3Item.walletAddress) {
            addWeb3Item(
                {
                    icon: web3Item.icon,
                    walletAddress: web3Item.walletAddress,
                },
            );
            setWeb3Item({ icon: '', walletAddress: '' }); // Clear the form
            handleClearSelection();
        } else {
            alert('Please fill out all fields');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="mb-3">Add your Crypto Wallet addresses</h2>
            <ChainsComboBox ref={comboBoxRef} onSelect={handleSelectChain} />

            <div className="mt-4">
                <input
                    className="text-sm rounded h-8 m-1 p-1 border"
                    type="text"
                    name="walletAddress"
                    value={web3Item.walletAddress}
                    onChange={handleWeb3ItemInputChange}
                    placeholder="Wallet address"
                    required
                />
                <button
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mt-2"
                    type="button"
                    onClick={handleAddItem}
                >
                    +
                </button>

                <br /><br />
                <hr />
                <br /><br />

                <div className="pt-3">
                    {userProfile.web3Items.length > 0 ? (
                        <table className="min-w-full border border-gray-200 border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Icon</th>
                                    <th className="px-4 py-2 border-b">Address</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProfile.web3Items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b items-center justify-center">
                                            <Image src={item.icon} alt={item.icon} style={{ width: 30, height: 30 }} />
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <EllipsifiedWalletAddress walletAddress={item.walletAddress} />
                                        </td>
                                        <td className="px-4 py-2 border-b flex items-center justify-center">
                                            <button
                                                className="border rounded-full cursor-pointer w-8 h-8 text-red-500 font-bold"
                                                rel="noopener noreferrer"
                                                onClick={() => removeWeb3Item(index)}>X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No items added yet.</p>
                    )}

                </div>

            </div>
            <div className="flex justify-between gap-4 mt-9">
                <button
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    type="button"
                    onClick={prevStep}
                >
                    {"<"}
                </button>

                <button
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center 
          bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] 
          text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    type="button"
                    onClick={nextStep}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default S4Web3Items;