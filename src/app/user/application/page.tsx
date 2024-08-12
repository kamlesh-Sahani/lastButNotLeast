"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

const LeaveApplication: React.FC = () => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [shortLeaveTime, setShortLeaveTime] = useState<string>("");
  const [document, setDocument] = useState<File | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  // State for class arrangements
  const [arrangements, setArrangements] = useState<Array<{
    facultyName: string;
    department: string;
    subject: string;
    course: string;
    semester: string;
  }>>([]);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add submit logic here
    console.log({ leaveType, startDate, endDate, shortLeaveTime, document, phone, email, reason, arrangements });
  };

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocument(e.target.files[0]);
    }
  };

  // Handle arrangement changes
  const handleArrangementChange = (index: number, field: string, value: string) => {
    const newArrangements = [...arrangements];
    newArrangements[index] = { ...newArrangements[index], [field]: value };
    setArrangements(newArrangements);
  };

  // Add new arrangement
  const addArrangement = () => {
    setArrangements([
      ...arrangements,
      { facultyName: "", department: "", subject: "", course: "", semester: "" },
    ]);
  };

  // Remove arrangement
  const removeArrangement = (index: number) => {
    setArrangements(arrangements.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full justify-center items-center bg-gradient-to-r bg-gray-50">
      <div className="max-w-4xl w-full p-8 bg-white  mt-8 max-xl:m-12 rounded-lg shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Leave Application
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Leave Type Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Leave Type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="" disabled>
                Select Leave Type
              </option>
              <option value="casual">Casual Leave</option>
              <option value="medical">Medical Leave</option>
              <option value="short">Short Leave</option>
            </select>
          </div>

          {/* Date and Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {leaveType === "short" && (
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Time
                </label>
                <input
                  type="time"
                  value={shortLeaveTime}
                  onChange={(e) => setShortLeaveTime(e.target.value)}
                  className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            )}

            {leaveType === "medical" && (
              <div>
                <label className="block text-sm font-semibold text-gray-600">
                  Upload Document
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-2 block w-full text-sm bg-gray-50 text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Reason for Leave Section */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-600">
              Reason for Leave
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 block w-full px-4 py-3 shadow-inner bg-gray-50 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
            ></textarea>
          </div>

          {/* Class Arrangement Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Class Arrangement</h2>
            {arrangements.map((arrangement, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      value={arrangement.facultyName}
                      onChange={(e) => handleArrangementChange(index, 'facultyName', e.target.value)}
                      className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Department
                    </label>
                    <input
                      type="text"
                      value={arrangement.department}
                      onChange={(e) => handleArrangementChange(index, 'department', e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={arrangement.subject}
                      onChange={(e) => handleArrangementChange(index, 'subject', e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Course
                    </label>
                    <input
                      type="text"
                      value={arrangement.course}
                      onChange={(e) => handleArrangementChange(index, 'course', e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Semester
                    </label>
                    <input
                      type="text"
                      value={arrangement.semester}
                      onChange={(e) => handleArrangementChange(index, 'semester', e.target.value)}
                      className="mt-2 block bg-gray-50 w-full px-4 py-3 rounded-lg shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => removeArrangement(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addArrangement}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-all duration-200"
            >
              Add Arrangement
            </button>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-yellow-400 text-white rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-200"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplication;
