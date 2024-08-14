"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

interface Arrangement {
  facultyName: string;
  subject: string;
  course: string;
  semester: string;
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

  const [courses] = useState([
    { name: "BCA", semesters: 6 },
    { name: "BTech", semesters: 8 },
  ]);
  const [subjects] = useState({
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
              className="flex items-center cursor-pointer"
              onClick={toggleArrangementsVisibility}
            >
              <h2 className="text-xl font-semibold text-gray-700">Class Arrangements</h2>
              {isArrangementsVisible ? (
                <HiChevronUp className="ml-2 text-xl" />
              ) : (
                <HiChevronDown className="ml-2 text-xl" />
              )}
            </div>
            {isArrangementsVisible && (
              <div className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Faculty Name
                    </label>
                    <select
                      value={newArrangement.facultyName}
                      onChange={(e) =>
                        handleNewArrangementChange(
                          "facultyName",
                          e.target.value
                        )
                      }
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select Faculty
                      </option>
                      {facultyList.map((faculty, index) => (
                        <option key={index} value={faculty}>
                          {faculty}
                        </option>
                      ))}
                    </select>
                  </div>

                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Course
                    </label>
                    <select
                      value={newArrangement.course}
                      onChange={(e) =>
                        handleCourseChange(e.target.value)
                      }
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select Course
                      </option>
                      {courses.map((course, index) => (
                        <option key={index} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Semester
                    </label>
                    <select
                      value={newArrangement.semester}
                      onChange={(e) =>
                        handleSemesterChange(e.target.value)
                      }
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select Semester
                      </option>
                      {courses
                        .find(
                          (course) => course.name === newArrangement.course
                        )
                        ?.semesters &&
                        Array.from(
                          {
                            length: courses.find(
                              (course) =>
                                course.name === newArrangement.course
                            )?.semesters,
                          },
                          (_, i) => i + 1
                        ).map((sem) => (
                          <option key={sem} value={sem}>
                            Semester {sem}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                      Subject
                    </label>
                    <select
                      value={newArrangement.subject}
                      onChange={(e) =>
                        handleNewArrangementChange(
                          "subject",
                          e.target.value
                        )
                      }
                      className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select Subject
                      </option>
                      {newArrangement.course &&
                        newArrangement.semester &&
                        subjects[newArrangement.course]?.[
                          newArrangement.semester
                        ]?.map((subject, index) => (
                          <option key={index} value={subject}>
                            {subject}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addArrangement}
                  className="mt-4 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add Arrangement
                </button>
                <div className="mt-8">
                  {arrangements.map((arrangement, index) => (
                    <div
                      key={index}
                      className="flex lg:items-center lg:justify-between max-lg:flex-col bg-gray-50 p-4 rounded-lg shadow mb-4"
                    >
                      <div>
                        <p className="text-sm">
                          <strong>Faculty:</strong>{" "}
                          {arrangement.facultyName}
                        </p>
                  
                        <p className="text-sm">
                          <strong>Course:</strong> {arrangement.course},{" "}
                          <strong>Semester:</strong>{" "}
                          {arrangement.semester}
                        </p>
                        <p className="text-sm">
                          <strong>Subject:</strong>{" "}
                          {arrangement.subject}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-white bg-red-500 p-2 max-lg:w-full  rounded-md mt-4 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
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
