"use client"
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { createContext, useContext, useState, ReactNode } from 'react';

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
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '',
    avatar: '',
    web2Items: [],
    web3Items: [],
  });

  const [userNameOK, setUserNameOK] = useState<boolean>(false);
  const [userNameCheckOK, setUserNameCheckOK] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<string | undefined>();

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
