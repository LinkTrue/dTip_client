import { Web2Item, Web3Item } from "@/context/GlobalStateContext";
import { clsx, type ClassValue } from "clsx"
import { ethers } from "ethers";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function ellipsify(address: string) {
  if (address.length > 10) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
  return address;
}


export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    // alert('Address copied to clipboard!');
  }).catch((err) => {
    console.log('Failed to copy address');
    console.error(err);
  });
};


export function parseProfileData(result: string[]) {
  // Initialize arrays for Web2 and Web3 items
  const web2Items: Web2Item[] = [];
  const web3Items: Web3Item[] = [];
  let username: string | null = null;

  // Loop through the result and process each item
  for (let i = 0; i < result.length; i++) {
    // Determine if the item is a Web2 item (icon URL and full URL)
    if (i % 2 === 0) {
      // Check if the next item exists
      if (i + 1 < result.length &&
        (
          /^https?:\/\//.test(result[i + 1]) ||
          /^mailto:/.test(result[i + 1])
        )
      ) {
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

  username = result[result.length - 1];

  // Return the organized object
  return {
    web2Items,
    web3Items,
    username
  };
}

export async function getBrowserProvider() {
  if (typeof (window as any).ethereum !== 'undefined') {
    // Request MetaMask connection if not already connected
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    // Create a new provider using ethers.js connected to MetaMask
    return new ethers.BrowserProvider((window as any).ethereum);
  } else {
    return undefined;
  }
}