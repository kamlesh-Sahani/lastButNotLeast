"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { loginSchema, LoginSchema } from '@/lib/validation/loginSchema';
// import Link from 'next/link';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
const ResetPassword = () => {
  const [password, setPassword] = useState<string | any>("");
  const [show, setShow] = useState(true);
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handlePasswordChange= async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/emails/validateotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, newPassword }),
      });
      const data = await response.json();
      if (response.ok && data.message === "Password Changes Successfully") {
        setMessage("Password Changes Successfully");
        router.push("/login");
      } else {
        setMessage(data.message || "Invalid Password");
      }
    } catch (error) {
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
          Reset Password
        </h1>

        <form onSubmit={handlePasswordChange}>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-500 font-medium mb-2 my-2"
            >
              Old Password
            </label>
            <div className="relative flex items-center">
              <input
                type={show ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 pr-10"
                placeholder="Enter old password"
              />
              {show ? (
                <IoEyeOutline
                  onClick={() => setShow(!show)}
                  className="absolute right-3 text-gray-500 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShow(!show)}
                  className="absolute right-3 text-gray-500 cursor-pointer"
                />
              )}
            </div>
            <label
              htmlFor="password"
              className="block text-gray-500 font-medium mb-2 my-2"
            >
             New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={show ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 pr-10"
                placeholder="Enter new password"
              />
              {show ? (
                <IoEyeOutline
                  onClick={() => setShow(!show)}
                  className="absolute right-3 text-gray-500 cursor-pointer"
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShow(!show)}
                  className="absolute right-3 text-gray-500 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="flex justify-center py-5">
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
