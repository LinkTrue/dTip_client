import { RefObject, useRef, useState } from "react";
import { useGlobalState, Web3Item } from "@/context/GlobalStateContext";
import { useSteps } from '@/context/StepsContext'
import ChainsComboBox from '@/components/ChainsComboBox';
import EllipsifiedWalletAddress from '@/components/EllipsifiedAddress';
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";


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
            toast.warning('Please select a blockchain network and input your wallet address.', { duration: 5000 });
        }
    };

    return (
        <div className="flex flex-col text-center gap-y-4">
            {userProfile.web3Items.length > 0 ?
                <h2 className="text-xl lg:text-4xl md:text-2xl">Don't you support other networks?</h2>
                :
                <h2 className="text-xl lg:text-4xl md:text-2xl"><strong>Where</strong> you want to receive tip?</h2>
            }
            <div className="px-10">
                {/* @ts-expect-error error*/}
                <ChainsComboBox ref={comboBoxRef} onSelect={handleSelectChain} />
            </div>

            {web3Item.icon && (

                <div className="flex items-center p-4">
                    <Input
                        className="text-sm rounded h-8 mr-4 border"
                        type="text"
                        name="walletAddress"
                        value={web3Item.walletAddress}
                        onChange={handleWeb3ItemInputChange}
                        placeholder="Enter your Wallet address (eg. 0x15e69F13Ef2C5b81D40342AB6dc84A887866B146)"
                        required
                    />
                    {web3Item.walletAddress ?
                        <Button
                            className="rounded-full bg-foreground text-background text-base h-8 p-6"
                            type="button"
                            onClick={handleAddItem}
                        >
                            <strong>+</strong>
                        </Button>
                        : <></>
                    }
                </div>
            )}

            {userProfile.web3Items.length > 0 ? (

                <div className="mt-2 p-6">
                    <p className="text-2xl font-bold">List of your wallets:</p>
                    <div className="flex flex-col pt-3 items-center">

                        <table className="min-w-full border border-gray-200 border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Icon</th>
                                    <th className="px-4 py-2 border-b">Address</th>
                                    <th className="px-4 py-2 border-b">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProfile.web3Items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="flex px-4 py-4 items-center justify-center">
                                            <Image src={item.icon} alt={item.icon}
                                                width={30}
                                                height={30}
                                                loading="lazy"
                                            />
                                        </td>
                                        <td className="px-4 py-2 items-center justify-center">
                                            <EllipsifiedWalletAddress walletAddress={item.walletAddress} />
                                        </td>
                                        <td className="px-4 py-2 items-center justify-center">
                                            <button
                                                className="border rounded-full cursor-pointer w-8 h-8 text-red-500 font-bold"
                                                rel="noopener noreferrer"
                                                onClick={() => removeWeb3Item(index)}>X</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="m-8">
                <hr className="m-4 border-t-2 dark:border-gray-600" />
                <div className="flex justify-between gap-4 mt-6">
                    <button
                        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-200 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        type="button"
                        onClick={prevStep}
                    >
                        {"<"}
                    </button>

                    {!!userProfile.web3Items.length &&
                        <button
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center 
          bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] 
          text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                            type="button"
                            onClick={nextStep}
                        >
                            {">"}
                        </button>
                    }
                </div>
            </div>

        </div>
    );
};

export default S4Web3Items;