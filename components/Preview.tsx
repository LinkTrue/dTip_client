import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button"
import { Web3Item } from "@/context/GlobalStateContext";
import EllipsifiedAddress from "@/components/EllipsifiedAddress";
import { copyToClipboard } from '@/lib/utils'
import Web3ItemsComboBox from '@/components/Web3ItemsComboBox';
import { useGlobalState } from '@/context/GlobalStateContext';
import Image from "next/image";
import { toast } from "sonner";

const Preview = () => {
    const [pageUrl, setPageUrl] = useState<string>('');
    const { userProfile } = useGlobalState();
    const [selectedWeb3Item, setSelectedWeb3Item] = useState<Web3Item>({
        icon: '',
        walletAddress: ''
    });

    const handleWeb3ItemSelect = (option: Web3Item) => {
        setSelectedWeb3Item(option);
    };

    const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(pageUrl)}`;
        window.open(twitterUrl, '_blank');
    };

    const shareOnFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        window.open(facebookUrl, '_blank');
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageUrl)}`;
        window.open(whatsappUrl, '_blank');
    };

    useEffect(() => {
        if (userProfile.username)
            setPageUrl(`https://miladtsx.github.io/linktrue_client/${userProfile.username}`);
    }, [userProfile.username])


    return (

        <div className="flex flex-col gap-4 p-1 items-center border border-y-blue-100 border-x-red-100">

            <div className="bg-gray-200 rounded-full mt-10 shadow-md">
                <p className="p-4"><strong>@ {userProfile.username}</strong></p>
            </div>

            <div className="flex flex-wrap justify-center mt-2 mb-8 bg-gray-400 rounded-lg p-3">
                {userProfile.web2Items.map((item, index) => (
                    <a key={`web2Addresses${index}`} href={item.fullURL} target="_blank" rel="noopener noreferrer"
                        title={item.iconUrl.substring(item.iconUrl.lastIndexOf('/') + 1).replace('.svg', '')}
                    >
                        <div className="" style={{ display: "flex", alignItems: "center", margin: "2px" }}>
                            <Image src={item.iconUrl} alt={item.iconUrl}
                                width={30}
                                height={30}
                            />
                        </div>
                    </a>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center">
                {userProfile.web3Items.length > 0 && (
                    <div className="flex items-center space-x-4">
                        {/* @ts-expect-error  error*/}
                        <Web3ItemsComboBox onSelect={handleWeb3ItemSelect} />
                    </div>
                )}

                {selectedWeb3Item.walletAddress && (
                    <div className="flex flex-col mt-4 gap-4">
                        <EllipsifiedAddress walletAddress={selectedWeb3Item.walletAddress} />
                        {/* <p className="pt-4">or Scan the QR Code</p> */}
                        <QRCodeSVG
                            className="rounded-xl border-8 p-2 border-gray-100"
                            size={200}
                            level={'H'}
                            title={`Scan the QR code to copy the selected wallet address`}
                            imageSettings={{
                                src: selectedWeb3Item.icon,
                                height: 50,
                                width: 50,
                                excavate: false,
                                opacity: 1
                            }}
                            value={selectedWeb3Item.walletAddress}
                        />
                    </div>
                )}

                <div className="flex items-center justify-between space-x-2 w-full pt-8">
                    <span>Share profile:</span>
                    <span className="flex space-x-4 items-center">
                        <span title="share this profile on twitter" onClick={shareOnTwitter} className="fa-brands fa-square-x-twitter cursor-pointer"></span>
                        <span title="share this profile on facebook" onClick={shareOnFacebook} className="fa-brands fa-square-facebook cursor-pointer"></span>
                        <span title="share this profile on whatsapp" onClick={shareOnWhatsApp} className="fa-brands fa-square-whatsapp cursor-pointer"></span>
                    </span>
                    <Button
                        size={"sm"}
                        onClick={() => {
                            copyToClipboard(pageUrl)
                            toast.info("Profile address is copied.", { description: 'Paste it wherever you like.' })
                        }
                        }
                    >
                        <span className="fas fa-copy mr-1"></span>Copy Link
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default Preview;
