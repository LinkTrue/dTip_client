"use client";

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';

const ConnectWallet: React.FC = () => {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    // You can return a loading spinner or null
    return <div className="animate-pulse bg-gray-700 rounded-md h-10 w-32"></div>;
  }

  if (authenticated) {
    return (
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-300 truncate" title={user?.wallet?.address}>
          {user?.wallet?.address.slice(0, 6)}...{user?.wallet?.address.slice(-4)}
        </p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out"
    >
      Login
    </button>
  );
};

export default ConnectWallet;
