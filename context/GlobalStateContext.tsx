"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useBlockchain } from '@/context/BlockchainProvider';

// Define Web2 and Web3 address types

export interface Web2Item {
  iconUrl: string;
  fullURL: string; // the full page address, such as https://linkedin.com/in/miladtsx
}

export interface Web3Item {
  icon: string;
  walletAddress: string;
  chainName?: string; // title of the item
  chainId?: string; // the chain id
  explorerAddress?: string;
}

interface UserProfile {
  username: string;
  avatar: string;
  web2Items: Web2Item[];
  web3Items: Web3Item[];
}

interface GlobalState {
  setUserProfile: (userProfile: UserProfile) => void;
  userProfile: UserProfile;
  updateUsername: (username: string) => void;

  userNameOK: boolean;
  setUserNameOK: (value: boolean) => void;
  userNameCheckOK: boolean;
  setUserNameCheckOK: (value: boolean) => void;
  usernameError: string | undefined;
  setUsernameError: (value: string | undefined) => void;

  areTertmsAgreed: boolean;
  setAreTertmsAgreed: (value: boolean) => void;

  addWeb2Item: (item: Web2Item) => void;
  removeWeb2Item: (index: number) => void;
  addWeb3Item: (item: Web3Item) => void;
  removeWeb3Item: (index: number) => void;
}

// Create the context
const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// Custom hook to use the global state
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

// Create a provider component
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const { user, ready, authenticated } = useBlockchain();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '',
    avatar: '',
    web2Items: [],
    web3Items: [],
  });

  useEffect(() => {
    if (ready && authenticated && user?.linkedAccounts) {
      const privyWallets = user.linkedAccounts.filter(
        (account) => account.type === 'wallet'
      );
      const newWeb3Items: Web3Item[] = privyWallets.map((account: any) => {
        let explorerBaseUrl = '';
        // Attempt to set explorer URL based on known chain IDs or types
        if (account.chainType === 'ethereum') {
          if (account.chainId === '1' || account.chainId.startsWith('eip155:1')) { // Mainnet
            explorerBaseUrl = 'https://etherscan.io/address/';
          } else if (account.chainId === '5' || account.chainId.startsWith('eip155:5')) { // Goerli
            explorerBaseUrl = 'https://goerli.etherscan.io/address/';
          } else if (account.chainId === '11155111' || account.chainId.startsWith('eip155:11155111')) { // Sepolia
            explorerBaseUrl = 'https://sepolia.etherscan.io/address/';
          }
          // Add more Ethereum testnets or other EVM chains as needed
        }
        // Add other chain types like solana, polygon, etc. if relevant
        
        return {
          icon: '/icons/chains/default-wallet-icon.svg', // Placeholder icon
          walletAddress: account.address,
          chainName: account.chainType || 'Unknown Chain',
          chainId: account.chainId,
          explorerAddress: explorerBaseUrl ? `${explorerBaseUrl}${account.address}` : undefined,
        };
      });
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        web3Items: newWeb3Items,
      }));
    } else {
      // Clear web3Items if not authenticated or no linked accounts
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        web3Items: [],
      }));
    }
  }, [user, ready, authenticated, setUserProfile]);

  const [userNameOK, setUserNameOK] = useState<boolean>(false);
  const [userNameCheckOK, setUserNameCheckOK] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [areTertmsAgreed, setAreTertmsAgreed] = useState<boolean>(false);

  const updateUsername = (username: string) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      username,
    }));
  };

  // Add a Web2 address to the user profile
  const addWeb2Item = (item: Web2Item) => {
    //TODO validate input?

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      web2Items: [
        ...prevProfile.web2Items,
        {
          iconUrl: item.iconUrl,
          fullURL: item.fullURL,
        },
      ],
    }));
  };

  const removeWeb2Item = (index: number) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      web2Items: prevProfile.web2Items.filter((_, i) => i !== index),
    }));
  };

  // Add a Web3 address to the user profile
  const addWeb3Item = (item: Web3Item) => {
    //TODO validate input?

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      web3Items: [
        ...prevProfile.web3Items,
        {
          icon: item.icon,
          walletAddress: item.walletAddress,
        },
      ],
    }));
  };

  const removeWeb3Item = (index: number) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      web3Items: prevProfile.web3Items.filter((_, i) => i !== index),
    }));
  };

  const value: GlobalState = {
    setUserProfile,
    userProfile,

    updateUsername,

    userNameOK,
    setUserNameOK,

    userNameCheckOK,
    setUserNameCheckOK,

    usernameError,
    setUsernameError,

    areTertmsAgreed,
    setAreTertmsAgreed,

    addWeb2Item,
    removeWeb2Item,
    addWeb3Item,
    removeWeb3Item,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};
