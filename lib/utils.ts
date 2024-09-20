import { clsx, type ClassValue } from "clsx"
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
