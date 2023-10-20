"use client"
import React from 'react';
import { signOut } from 'next-auth/react';

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
      Log Out
    </button>
  );
};

export default LogoutButton;
