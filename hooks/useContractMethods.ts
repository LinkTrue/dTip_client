import { useCallback } from "react";
import { useSmartContract } from "@/context/SmartContractContext";
import { toast } from "sonner";
import { useLogger } from '@/context/LoggerContext';

export const useContractMethods = () => {
  const { log, logException } = useLogger();

  const smartContractService = useSmartContract();


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
              `This profile is not found!`, { duration: 100000 }
            );
          } else if (revertReason.includes("Username is reserved or contains a reserved prefix")) {
            toast.warning(`This username might confuse users, please choose your brand name`);
          }
        } else {
          log(`Error data is not available or not in expected format`);
        }

        log(`Error calling method getProfile:`);
        logException(error);
        throw new Error(`Failed to call method getProfile`);
      }

  }, [smartContractService]);

  const isUsernameAvailable = useCallback(async (username: string) => {
    if (!smartContractService) {
      toast.info(
        "For now we only support Optimism [mainnet & testnet]."
      )
    } else {
      try {
        await smartContractService.callStatic('registerUserProfile', [username, ["testTitle"], ["testValue"]]);
      } catch (error: any) {
        if (error && error.reason) {
          const revertReason = error.reason;

          // Check if the error message contains the specific message
          if (revertReason.includes("Wallet already registered!")) {
            toast.warning(
              `There is already a profile associated with this wallet address;
              Please use another wallet if you need to create a new profile.`, { duration: 100000 }
            );
          } else if (revertReason.includes("Username is reserved or contains a reserved prefix")) {
            toast.warning(`This username might confuse users, please choose your brand name`);
          }
        } else {
          log(`Error data is not available or not in expected format`);
        }

        log(`Error calling static method registerUserProfile:`);
        logException(error);
        throw new Error(`Failed to call static method registerUserProfile`);
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
        "For now we only support Optimism [mainnet & testnet]."
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
          log(`Error data is not available or not in expected format`);
        }

        log(`Error calling static method registerUserProfile:`);
        logException(error);
        throw new Error(`Failed to call static method registerUserProfile`);
      }
    }
  }, [smartContractService]);

  return {
    getProfileByUsername,
    getReservedPrefixes,
    isUsernameAvailable,
    publish
  };
}