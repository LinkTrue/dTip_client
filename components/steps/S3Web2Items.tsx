import { RefObject, useRef, useState } from "react";
import { ellipsify } from '@/lib/utils';
import { useSteps } from '@/context/StepsContext'
import SocialMediaComboBox from '@/components/SocialMediaComboBox';
import { useGlobalState, Web2Item } from "@/context/GlobalStateContext";

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

    const handleWeb2AddressesChange = (e: any) => {
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
        <div className="flex flex-col items-center">
            <h2 className="mb-3">Add your social media links</h2>
            <span tabIndex={1}>
                <SocialMediaComboBox
                    ref={comboBoxRef}
                    onSelect={handleSelect}
                    autoFocus={true}
                />
            </span>

            <div className="mt-4">
                <input
                    className="text-sm rounded h-8 m-1 p-1 border"
                    type="url"
                    name="fullURL"
                    value={web2Item.fullURL}
                    onChange={handleWeb2AddressesChange}
                    placeholder="Your page full URL"
                    required
                    tabIndex={2}
                />
                <button
                    className="rounded-full bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mt-2"
                    type="button"
                    onClick={handleAddItem}
                    tabIndex={3}
                >
                    +
                </button>

                <br /><br />
                <hr />
                <br /><br />

                Summary:
                <div className="pt-3">
                    {userProfile.web2Items.length > 0 ? (
                        <table className="min-w-full border border-gray-200 border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b">Icon</th>
                                    <th className="px-4 py-2 border-b">URL</th>
                                    <th className="px-4 py-2 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProfile.web2Items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border-b items-center justify-center">
                                            <img src={item.iconUrl} alt={item.iconUrl} style={{ width: 30, height: 30 }} />
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

export default S3Web2Items;