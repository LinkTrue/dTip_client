"use client";

enum taskStatus {
    upcoming = "bg-gray-500",
    ongoing = "bg-blue-500",
    completed = "bg-green-500",
    cancelled = "bg-black"
}

export default function Roadmap() {
    const roadmapItems = [
        {
            date: "Oct 2024",
            tasks: [
                { task: "TESTNET Launch:Reserve your profile now!", status: taskStatus.completed },
                { task: "Allow MODIFICATION of the profile.", status: taskStatus.ongoing },
                { task: "Setup CICD.", status: taskStatus.upcoming },
                { task: "Add progress bar", status: taskStatus.upcoming },
            ],
        },
        {
            date: "Nov 2024",
            tasks: [
                { task: "Add FAQ section.", status: taskStatus.upcoming },
                { task: "Add Sentry Feedback functionality.", status: taskStatus.upcoming },
                { task: "Add Dark Mode.", status: taskStatus.upcoming },
                { task: "Use browser localstorage and PWA for seamless ux", status: taskStatus.upcoming },
            ],
        },
        {
            date: "Dec 2024",
            tasks: [
                { task: "Polish the Design.", status: taskStatus.upcoming },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Timeline</h1>
                <h2 className="text-xl font-bold mb-4 text-center">Donation Channel for Creators</h2>
                <p className="text-gray-600 mb-4">
                    We’re building a full solution for managing crypto donations, and this is just the start.
                </p>
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
                    <h3 className="text-lg font-bold mb-2">Task Status Color Legend</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className={`w-4 h-4 mr-3 rounded-full ${taskStatus.upcoming}`}></span>
                            <span className="text-gray-700">Upcoming</span>
                        </li>
                        <li className="flex items-center">
                            <span className={`w-4 h-4 mr-3 rounded-full ${taskStatus.ongoing}`}></span>
                            <span className="text-gray-700">Ongoing</span>
                        </li>
                        <li className="flex items-center">
                            <span className={`w-4 h-4 mr-3 rounded-full ${taskStatus.completed}`}></span>
                            <span className="text-gray-700">Completed</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
