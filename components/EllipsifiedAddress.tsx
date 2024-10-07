import React from 'react';
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ellipsify, copyToClipboard } from '../lib/utils'

const EllipsifiedAddress = ({ walletAddress }: { walletAddress: string }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        className='hover:bg-gray-200'
                        variant="outline"
                        onClick={() => {
                            copyToClipboard(walletAddress)

                            toast.info("Copied to clipboard", {
                                description: "Paste it wherever you like.",
                                duration: 5000,
                            })
                        }
                        }
                    >
                        <span className='md:text-xl text-xxs lg:text-2xl'>
                            {ellipsify(walletAddress)} {" "} <i className="fas fa-copy"></i>
                        </span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{walletAddress}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default EllipsifiedAddress;