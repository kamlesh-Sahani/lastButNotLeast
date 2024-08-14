"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface Arrangement {
  facultyName: string;
  subject: string;
  course: string;
  semester: string;
}

interface Course {
  name: string;
  semesters: number;
}

interface Subjects {
  [key: string]: {
    [semester: number]: string[];
  };
}

const LeaveApplication: React.FC = () => {
  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [shortLeaveTime, setShortLeaveTime] = useState<string>("");
  const [document, setDocument] = useState<File | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [arrangements, setArrangements] = useState<Arrangement[]>([]);
  const [newArrangement, setNewArrangement] = useState<Arrangement>({
    facultyName: "",
    subject: "",
    course: "",
    semester: "",
  });
  const [isArrangementsVisible, setIsArrangementsVisible] = useState<boolean>(
    false
  );

  const [courses] = useState<Course[]>([
    { name: "BCA", semesters: 6 },
    { name: "BTech", semesters: 8 },
  ]);
  const [subjects] = useState<Subjects>({
    BCA: {
      1: ["Maths 1", "Programming 1", "Communication Skills"],
      2: ["Maths 2", "Programming 2", "Data Structures"],
    },
    BTech: {
      1: ["Engineering Maths 1", "Physics 1", "Chemistry 1"],
      2: ["Engineering Maths 2", "Physics 2", "Computer Science 1"],
    },
  });
  const [facultyList] = useState(["John Doe", "Jane Smith", "Albert Johnson"]);

  const handleNewArrangementChange = (
    field: keyof Arrangement,
    value: string
  ) => {
    setNewArrangement({ ...newArrangement, [field]: value });
  };

  const handleCourseChange = (course: string) => {
    setNewArrangement({ ...newArrangement, course, semester: "", subject: "" });
  };

  const handleSemesterChange = (semester: string) => {
    setNewArrangement({ ...newArrangement, semester, subject: "" });
  };

  const addArrangement = () => {
    if (
      newArrangement.facultyName &&
      newArrangement.subject &&
      newArrangement.course &&
      newArrangement.semester
    ) {
      setArrangements([...arrangements, newArrangement]);
      console.log("New Arrangement Added:", newArrangement);
      setNewArrangement({
        facultyName: "",
        subject: "",
        course: "",
        semester: "",
      });
    } else {
      console.log("Incomplete Arrangement Data");
    }
  };

  const handleDelete = (index: number) => {
    setArrangements(arrangements.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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

  const toggleArrangementsVisibility = () => {
    setIsArrangementsVisible(!isArrangementsVisible);
  };

  return (
    <div className="flex w-full justify-center items-center bg-gray-100">
      <div className="lg:max-w-4xl w-full p-8 bg-white mt-8 max-xl:m-12 max-sm:m-2 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Leave Application
        </h1>
        <form onSubmit={handleSubmit}>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                  Short Leave Time
                </label>
                <input
                  type="time"
                  value={shortLeaveTime}
                  onChange={(e) => setShortLeaveTime(e.target.value)}
                  className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
          {leaveType === "medical" && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-600">
                Upload Document
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}
          <div className="mt-6">
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
          <div className="mt-6">
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
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-600">
              Reason for Leave
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
            />
          </div>
          <div className="mt-8">
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={toggleArrangementsVisibility}
            >
              <h2 className="text-xl font-semibold text-gray-800">
                Class Arrangements
              </h2>
              {isArrangementsVisible ? (
                <HiChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <HiChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </div>
            {isArrangementsVisible && (
              <div className="mt-4 p-4 rounded-lg shadow-inner">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Faculty Name
                    </label>
                    <select
                      value={newArrangement.facultyName}
                      onChange={(e) => handleNewArrangementChange("facultyName", e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>Select Faculty</option>
                      {facultyList.map((faculty, index) => (
                        <option key={index} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Course
                    </label>
                    <select
                      value={newArrangement.course}
                      onChange={(e) => handleCourseChange(e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>Select Course</option>
                      {courses.map((course, index) => (
                        <option key={index} value={course.name}>{course.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Semester
                    </label>
                    <select
                      value={newArrangement.semester}
                      onChange={(e) => handleSemesterChange(e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>Select Semester</option>
                      {newArrangement.course &&
                        courses.find((course) => course.name === newArrangement.course)?.semesters
                        ? Array.from({ length: courses.find((course) => course.name === newArrangement.course)!.semesters }, (_, i) => i + 1).map((semester) => (
                          <option key={semester} value={semester}>{semester}</option>
                        ))
                        : null}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Subject
                    </label>
                    <select
                      value={newArrangement.subject}
                      onChange={(e) => handleNewArrangementChange("subject", e.target.value)}
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>Select Subject</option>
                      {newArrangement.course && newArrangement.semester
                        ? subjects[newArrangement.course]?.[parseInt(newArrangement.semester)]?.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))
                        : null}
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addArrangement}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Arrangement
                </button>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800">Current Arrangements</h3>
                  {arrangements.length > 0 ? (
                    <ul className="mt-4">
                      {arrangements.map((arrangement, index) => (
                        <li key={index} className="flex lg:items-center lg:justify-between max-lg:flex-col max-lg:gap-4 bg-gray-100 p-4 rounded-lg shadow-inner mb-2">
                          <span>
                            <strong>Faculty:</strong> {arrangement.facultyName} <br />
                            <strong>Subject:</strong> {arrangement.subject} <br />
                            <strong>Course:</strong> {arrangement.course} <br />
                            <strong>Semester:</strong> {arrangement.semester}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No arrangements added yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-end max-lg:flex-col gap-8 max-lg:gap-4">
            <button
              type="button"
              className="px-6 py-3 max-lg:w-full bg-gray-500 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-6 py-3 max-lg:w-full bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-6 py-3 max-lg:w-full bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
