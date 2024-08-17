"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/emails/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log(email);
      const data = await response.json();
      if (response.ok && data.message === "OTP sent successfully") {
        setMessage("OTP sent to your email.");
        router.push("/forgotpassword/OTP/validateOtp"); // Ensure this route is correct
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("An error occurred.");
      console.log(email);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex gap-4 justify-center">
          <MdEmail className="text-4xl text-gray-600" />
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
            Email Verification
          </h1>
        </div>
        <p className="text-center text-gray-600 mb-4">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>
        <form onSubmit={handleRequestOtp}>
          <div>
            <div className="relative">
              {/* <label htmlFor="email" className="  font-medium mb-2 my-2">
                Email:
              </label> */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 pr-10"
                placeholder="saadmehmood@gmail.com"
                required
              />
            </div>
          </div>
          <div className="flex justify-center py-5">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50 disabled:bg-gray-400"
            >
              {loading ? "Sending OTP..." : "GET OTP"}
            </button>
          </div>
          {message && <p className="text-center text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
