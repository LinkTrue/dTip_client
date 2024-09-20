"use client"
import { useEffect, useState } from 'react';
import Preview from '@/components/Preview';
import { useParams } from 'next/navigation';
import { useBlockchain } from "@/context/BlockchainProvider";
import { useContractMethods } from '@/hooks/useContractMethods';
import { useGlobalState, Web2Item, Web3Item } from '@/context/GlobalStateContext';


export default function UserProfile() {
  const params = useParams();
  const {
    handleConnectWallet,
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
    if (isConnected && username.length > 0 && !isFetching) {
      setIsFetching(true);
      getProfileByUsername(username).then(res => {
        const cleanedData = parseResult(res);
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
          debugger
          console.log(err);
        }).finally(() => {
          setIsFetching(false);
        })
    }
  }, [isConnected, username, getProfileByUsername]);

  function parseResult(result: string[]) {
    // Initialize arrays for Web2 and Web3 items
    let web2Items: Web2Item[] = [];
    let web3Items: Web3Item[] = [];

    // Loop through the result and process each item
    for (let i = 0; i < result.length; i++) {
      // Determine if the item is a Web2 item (icon URL and full URL)
      if (i % 2 === 0) {
        // Check if the next item exists and is a valid URL
        if (i + 1 < result.length && /^https?:\/\//.test(result[i + 1])) {
          web2Items.push({
            iconUrl: result[i],
            fullURL: result[i + 1]
          });
        }
      }
      // Determine if the item is a Web3 item (icon URL and wallet address)
      else {
        // Check if the current item is a valid wallet address
        if (/^0x[a-fA-F0-9]{40}$/.test(result[i])) {
          web3Items.push({
            icon: result[i - 1],
            walletAddress: result[i]
          });
        }
      }
    }

    // Return the organized object
    return {
      web2Items,
      web3Items
    };
  }

  // fetch the profile data using a public rpc node
  // set the profile data into the global state 
  return (
    <div>
      {isConnecting ? <>Connecting ...</> : ''}
      {isConnected && isFetching ? <>Reading Blockchain Data ...</> : ''}
      {isConnected && !isFetching ? <Preview /> : ''}

    </div>
  );
}
