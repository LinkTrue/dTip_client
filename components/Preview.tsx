import { useEffect, useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import Blockies from 'react-blockies'
import { Web3Item } from "@/context/GlobalStateContext";
import EllipsifiedAddress from "@/components/EllipsifiedAddress";
import { copyToClipboard } from '@/lib/utils'
import Web3ItemsComboBox from '@/components/Web3ItemsComboBox';
import { useGlobalState } from '@/context/GlobalStateContext';
import Image from "next/image";
import { toast } from "sonner";

const Preview = ({ isPreview = false }: { isPreview: boolean }) => {
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
            setPageUrl(`https://linktrue.vercel.app/${userProfile.username}`);
    }, [userProfile.username])

    return (
        <div className={
            `flex flex-col gap-8 p-1 items-center border border-y-blue-100 border-x-red-100 rounded-xl`}>
            {
                userProfile.username ?
                    <>
                        {/* Image */}
                        <div className="bg-gray-200 rounded-full mt-5 shadow-md" title="">
                            <Blockies className="rounded-full" seed={userProfile.username} size={12} scale={10} />
                        </div>

                        {/* USERNAME */}
                        <div className="rounded-full shadow-sm">
                            <p className="p-4"><strong>@ {userProfile.username || "Not Found"}</strong></p>
                        </div>

                        {/* WEB2 ITEMS */}
                        <div className="flex flex-wrap justify-center mb-2 bg-gray-100 rounded-lg p-3 px-16 gap-x-3">
                            {userProfile.web2Items.map((item, index) => (
                                <a key={`web2Addresses${index}`} href={item.fullURL} target="_blank" rel="noopener noreferrer"
                                    title={item.iconUrl.substring(item.iconUrl.lastIndexOf('/') + 1).replace('.svg', '')}
                                >
                                    <div className="" style={{ display: "flex", alignItems: "center", margin: "2px" }}>
                                        <Image src={item.iconUrl} alt={item.iconUrl}
                                            width={30}
                                            height={30}
                                            loading="lazy"
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* WEB3 ITEMS */}
                        <div className="flex flex-col items-center justify-center">
                            {userProfile.web3Items.length > 0 && (
                                <div className="flex items-center space-x-4">
                                    {/* @ts-expect-error  error*/}
                                    <Web3ItemsComboBox onSelect={handleWeb3ItemSelect} />
                                </div>
                            )}

                            {selectedWeb3Item.walletAddress && (
                                <div className="flex flex-col mt-4 gap-4 items-center">
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
                        </div>

                        {/* SHARE BUTTONS */}
                        {!isPreview &&
                            <div className="flex flex-col gap-4 text-center">
                                <div className="flex text-xl items-center justify-center gap-4 pt-3 ">
                                    <span className="fa-solid fa-share text-2lg text-orange-500"
                                        title="Share this profile"
                                    ></span>
                                    <span className="flex space-x-4 items-center text-2xl">
                                        <span title="share this profile on twitter" onClick={shareOnTwitter} className="fa-brands fa-square-x-twitter cursor-pointer"></span>
                                        <span title="share this profile on facebook" onClick={shareOnFacebook} className="fa-brands fa-square-facebook cursor-pointer"></span>
                                        <span title="share this profile on whatsapp" onClick={shareOnWhatsApp} className="fa-brands fa-square-whatsapp cursor-pointer"></span>
                                    </span>
                                </div>
                                <div>
                                    <a
                                        className="cursor-pointer"
                                        onClick={() => {
                                            copyToClipboard(pageUrl)
                                            toast.info("Profile address is copied.", { description: 'Paste it wherever you like.' })
                                        }}
                                    >
                                        <span className="fas fa-copy m-1" />Copy Link
                                    </a>
                                </div>
                            </ div>
                        }
                    </>
                    :
                    <>
                        <div className="flex flex-col gap-8 pt-10 text-center text-xl">
                            <p className="text-4xl">404</p>
                            <p className="">Profile Not Found!</p>

                            <div className="pt-32">
                                <a href={'/@milad'}>
                                    View a sample profile{' '}
                                    <i className="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default Preview;
