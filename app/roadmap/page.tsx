"use client";

enum taskStatus {
    upcoming = "bg-gray-500",
    ongoing = "bg-blue-500",
    completed = "fa fa-check text-green-500",
    cancelled = "fa fa-x text-red-500"
}

export default function Roadmap() {
    const roadmapItems = [
        {
            date: "O4 2024",
            tasks: [
                { task: "TESTNET Launch: Mint your profile now!", status: taskStatus.completed },
                { task: "Add FAQ section.", status: taskStatus.completed },
                { task: "Add a minimal and clear landing page", status: taskStatus.ongoing },
                { task: "Add progress bar at on-boarding", status: taskStatus.upcoming },
                { task: "Integrate Fiat-On-Ramp for $AVAX.", status: taskStatus.upcoming },
                { task: "Setup CICD.", status: taskStatus.upcoming },
                { task: "Show the preview side by side", status: taskStatus.upcoming },
                { task: "Allow users to send a Feedback easily.", status: taskStatus.upcoming },
                { task: "Add Dark Mode.", status: taskStatus.upcoming },
            ],
        },
        {
            date: "Q1 2025",
            tasks: [
                { task: "Allow MODIFICATION of the profile.", status: taskStatus.upcoming },
                { task: "Polish the Design.", status: taskStatus.upcoming },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">ROADMAP</h1>
                <h2 className="text-xl font-bold mb-4 text-center">Empowering Creators</h2>
                <p className="text-gray-600 mb-4">Comprehensive cryptocurrency-based income solution for creators.</p>
                <hr />
                <ul className="space-y-6 text-center justify-center flex flex-col">
                    {roadmapItems.map((item, index) => (
                        <li key={index} className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-500">{item.date}</span>
                            <ul className="space-y-2 mt-2">
                                {item.tasks.map((taskItem, taskIndex) => (
                                    <li key={taskIndex} className="flex items-center">
                                        <span
                                            className={`w-4 h-4 mr-3 rounded-full ${taskItem.status}`}
                                        ></span>
                                        <span className="text-gray-700">{taskItem.task}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                {/* Color Legend */}
                <div className="mt-8">
                    <hr />
                    <h3 className="text-lg font-bold mb-2">Color Legend</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="w-4 h-4 mr-3 rounded-full bg-gray-500 flex items-center justify-center">
                            </span>
                            <span className="text-gray-700">Upcoming</span>
                        </li>
                        <li className="flex items-center">
                            <span className="w-4 h-4 mr-3 rounded-full bg-blue-500 flex items-center justify-center">
                            </span>
                            <span className="text-gray-700">Ongoing</span>
                        </li>
                        <li className="flex items-center">
                            <span className="w-4 h-4 mr-3 flex items-center justify-center">
                                <span className="fa fa-check text-green-700"></span>
                            </span>
                            <span className="text-gray-700">Completed</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
