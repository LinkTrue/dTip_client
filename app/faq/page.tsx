"use client"
import { useState } from 'react';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAnswer = (index: number) => {
        setActiveIndex(index);
    };

    const faqItems = [
        {
            question: "What is LinkTrue?",
            answer: "An open-source & free dApp allowing you to consolidate crypto links and wallet addresses on a single page while maintaining control over your data; perfect for tips, donations, or payments."
        },
        {
            question: "Who should use LinkTrue?",
            answer: "Anyone who wants to share their wallet addresses or receive donations securely."
        },
        {
            question: "How is LinkTrue different from other bio link tools?",
            answer: "Only You own your data."
        },
        {
            question: "How is my data stored with LinkTrue?",
            answer: "Your data is kept on blockchain and secured by Ethereum Layer 2 Optimism."
        },
        {
            question: "Is it really free?",
            answer: "The platform is free and open-source, but to keep your data on blockchain, you need to pay the network fee which is typically less than $0.1 OP ETH."
        },
        {
            question: "How to add a new blockchain network or a new social media icons to LinkTrue?",
            answer: "Add the icon and open a pull request on the source code."
        },
        {
            question: "Is it really impossible to manipulate my data?",
            answer: "Your data is owned by your wallet address or your private key. If you lose them, then you lost the security guarantee. If you keep your wallet safe, then you have the promise of the Ethereum and its Layer 2 security. It’s worth mentioning that at the moment of writing this FAQ, $661M is the Total Value Locked on Optimism."
        },
        {
            question: "Why Optimism? Why Ethereum?",
            answer: "LinkTrue is EVM compatible, so it can be easily deployed on any EVM chain. We start with Ethereum Layer 2."
        },
        {
            question: "Can I fork LinkTrue and deploy it for my own use?",
            answer: "Feel free to do so."
        }
    ];

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Welcome to FAQ</h1>

            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div key={index}>
                        <h2
                            className="text-lg font-semibold cursor-pointer"
                            onClick={() => toggleAnswer(index)}
                        >
                            {item.question}
                        </h2>
                        {activeIndex === index && (
                            <p className="text-gray-700">
                                {item.answer}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
