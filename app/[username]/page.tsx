"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Change this
import Preview from '@/components/Preview';
import { useBlockchain } from "@/context/BlockchainProvider";
import { useContractMethods } from '@/hooks/useContractMethods';
import { useGlobalState } from '@/context/GlobalStateContext';
import { parseProfileData } from '@/lib/utils';


export default function UserProfile() {
  const { username } = useParams(); // Adjusted for react-router

  const {
    handleConnectWallet,
    signer,
    isConnecting,
    isConnected,
  } = useBlockchain();

  const {
    setUserProfile,
  } = useGlobalState();

  const { getProfileByUsername } = useContractMethods();

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (isConnecting) return;
    if (!isConnected) {
      handleConnectWallet(false);
    }
  }, [isConnected, isConnecting, handleConnectWallet]);

  useEffect(() => {
    if (isConnected && signer && username && !isFetching) {
      setIsFetching(true);
      getProfileByUsername(username).then(res => {
        const cleanedData = parseProfileData(res);
        setUserProfile({
          avatar: '', // placeholder, adjust if needed
          username: username,
          web2Items: cleanedData.web2Items,
          web3Items: cleanedData.web3Items,
        });
      })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          setIsFetching(false);
        });
    }
  }, [isConnected, signer, username, getProfileByUsername, setUserProfile]);

  return (
    <div>
      <div className='text-center'>
        {isConnecting ? <span>Connecting ...</span> : ''}
        {isConnected && isFetching ? <span className='pt-32'>Reading Blockchain Data ...</span> : ''}
      </div>

      {isConnected && !isFetching ? <Preview isPreview={false} /> : ''}
    </div>
  );
}
