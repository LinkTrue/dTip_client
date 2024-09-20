import { useState } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { Button } from "@/components/ui/button"
import { Web3Item } from "@/context/GlobalStateContext";
import EllipsifiedAddress from "@/components/EllipsifiedAddress";
import { copyToClipboard } from '@/lib/utils'
import Web3ItemsComboBox from '@/components/Web3ItemsComboBox';
import { useGlobalState } from '@/context/GlobalStateContext';

const Preview = () => {
    const { userProfile } = useGlobalState();
    const [selectedWeb3Item, setSelectedWeb3Item] = useState<Web3Item>({
        title: '',
        icon: '',
        walletAddress: ''
    });

    const handleWeb3ItemSelect = (option: Web3Item) => {
        setSelectedWeb3Item(option);
    };

    return (
        <div>
            <div className="flex flex-col p-1 items-center border border-y-blue-100 border-x-red-100">
                {/*
                TODO find a reliable service allowing uploading files.
                IPFS?
                <img
                    src="https://ugc.production.linktr.ee/829ead8f-b39f-4af4-b94c-812288cf19da_avatar.jpeg?io=true&size=avatar-v3_0"
                    alt=""
                    className="rounded-full w-24 h-24 m-3"
                /> */}

                <p className="p-3"><strong>@</strong> {userProfile.username}</p>

                <div className="flex flex-wrap justify-center mt-3">
                    {userProfile.web2Items.map((item, index) => (
                        <a key={`web2Addresses${index}`} href={item.fullURL} target="_blank" rel="noopener noreferrer" title={item.title}>
                            <div style={{ display: "flex", alignItems: "center", margin: "1px" }}>
                                <img src={item.iconUrl} alt={item.title} style={{ width: 20, marginRight: 10 }} />
                            </div>
                        </a>
                    ))}
                </div>
                <br />
                <div className="flex flex-col items-center justify-center">
                    {userProfile.web3Items.length > 0 && (
                        <div className="flex items-center space-x-4">
                            <Web3ItemsComboBox onSelect={handleWeb3ItemSelect} />
                        </div>
                    )}

                    {selectedWeb3Item.walletAddress && (
                        <>
                            <br />
                            <EllipsifiedAddress walletAddress={selectedWeb3Item.walletAddress} />
                            <br />
                            <p>or Scan the QR Code</p>
                            <QRCodeSVG
                                className="rounded-xl border-8 p-2 border-gray-100"
                                size={200}
                                level={'H'}
                                title={`${selectedWeb3Item.icon}_QR_code`}
                                imageSettings={{
                                    src: selectedWeb3Item.icon,
                                    height: 50,
                                    width: 50,
                                    excavate: false,
                                    opacity: 1
                                }}
                                value={selectedWeb3Item.walletAddress}
                            />
                        </>
                    )}

                    <br /><br />
                    <div className="flex items-center justify-between space-x-2 w-full">
                        <span>Share profile:</span>
                        <span className="flex space-x-4 items-center">
                            <span className="fa-brands fa-square-x-twitter"></span>
                            <span className="fa-brands fa-square-facebook"></span>
                            <span className="fa-brands fa-square-whatsapp"></span>
                        </span>
                        <Button
                            size={"sm"}
                            onClick={() => copyToClipboard(`https://miladtsx.github.io/linktrue_client/${userProfile.username}`)}
                        >
                            <span className="fas fa-copy mr-1"></span>Copy Link
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
