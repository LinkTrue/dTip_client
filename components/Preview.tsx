import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Blockies from "react-blockies";
import { Web3Item } from "@/context/GlobalStateContext";
import EllipsifiedAddress from "@/components/EllipsifiedAddress";
import Web3ItemsComboBox from "@/components/Web3ItemsComboBox";
import { useGlobalState } from "@/context/GlobalStateContext";
import Image from "next/image";
import Dialog from "./ui/dialog";
import { CopyButton } from "./ui/copyButton";
import { ShareIcon } from "./ui/socialShareIcon";

const Preview = ({ isPreview = false }: { isPreview: boolean }) => {
  const [showAd, setShowAd] = useState(false);
  const [pageUrl, setPageUrl] = useState<string>("");
  const { userProfile } = useGlobalState();
  const [selectedWeb3Item, setSelectedWeb3Item] = useState<Web3Item>({
    icon: "",
    walletAddress: "",
  });

  const handleWeb3ItemSelect = (option: Web3Item) => {
    setSelectedWeb3Item(option);
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(pageUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    if (userProfile.username)
      setPageUrl(`https://dTip.vercel.app/${userProfile.username}`);
  }, [userProfile.username]);

  // Show Ad with a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col gap-8 p-1 items-center border border-y-blue-100 border-x-red-100 rounded-xl`}
    >
      {/* Image */}
      <div className="bg-gray-200 rounded-full mt-5 shadow-md" title="">
        <Blockies
          className="rounded-full"
          seed={userProfile.username || "0"}
          size={12}
          scale={10}
        />
      </div>

      {/* USERNAME */}
      <div className="rounded-full shadow-sm">
        <p className="p-4">
          <strong>@ {userProfile.username || "Not Found"}</strong>
        </p>
      </div>

      {userProfile.username && ( //TODO  sanitize the username
        <>
          {/* WEB2 ITEMS */}
          {userProfile.web2Items.length > 0 && (
            <>
              <Dialog
                text="Find me Online"
                title="My Web2 Links:"
                description=""
                content={
                  <div className="w-full flex flex-wrap justify-center mb-2 bg-gray-100 rounded-lg p-3 px-16 gap-x-3">
                    {userProfile.web2Items.map((item, index) => {
                      return (
                        <a
                          key={`web2Addresses${index}`}
                          href={item.fullURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={item.iconUrl
                            .substring(item.iconUrl.lastIndexOf("/") + 1)
                            .replace(".svg", "")}
                        >
                          <div
                            className=""
                            style={{
                              display: "flex",
                              alignItems: "center",
                              margin: "2px",
                            }}
                          >
                            <Image
                              src={item.iconUrl}
                              alt={item.iconUrl}
                              width={30}
                              height={30}
                              loading="lazy"
                            />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                }
              />
            </>
          )}

          {/* WEB3 ITEMS */}
          {userProfile.web3Items.length > 0 && (
            <>
              <Dialog
                text="Donate Crypto"
                title="I accept tips on these blockchain networks: 👇"
                description=""
                content={
                  <div className="w-full flex flex-col items-center justify-center p-4 rounded-md">
                    {userProfile.web3Items.length > 0 && (
                      <div className="flex items-center space-x-4">
                        {/* @ts-expect-error  error*/}
                        <Web3ItemsComboBox onSelect={handleWeb3ItemSelect} />
                      </div>
                    )}

                    {selectedWeb3Item.walletAddress && (
                      <div className="flex flex-col mt-4 gap-4 items-center">
                        <EllipsifiedAddress
                          walletAddress={selectedWeb3Item.walletAddress}
                        />
                        {/* <p className="pt-4">or Scan the QR Code</p> */}
                        <QRCodeSVG
                          className="rounded-xl border-8 p-2 border-gray-100"
                          size={200}
                          level={"H"}
                          title={`Scan the QR code to copy the selected wallet address`}
                          imageSettings={{
                            src: selectedWeb3Item.icon,
                            height: 50,
                            width: 50,
                            excavate: false,
                            opacity: 1,
                          }}
                          value={selectedWeb3Item.walletAddress}
                        />
                      </div>
                    )}
                  </div>
                }
              />
            </>
          )}

          {/* SHARE BUTTONS */}
          {!isPreview && (
            <>
              <Dialog
                text="Share Profile"
                title="Support this profile — share it!"
                description=""
                content={
                  <div className="w-full flex flex-col items-center gap-4 p-4 rounded-lg">
                    <CopyButton title="Copy link" textToCopy={pageUrl} />
                    <br />

                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold">
                        📣 Or post directly to
                      </span>
                      <div className="flex mt-2 gap-4 text-2xl">
                        <ShareIcon
                          onClick={shareOnTwitter}
                          iconClass="fa-square-x-twitter"
                          title="Share on X"
                          hoverColor="#000000"
                        />
                        <ShareIcon
                          onClick={shareOnFacebook}
                          iconClass="fa-square-facebook"
                          title="Share on Facebook"
                          hoverColor="#4267B2"
                        />
                        <ShareIcon
                          onClick={shareOnWhatsApp}
                          iconClass="fa-square-whatsapp"
                          title="Share on WhatsApp"
                          hoverColor="#25D366"
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            </>
          )}

          {!isPreview && showAd && (
            <a href="/start">
              <div className=" flex items-center text-sm font-bold text-yellow-200 bg-gradient-to-r from-black to-purple-700 px-2 py-2 rounded-lg shadow-md">
                <img src="/dTip.svg" width={24} height={24} />
                <span className="">
                  Create your own <i>dTip</i>!
                </span>
              </div>
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default Preview;
