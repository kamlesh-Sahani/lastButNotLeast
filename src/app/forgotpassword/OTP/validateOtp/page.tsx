"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const ValidateOtp = () => {
  const [otpInput, setOtpInput] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleValidateOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("storedOTP");
    const otpExpiration = localStorage.getItem("otpExpiration");

    if (storedOtp && otpExpiration && Date.now() <= parseInt(otpExpiration)) {
      if (otpInput === storedOtp) {
        setMessageType("success");
        setMessage("OTP verified successfully.");
        router.push("/forgotpassword/resetpassword");
      } else {
        setMessageType("error");
        setMessage("Invalid OTP. Please try again.");
      }
    } else {
      setMessageType("error");
      setMessage("OTP has expired. Please request a new one.");
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
        <form onSubmit={handleValidateOtp}>
          <div className="relative mb-4">
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2 pr-10"
              placeholder="Enter OTP"
              required
            />
          </div>
          <div className="flex justify-center py-5">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Verify OTP
            </button>
          </div>
          {message && (
            <p
              className={`text-center ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ValidateOtp;
