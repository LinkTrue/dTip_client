"use client"
import { useEffect, useState } from 'react';
import Preview from '@/components/Preview';
import { useParams } from 'next/navigation';
import { useBlockchain } from "@/context/BlockchainProvider";
import { useContractMethods } from '@/hooks/useContractMethods';
import { useGlobalState } from '@/context/GlobalStateContext';
import { parseProfileData } from '@/lib/utils';


export default function UserProfile() {
  const params = useParams();
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

  const [username, setUsername] = useState<string>("")
  const [isFetching, setIsFetching] = useState<boolean>(false)


  // Ensure that username is treated as a string and decode it from URL encoding
  useEffect(() => {
    const rawUsername = Array.isArray(params.username) ? params.username[0] : params.username;
    const cleanUsername = decodeURIComponent(rawUsername).startsWith('@') ? rawUsername.slice(3) : rawUsername;
    setUsername(cleanUsername);
  }, [params.username]);

  useEffect(() => {
    if (isConnecting) return;
    if (!isConnected) {
      handleConnectWallet(false);
    }
  }, [isConnected, isConnecting, handleConnectWallet]);

  useEffect(() => {
    if (isConnected && signer && username.length > 0 && !isFetching) {
      setIsFetching(true);
      getProfileByUsername(username).then(res => {
        const cleanedData = parseProfileData(res);
        setUserProfile(
          {
            avatar: '',//todo what to do?
            username: username,
            web2Items: cleanedData.web2Items,
            web3Items: cleanedData.web3Items
          }
        )
      })
        .catch(err => {
          console.log(err);
        }).finally(() => {
          setIsFetching(false);
        })
    }
  }, [isConnected, signer, username, getProfileByUsername, setUserProfile]);

  // fetch the profile data using a public rpc node
  // set the profile data into the global state 
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
