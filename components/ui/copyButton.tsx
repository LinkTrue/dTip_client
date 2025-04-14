import { useState } from "react";
import { copyToClipboard } from '@/lib/utils'

interface CopyButtonProps {
    title: string;
    textToCopy: string;
}

function CopyButton({ title, textToCopy }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        copyToClipboard(textToCopy);
        setCopied(true);
        // toast.info("Profile link copied", {
        //     description: "Paste it anywhere you like.",
        //     position: "bottom-center",
        // });
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <button
            className={`flex items-center gap-2 transition text-blue-600 hover:text-blue-800 ${copied ? "text-green-600" : ""
                }`}
            onClick={handleCopy}
        >
            <i className={`fas fa-copy ${copied ? "animate-pulse" : ""}`}></i>
            <span>{copied ? "Copied!" : title}</span>
        </button>
    );
}

export { CopyButton };