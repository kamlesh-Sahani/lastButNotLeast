"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

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
  const [arrangements, setArrangements] = useState<
    Array<{
      facultyName: string;
      department: string;
      subject: string;
      course: string;
      semester: string;
    }>
  >([]);

  // State for new arrangement inputs
  const [newArrangement, setNewArrangement] = useState<{
    facultyName: string;
    department: string;
    subject: string;
    course: string;
    semester: string;
  }>({
    facultyName: "",
    department: "",
    subject: "",
    course: "",
    semester: "",
  });

  // State for toggling the class arrangements section
  const [isArrangementsVisible, setIsArrangementsVisible] =
    useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add submit logic here
    console.log({
      leaveType,
      startDate,
      endDate,
      shortLeaveTime,
      document,
      phone,
      email,
      reason,
      arrangements,
    });
  };

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocument(e.target.files[0]);
    }
  };

  // Handle new arrangement input changes
  const handleNewArrangementChange = (field: string, value: string) => {
    setNewArrangement((prev) => ({ ...prev, [field]: value }));
  };

  // Add new arrangement
  const addArrangement = () => {
    if (
      newArrangement.facultyName &&
      newArrangement.department &&
      newArrangement.subject &&
      newArrangement.course &&
      newArrangement.semester
    ) {
      setArrangements((prev) => [...prev, newArrangement]);
      setNewArrangement({
        facultyName: "",
        department: "",
        subject: "",
        course: "",
        semester: "",
      }); // Reset input fields
    }
  };
  // Handle delete arrangement
  const handleDelete = (index: number) => {
    setArrangements((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle visibility of class arrangements section
  const toggleArrangementsVisibility = () => {
    setIsArrangementsVisible((prev) => !prev);
  };

  return (
    <div className="flex w-full justify-center items-center  bg-gray-100">
      <div className="lg:max-w-4xl w-full p-8 bg-white mt-8 max-xl:m-12 max-sm:m-2 rounded-lg shadow-xl">
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
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              Class Arrangement
              <button
                type="button"
                onClick={toggleArrangementsVisibility}
                className="ml-4 text-gray-600 hover:text-gray-800"
              >
                {isArrangementsVisible ? (
                  <HiChevronUp className="w-6 h-6" />
                ) : (
                  <HiChevronDown className="w-6 h-6" />
                )}
              </button>
            </h2>

            {/* New Arrangement Input Section */}
            {isArrangementsVisible && (
              <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      value={newArrangement.facultyName}
                      onChange={(e) =>
                        handleNewArrangementChange(
                          "facultyName",
                          e.target.value
                        )
                      }
                      className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Department
                    </label>
                    <input
                      type="text"
                      value={newArrangement.department}
                      onChange={(e) =>
                        handleNewArrangementChange("department", e.target.value)
                      }
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 rounded-lg shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={newArrangement.subject}
                      onChange={(e) =>
                        handleNewArrangementChange("subject", e.target.value)
                      }
                      className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Course
                    </label>
                    <input
                      type="text"
                      value={newArrangement.course}
                      onChange={(e) =>
                        handleNewArrangementChange("course", e.target.value)
                      }
                      className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Semester
                    </label>
                    <input
                      type="text"
                      value={newArrangement.semester}
                      onChange={(e) =>
                        handleNewArrangementChange("semester", e.target.value)
                      }
                      className="mt-2 block w-full px-4 py-3 rounded-lg bg-gray-50 shadow-inner border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addArrangement}
                  className="mt-4 max-lg:text-sm p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add Arrangement
                </button>
              </div>
            )}

            {/* List of Arrangements */}
            {arrangements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Current Arrangements
                </h3>
                <ul className="space-y-4">
                  {arrangements.map((arrangement, index) => (
                    <li
                      key={index}
                      className="border max-lg:flex-col p-4 rounded-lg shadow-sm bg-gray-50 flex lg:justify-between lg:items-center"
                    >
                      <div>
                        <p>
                          <strong>Faculty Name:</strong>{" "}
                          {arrangement.facultyName}
                        </p>
                        <p>
                          <strong>Department:</strong> {arrangement.department}
                        </p>
                        <p>
                          <strong>Subject:</strong> {arrangement.subject}
                        </p>
                        <p>
                          <strong>Course:</strong> {arrangement.course}
                        </p>
                        <p>
                          <strong>Semester:</strong> {arrangement.semester}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 p-2 rounded-md mt-4 text-white  hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 flex max-lg:flex-col md:gap-10 gap-4 justify-center items-center w-full text-center">
            <button
              type="submit"
              className="max-lg:text-sm p-3 max-lg:w-full bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Cancel Application
            </button>
            <button
              type="submit"
              className="max-lg:text-sm p-3 max-lg:w-full bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Application
            </button>
            <button
              type="submit"
              className="max-lg:text-sm p-3 max-lg:w-full bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Save As Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveApplication;
