"use client";
import React, { useState } from "react";

const LeaveApplicationPage = () => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [substituteTeacher, setSubstituteTeacher] = useState("");
  const [document, setDocument] = useState<File | null>(null);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, such as sending data to an API
    console.log({
      leaveType,
      startDate,
      endDate,
      reason,
      substituteTeacher,
      documentName: document?.name,
    });

    // Reset form after submission
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setSubstituteTeacher("");
    setDocument(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Apply for Leave</h1>
        <p className="text-gray-600 mt-2">
          Fill out the form below to apply for leave.
        </p>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="leaveType">
              Leave Type
            </label>
            <select
              id="leaveType"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Leave Type
              </option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="reason">
              Reason for Leave
            </label>
            <textarea
              id="reason"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={4}
              placeholder="Provide a brief reason for your leave..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="substituteTeacher">
              Substitute Teacher Name
            </label>
            <input
              id="substituteTeacher"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={substituteTeacher}
              onChange={(e) => setSubstituteTeacher(e.target.value)}
              placeholder="Enter the name of the teacher who will take your classes..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="document">
              Upload Document (Proof of Leave)
            </label>
            <input
              id="document"
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleDocumentUpload}
            />
            {document && (
              <p className="mt-2 text-gray-600">Uploaded: {document.name}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply for Leave
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LeaveApplicationPage;
