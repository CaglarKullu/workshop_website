
"use client"
import prisma from "@/lib/utils/prisma";
import { Role } from "@prisma/client";
import React, { useState, ChangeEvent, FormEventHandler } from "react";

const SignUp: React.FC = () => {
  const[busy, setBusy] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add user registration logic here
    e.preventDefault();
    setBusy(true);
    const newUser = {
      name:email,
      email:email,
      role: Role.ANON,
      ev_slug:"1234",
    };
    
    const res = await fetch("/api/v1/auth/users", {
      method: "POST",
      body: JSON.stringify(newUser)
    });
  
    if (res.ok) {
      // Handle successful registration
      console.log("success");
    } else {
      const data = await res.json();
        // Handle any errors returned from the server
        console.error(data.message || "An error occurred during registration.");
    }
    setBusy(false);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleSignUp}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          disabled={busy}
          style={{opacity: busy? 0.5:1}}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
