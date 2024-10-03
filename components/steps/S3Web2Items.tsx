import { RefObject, useRef, useState } from "react";
import { useSteps } from '@/context/StepsContext'
import SocialMediaComboBox from '@/components/SocialMediaComboBox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGlobalState, Web2Item } from "@/context/GlobalStateContext";
import Image from "next/image";

// Define the type for the ref
interface SocialMediaComboBoxHandle {
    clearSelection: () => void;
}

const S3Web2Items = () => {
    const { prevStep, nextStep } = useSteps();
    const {
        userProfile,
        addWeb2Item,
        removeWeb2Item
    } = useGlobalState();

    const [web2Item, setWeb2Item] = useState<Web2Item>({
        iconUrl: '',
        fullURL: ''
    });

    const comboBoxRef: RefObject<SocialMediaComboBoxHandle> = useRef(null);

    const handleClearSelection = () => {
        if (comboBoxRef.current) {
            comboBoxRef.current.clearSelection();
        }
    };

    const handleWeb2AddressesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setWeb2Item((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleSelect = (selectedOption: any) => {
        setWeb2Item({
            ...web2Item,
            iconUrl: selectedOption ? selectedOption.value : "", // Update form with selected icon URL
        });
    };

    const handleAddItem = () => {
        if (web2Item.iconUrl && web2Item.fullURL) {
            addWeb2Item(web2Item); // Add item to the global state
            setWeb2Item({
                iconUrl: '', fullURL: ''
            }); // Clear the form
            handleClearSelection();
        } else {
            alert('Please fill out all fields');
        }
    };

    const handleRemoveItem = (index: number) => {
        removeWeb2Item(index);
    };

    return (
        <div className="flex flex-col text-center gap-8">
            <strong>@{userProfile.username}</strong>
            <h2 className="mb-8 text-lg lg:text-4xl md:text-2xl">Guide your fans with thoughtful hand-picked destinations you want!<br />
                <p className="text-sm">(any www address, social media, Ecommerce, shop, etc.):</p>
            </h2>
            <SocialMediaComboBox
                ref={comboBoxRef}
                onSelect={handleSelect}
                autoFocus={true}
            />

            <div className="flex items-center">
                <Input
                    className="text-sm rounded h-8 mr-4 border"
                    type="url"
                    name="fullURL"
                    value={web2Item.fullURL}
                    onChange={handleWeb2AddressesChange}
                    placeholder="e.g., https://example.com or https://paypal.me/username"
                    required
                    tabIndex={1}
                />
                {web2Item.iconUrl ?
                    <Button
                        className="rounded-full bg-foreground text-background text-base h-8"
                        type="button"
                        onClick={handleAddItem}
                        tabIndex={2}
                    >
                        +
                    </Button>
                    : <></>
                }
            </div>
            {userProfile.web2Items.length > 0 ? (
                <div className="mt-2 p-6">
                    <p className="text-2xl font-bold">Summary:</p>
                    <div className="flex flex-col pt-3 items-center">
                        <table className="border border-gray-200 border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Icon</th>
                                    <th className="px-4 py-2 border-b">URL</th>
                                    <th className="px-4 py-2 border-b">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProfile.web2Items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b items-center justify-center">
                                            <Image src={item.iconUrl} alt={item.iconUrl}
                                                width={20}
                                                height={20}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b">
                                            <a href={item.fullURL} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center justify-center">
                                                <span>
                                                    <i className="fas fa-external-link-alt"></i>
                                                </span>
                                            </a>
                                        </td>
                                        <td className="px-4 py-2 border-b flex items-center justify-center">
                                            <button
                                                className="border rounded-full cursor-pointer w-8 h-8 text-red-500 font-bold"
                                                rel="noopener noreferrer"
                                                onClick={() => handleRemoveItem(index)}>X</button>
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
            <div className="flex justify-between gap-4 mt-6">
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

export default S3Web2Items;