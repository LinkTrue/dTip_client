import { Contract, ethers, JsonRpcSigner } from "ethers";

const SMART_CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "key",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "value",
                "type": "string"
            }
        ],
        "name": "ProfileUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "username",
                "type": "string"
            }
        ],
        "name": "Registered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "username",
                "type": "string"
            }
        ],
        "name": "UsernameChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "UsernameTransferred",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "keys",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "values",
                "type": "string[]"
            }
        ],
        "name": "addItems",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newUsername",
                "type": "string"
            }
        ],
        "name": "changeUsername",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "newValue",
                "type": "string"
            }
        ],
        "name": "editItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            }
        ],
        "name": "getProfile",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }
        ],
        "name": "getProfile",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "internalType": "string[]",
                "name": "keys",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "values",
                "type": "string[]"
            }
        ],
        "name": "registerUserProfile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            }
        ],
        "name": "removeItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "reservedPrefixes",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "transferUsername",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export interface BlockchainServiceInterface {
    read(methodName: string, ...args: any[]): Promise<any>;
    write(methodName: string, ...args: any[]): Promise<void>;
    callStatic(methodName: string, ...args: any[]): Promise<ethers.Result>;
}

export function SmartContractService(signer: JsonRpcSigner, chainId: number):
    BlockchainServiceInterface {

    const getContractAddress = (chainId: number): string => {
        if (chainId === 10) throw new Error("Not implemented yet!"); //return '0xYourContractAddressOnOptimism';
        if (chainId === 11155420) return '0x8faC1b937a41cE91E51569451afBFbD5998c1CEC';
        throw new Error("Unsupported network");
    }

    const contractAddress = getContractAddress(chainId);
    if (!contractAddress) {
        throw new Error(`Contract address not found for chainId: ${chainId}`);
    }

    const contract = new Contract(contractAddress, SMART_CONTRACT_ABI, signer);

    const read = async (methodName: string, args: any[]): Promise<any> => {
        return await contract[methodName](...args);
    }

    const write = async (methodName: string, args: any[]): Promise<void> => {
        const tx = await contract[methodName](...args);
        await tx.wait();  // Wait for the transaction to be mined
    }

    const callStatic = async (methodName: string, args: any[]): Promise<ethers.Result> => {
        return contract[methodName].staticCallResult(...args);
    }

    return { read, write, callStatic };

}
