"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ValidateOtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleValidateOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/emails/validateotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await response.json();
      if (response.ok && data.message === "OTP is valid") {
        setMessage("OTP validated successfully.");
        router.push("/forgotpassword/resetpassword");
      } else {
        setMessage(data.message || "Invalid OTP.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Validate OTP
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Enter the OTP sent to your email address to validate.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter your OTP"
          className="w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 mb-4"
        />
        <button
          onClick={handleValidateOtp}
          disabled={loading}
          className="w-full  bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 disabled:bg-gray-400 transition"
        >
          {loading ? "Validating..." : "Validate OTP"}
        </button>
        {message && <div className="mt-2">{message}</div>}
      </div>
    </div>
  );
};

export default ValidateOtpPage;
