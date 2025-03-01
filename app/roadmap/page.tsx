"use client";

import { useEffect } from "react";

enum taskStatus {
    upcoming = "bg-gray-400",
    ongoing = "bg-blue-500",
    completed = "fa fa-check text-green-500",
}

export default function Roadmap() {
    const roadmapItems = [
        {
            date: "Q1 2025",
            tasks: [
                { task: "TESTNET Live: Soneium", status: taskStatus.completed },
                { task: "Launch Landing & FAQ Pages", status: taskStatus.completed },
                { task: "Integrate User Feedback", status: taskStatus.completed },
                { task: "One-Click Donations", status: taskStatus.ongoing },
                { task: "MAINNET: Soneium", status: taskStatus.ongoing },
            ],
        },
        {
            date: "Coming Soon",
            tasks: [
                { task: "Profile Editing", status: taskStatus.upcoming },
                { task: "Fiat On-Ramp for $ETH", status: taskStatus.upcoming },
                { task: "More Features...", status: taskStatus.upcoming },
            ],
        },
    ];


    // Set the page title dynamically
    useEffect(() => {
        document.title = 'Roadmap | LinkTrue'; // Change this to whatever you want the title to be
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-xl mb-6 text-center">Roadmap</h1>
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
                    Your Donation Hub
                </h2>
                <p className="text-center text-gray-500 mb-6">Share your links & wallets, trustlessly</p>

                <div className="space-y-8">
                    {roadmapItems.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-bold text-gray-600 text-center mb-3 uppercase">
                                {item.date}
                            </h3>
                            <ul className="space-y-3">
                                {item.tasks.map((taskItem, taskIndex) => (
                                    <li key={taskIndex} className="flex items-center space-x-3">
                                        <span className={`w-4 h-4 flex items-center justify-center ${taskItem.status} rounded-full`}>

                                        </span>
                                        <span className="text-gray-700">{taskItem.task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Color Legend */}
                <div className="mt-10 border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Legend</h3>
                    <div className="flex justify-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 rounded-full bg-gray-400"></span>
                            <span className="text-gray-600 text-sm">Upcoming</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                            <span className="text-gray-600 text-sm">Ongoing</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-4 h-4 flex items-center justify-center">
                                <i className="fa fa-check text-green-600"></i>
                            </span>
                            <span className="text-gray-600 text-sm">Completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
