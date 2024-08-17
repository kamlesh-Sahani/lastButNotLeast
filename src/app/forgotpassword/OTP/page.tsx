"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { generateOTP } from "@/utils/otp.utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setMessage("");

    const otp = generateOTP();
    const otpExpiration = Date.now() + 5 * 60 * 1000;

    try {
      const response = await fetch("/api/emails/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "Saad Mehmood", otp }),
      });

      const data = await response.json();
      if (response.ok && data.message === "Email sent successfully") {
        setMessageType("success");
        setMessage("Email sent successfully.");
        localStorage.setItem("storedOTP", otp);
        localStorage.setItem("otpExpiration", otpExpiration.toString());
        router.push("/forgotpassword/OTP/validateOtp");
      } else {
        setMessageType("error");
        setMessage(data.message || "Invalid EMAIL.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred.");
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
        <form onSubmit={handleOtp}>
          <div>
            <div className="relative">
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

export default ForgotPassword;
  