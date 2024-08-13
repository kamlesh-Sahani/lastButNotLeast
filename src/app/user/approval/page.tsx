"use client";
import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";

const LeaveApprovalPage = () => {
  const [showActions, setShowActions] = useState(false);

  const handleButtonClick = () => {
    setShowActions(!showActions);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">Leave Approval Dashboard</h1>
        <p className="text-gray-700 mt-2">Review and manage leave requests submitted by employees.</p>
      </header>

      <main className="flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center mb-6">
            <FaUserCircle className="text-blue-600 text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-600">Department: Computer Science</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Leave Type:</span>
              <span className="text-gray-600">Sick Leave</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Dates:</span>
              <span className="text-gray-600">2024-08-15 - 2024-08-17</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Substitute Teacher:</span>
              <span className="text-gray-600">Jane Smith</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Reason:</span>
              <span className="text-gray-600">Medical appointment</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Proof Document:</span>
              <a
                href={`/uploads/medical_certificate.pdf`}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                medical_certificate.pdf
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleButtonClick}
            >
              {showActions ? "Hide Actions" : "Show Actions"}
            </button>
            {showActions && (
              <div className="mt-6 flex gap-4">
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <FaCheckCircle className="inline-block mr-2" />
                  Approve
                </button>
                <button
                  className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <FaTimesCircle className="inline-block mr-2" />
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaveApprovalPage;
