"use client"
import { useState, useEffect } from 'react';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [answerHeight, setAnswerHeight] = useState(0);

    const toggleAnswer = (index: number) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const answerElement = document.querySelector(`#answer-${activeIndex}`);
        if (answerElement) {
            setAnswerHeight(answerElement.scrollHeight);
        }
    }, [activeIndex]);

    const faqItems = [
        {
            question: "What is the problem?",
            answer: "Cryptocurrency donations often involve multiple wallets, shared through non-transparent third-party services. This contradicts cryptocurrency's core principles of security and verifiability, risking lost donations and confusion due to potential wallet address alteration."
        },
        {
            question: "What is the solution?",
            answer: "LinkTrue is a free, open-source dApp that uses blockchain to consolidate crypto links and wallet addresses, giving you transparency and control."
        },
        {
            question: "Who should use LinkTrue?",
            answer: "LinkTrue is perfect for anyone wanting to securely share wallet addresses, receive donations, or promote online payment gateways."
        },
        {
            question: "How is LinkTrue different from other bio link tools?",
            answer: "Unlike traditional bio link tools, LinkTrue ensures that only you own and control your data, providing exceptional security and integrity."
        },
        {
            question: "How to use LinkTrue?",
            answer: "Build a profile and share a single link in your social media bio."
        },
        {
            question: "Which blockchain networks does LinkTrue support?",
            answer: "Any blockchain network."
        },
        {
            question: "How is my data stored with LinkTrue?",
            answer: "Your data is securely stored on the blockchain, which is why a small transaction fee is required to mint your profile. This storage is protected by the Avalanche network, ensuring high availability and data integrity."
        },
        {
            question: "Is it really free?",
            answer: "LinkTrue is completely free and open-source. However, to mint your profile on the blockchain, you need to pay the blockchain network fee, which costs around $0.02 in $avax."
        },
        {
            question: "Is it really impossible to manipulate my data?",
            answer: "Your data is securely tied to your wallet address or private key and the security of the Avalanche Blockchain Network. Losing access to your key or wallet means losing access to your data."
        },
        {
            question: "My desired blockchain is not listed when building my profile!",
            answer: "We can easily add new blockchain or website icons by simply adding the desired icon and submitting a pull request to the source code on GitHub. Here is how I added Ton Blockchain network Icon: https://github.com/LinkTrue/linktrue_client/commit/5d411900157913843be05a6b07cf23b92b4f191a."
        },
        {
            question: "Can I contribute to LinkTrue anyhow?",
            answer: "Absolutely! Any contribution is highly welcome!"
        },
        {
            question: "Need a human support?",
            answer: "Join the Telegram Group > https://t.me/+nGn36o2JAv42ODAx"
        }
    ];

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Got questions?</h1>

            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div key={index} className={`border-gray-200 pb-4 border-x-2 rounded-xl p-2 cursor-pointer ${activeIndex === index ? 'bg-gray-100' : ''}`}
                        onMouseEnter={() => toggleAnswer(index)}
                    >
                        <h2
                            className="text-lg font-semibold mb-2"

                        >
                            <div className='flex justify-between'>
                                {item.question}
                                <span className="text-xl">{activeIndex === index ? '-' : '+'}</span>
                            </div>
                        </h2>
                        <div
                            id={`answer-${index}`}
                            style={{ maxHeight: activeIndex === index ? `${answerHeight}px` : '0', transition: 'max-height 0.5s ease-in-out', overflow: 'hidden' }}
                        >
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
