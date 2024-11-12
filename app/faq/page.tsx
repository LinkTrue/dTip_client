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
            question: "What is LinkTrue?",
            answer: "LinkTrue is an open-source, free decentralized application (dApp) that consolidates crypto links and wallet addresses on a single page. Ideal for vigilant individuals who value transparency and control, empowering you to trust but verify."
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
            answer: "Your data is securely stored on the blockchain, which is why a small transaction fee is required. This storage is protected by the Avalanche network, ensuring high availability and data integrity."
        },
        {
            question: "Is it really free?",
            answer: "LinkTrue is completely free and open-source. However, to mint your profile on the blockchain, you need to pay the blockchain network fee, which costs around 0.02 in $avax"
        },
        {
            question: "How can I add a new blockchain network or social media icons to LinkTrue?",
            answer: "You can easily contribute by adding the desired icon and submitting a pull request to the source code on GitHub. Here is an example commit I pushed to add Ton Blockchain network Icon: https://github.com/LinkTrue/linktrue_client/commit/5d411900157913843be05a6b07cf23b92b4f191a"
        },
        {
            question: "Is it really impossible to manipulate my data?",
            answer: "Your data is securely tied to your wallet address or private key and the security of the Avalanche Blockchain Network. Losing access to your key or wallet, means losing access to your data."
        },
        {
            question: "Which blockchain networks LinkTrue support?",
            answer: "LinkTrue enables you to share wallet addresses from any blockchain network. However, LinkTrue's database is set up on the Avalanche blockchain."
        },
        {
            question: "Can I fork LinkTrue and deploy it for my own use?",
            answer: "Absolutely! LinkTrue is free and open-source, so feel free to fork the project and customize it for your needs."
        }
    ];


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h1>

            <div className="space-y-4">
                {faqItems.map((item, index) => (
                    <div key={index} className={`border-gray-200 pb-4 border-x-2 rounded-xl p-2 cursor-pointer ${activeIndex === index ? 'bg-gray-100' : ''}`}
                        onClick={() => toggleAnswer(index)}
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
