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
            answer: "LinkTrue is an open-source, free decentralized application (dApp) that consolidates crypto links and wallet addresses on a single page. It allows you to maintain control over your data, making it ideal for tips, donations, or payments."
        },
        {
            question: "Who should use LinkTrue?",
            answer: "LinkTrue is perfect for anyone wanting to securely share wallet addresses, receive donations, or promote online payment gateways."
        },
        {
            question: "How to use LinkTrue?",
            answer: "Build a profile and share a single link in your social media bio."
        },
        {
            question: "How is LinkTrue different from other bio link tools?",
            answer: "Unlike traditional bio link tools, LinkTrue ensures that only you own and control your data, providing exceptional security and integrity."
        },
        {
            question: "How is my data stored with LinkTrue?",
            answer: "Your data is securely stored on the blockchain and protected by Ethereum Layer 2 Optimism, ensuring high availability and integrity."
        },
        {
            question: "Is it really free?",
            answer: "LinkTrue is completely free and open-source. However, to store data on the blockchain, users must pay a network fee, which is typically less than $0.10 in OP ETH."
        },
        {
            question: "How can I add a new blockchain network or social media icons to LinkTrue?",
            answer: "You can easily contribute by adding the desired icon and submitting a pull request to the source code on GitHub. Here is an example commit I pushed to add Ton Blockchain network Icon: https://github.com/LinkTrue/linktrue_client/commit/5d411900157913843be05a6b07cf23b92b4f191a"
        },
        {
            question: "Is it really impossible to manipulate my data?",
            answer: "Your data is securely tied to your wallet address or private key. Losing access to them means losing your data. As long as you protect your wallet, the security of Ethereum and its Layer 2 guarantees your data's integrity. As of now, $661M is the Total Value Locked on Optimism, showcasing its robustness."
        },
        {
            question: "Why choose Optimism and Ethereum?",
            answer: "LinkTrue is EVM compatible, enabling easy deployment on any EVM chain, starting with Ethereum Layer 2 for enhanced scalability and lower transaction costs."
        },
        {
            question: "Can I fork LinkTrue and deploy it for my own use?",
            answer: "Absolutely! LinkTrue is free and open-source, so feel free to fork the project and customize it for your needs."
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
