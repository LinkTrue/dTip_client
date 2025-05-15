"use client";
import { useSteps } from "@/context/StepsContext";
import { useBlockchain } from "@/context/BlockchainProvider";
import BlockchainComponent from "../ConnectWallet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useContractMethods } from "@/hooks/useContractMethods";
import { useGlobalState } from "@/context/GlobalStateContext";
import { parseProfileData } from "@/lib/utils";
import { useLogger } from "@/context/LoggerContext";

const S1Main = () => {
  const { logException } = useLogger();
  const { nextStep } = useSteps();
  const { signer, isConnected, isConnecting } = useBlockchain();
  const { userProfile, setUserProfile } = useGlobalState();

  const { getProfileByWallet, isSmartContractInitialized } =
    useContractMethods();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  useEffect(() => {
    if (isSmartContractInitialized && signer?.address) {
      getProfileByWallet(signer.address)
        .then((profile) => {
          const cleanedData = parseProfileData(profile);
          if (cleanedData.username) {
            setUserProfile({
              avatar: "",
              username: cleanedData.username,
              web2Items: cleanedData.web2Items,
              web3Items: cleanedData.web3Items,
            });
            setIsOwner(true);
          }
        })
        .catch((err) => {
          logException(err);
        });
    }
  }, [isSmartContractInitialized, signer]);

  return isConnecting ? (
    <div className="text-center">
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="flex flex-col justify-start gap-y-8 text-center rounded-lg">
      {!isConnected && (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-xs rounded-lg">
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-10 items-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-float hover-effect">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-200 rounded-full mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Connect
              </h2>
              <p className="text-base md:text-md text-gray-600 text-center">
                YOUR crypto wallet
              </p>
            </div>

            {/* Horizontal Arrow between Step 1 and Step 2 */}
            <div className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="block md:hidden w-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-float2 hover-effect">
              <div className="w-16 h-16 flex items-center justify-center bg-green-200 rounded-full mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Create
              </h3>
              <p className="text-base md:text-lg text-gray-600 text-center">
                YOUR profile
              </p>
            </div>

            {/* Horizontal Arrow between Step 2 and Step 3 */}
            <div className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="block md:hidden w-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-float3 hover-effect">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-200 rounded-full mb-6">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Share
              </h3>
              <p className="text-base md:text-lg text-gray-600 text-center">
                YOUR dTip Link
              </p>
            </div>
          </div>
        </div>
      )}

      <ul
        className="list-inside
            font-thin md:text-xl lg:text-2xl xl:text-2xl
            text-center font-[family-name:var(--font-geist-mono)]"
      >
        {isConnected && (
          <li className="mb-2">
            <span>
              {isOwner ? (
                <>
                  Welcome {userProfile.username}!
                  <br />
                  <br />
                  You can now
                  <Link href="/profile/edit" className="text-orange-400">
                    <b> Adjust </b>
                  </Link>
                  your profile.
                </>
              ) : (
                <>Your Donation hub, Free Forever!</>
              )}
            </span>
          </li>
        )}
      </ul>
      {isConnected && (
        <span className="p-10">
          {isOwner ? (
            <Link href={`/${userProfile.username}`} target="_blank">
              View your profile <i className="fas fa-external-link-alt"></i>
            </Link>
          ) : (
            <Link href={"/@miladtsx"} target="_blank">
              See an Example Profile{" "}
              <i className="fas fa-external-link-alt"></i>
            </Link>
          )}
        </span>
      )}

      <div className="flex gap-2 items-center flex-col">
        {/* BLOCKCHAIN COMPONENT */}
        <BlockchainComponent />

        {isConnected && !isOwner && (
          <div className="flex gap-2 items-center flex-col text-sm">
            <p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  className="w-4 h-4"
                  onChange={(e) => setIsAgreed(e.target.checked)}
                />
                <label htmlFor="agreeTerms" className="text-sm">
                  I agree
                </label>
                <a
                  className="underline"
                  target="_blank"
                  href="https://dtip.gitbook.io/docs/terms/terms-of-use"
                >
                  Terms Of Use
                </a>{" "}
                and{" "}
                <a
                  className="underline"
                  target="_blank"
                  href="https://dtip.gitbook.io/docs/terms/privacy"
                >
                  Privacy Policy
                </a>
              </div>
            </p>

            <button
              className={`rounded-full border-2 border-white transition-colors flex items-center justify-center text-background ${isAgreed ? "bg-foreground hover:bg-[#383838] dark:hover:bg-[#ccc]" : "bg-gray-200"} gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 :px-5`}
              onClick={nextStep}
              disabled={!isAgreed}
            >
              Mint your profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default S1Main;
