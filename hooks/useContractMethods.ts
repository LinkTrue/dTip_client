import { useCallback, useEffect, useState } from "react";
import { useSmartContract } from "@/context/SmartContractContext";
import { toast } from "sonner";
import { useLogger } from '@/context/LoggerContext';

export const useContractMethods = () => {
  const { log, logException } = useLogger();
  const [isSmartContractInitialized, setIsSmartContractInitialized] = useState<boolean>(false);

  const smartContractService = useSmartContract();

  useEffect(() => {
    if (smartContractService)
      setIsSmartContractInitialized(true);
  }, [smartContractService]);


  const getReservedPrefixes = useCallback(async (index: bigint) => {
    if (!smartContractService) {
      throw new Error("SmartContractService not available");
    } else
      return smartContractService.read("reservedPrefixes", index);

  }, [smartContractService]);

  const getProfileByUsername = useCallback(async (username: string) => {
    if (!smartContractService) {
      throw new Error("SmartContractService not available");
    } else
      try {
        const result = await smartContractService.read("getProfile(string)", [username]);
        return result;
      } catch (error: any) {
        if (error && error.reason) {
          const revertReason = error.reason;

          // Check if the error message contains the specific message
          if (revertReason.includes("Username does not exist")) {
            toast.info(
              `This profile is free to reserve; join now!`, { duration: 1000 }
            );
          } else if (revertReason.includes("Username is reserved or contains a reserved prefix")) {
            toast.warning(`This username might confuse users, please choose your brand name`);
          }
        } else {
          debugger
          log(`Error data is not available or not in expected format`);
        }

        log(`Error calling method getProfile:`);
        logException(error);
        throw new Error(`Failed to call method getProfile`);
      }

  }, [smartContractService]);

  const getProfileByWallet = useCallback(async (walletAddress: string) => {
    if (!smartContractService) {
      throw new Error("SmartContractService not available");
    } else
      try {
        const result = await smartContractService.read("getProfile(address)", [walletAddress]);
        return result;
      } catch (error: any) {
        if (error && error.reason) {
          const revertReason = error.reason;

          // Check if the error message contains the specific message
          if (revertReason.includes("Username does not exist")) {
            toast.info(
              `This profile is not found!`, { duration: 10000 }
            );
          } else if (revertReason.includes("Username is reserved or contains a reserved prefix")) {
            toast.warning(`This username might confuse users, please choose your brand name`);
          }
        } else {
          debugger
          log(`Error data is not available or not in expected format`);
        }

        log(`Error calling method getProfile:`);
        logException(error);
        throw new Error(`Something went wrong; please refresh dTip and try again.`);
      }

  }, [smartContractService]);

  const isUsernameAvailable = useCallback(async (username: string) => {
    if (!smartContractService) {
      throw Error(
        "No SmartContract found! make sure you are connected to Optimism mainnet."
      )
    } else {
      try {
        await smartContractService.callStatic('registerUserProfile', [username, ["testTitle"], ["testValue"]]);
        return true;
      } catch (error: any) {
        console.debug(error);
        if (error && error.reason) {
          const revertReason = error.reason;

          // Check if the error message contains the specific message
          if (revertReason.includes("Wallet already registered!")) {
            throw Error(
              `Each wallet can only have one profile. Please use a different wallet.`
            );
          } else if (revertReason.includes("Username is reserved or contains a reserved prefix")) {
            throw Error(`This username might confuse users, please choose your brand name`);
          } else if (revertReason.includes("Username already taken")) {
            throw Error(`It is taken. now be creative.`);
          }
        }
        logException(error);
        throw Error(`Please try another username.`);
      }
    }
  }, [smartContractService]);

  const publish = useCallback(async (
    username: string,
    keys: string[],
    values: string[]
  ) => {
    if (!smartContractService) {
      toast.info(
        "Make sure Network is set to Soneium."
      )
    } else {
      try {
        await smartContractService.write('registerUserProfile', [username, keys, values]);
      } catch (error: any) {
        if (error && error.reason) {
          const revertReason = error.reason;

          // Check if the error message contains the specific message
          if (revertReason.includes("rejected")) {
            toast.info(
              `
              It seems you just REJECTED the transaction; feel free to review your profile and then try again to publish.
              If it was an error, let me know so I do fix it.
              `
            );
          } else if (revertReason.includes("Wallet already registered!")) {
            toast.info(
              `This wallet address already own a profile;
              Each wallet address can only have one profile.`
            );
          }
          else if (revertReason.includes("Username is reserved or contains a reserved prefix")) {
            toast.warning(`This username might confuse users, please choose your brand name`);
          }
        } else {
          debugger
          log(`Error data is not available or not in expected format`);
        }

        log(`Error calling static method registerUserProfile:`);
        logException(error);
        throw new Error(`Failed to call static method registerUserProfile`);
      }
    }
  }, [smartContractService]);

  return {
    isSmartContractInitialized,
    getProfileByUsername,
    getProfileByWallet,
    getReservedPrefixes,
    isUsernameAvailable,
    publish
  };
}