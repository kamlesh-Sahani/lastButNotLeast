"use client";
import { getAllLeaveType } from "@/lib/strore/features/leave/types/typesThank";
import { allUser } from "@/lib/strore/features/user/userThanks";
import { AppDispatch, RootState } from "@/lib/strore/store";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import {useDispatch,useSelector} from 'react-redux';
interface Arrangement {
  facultyName: string;
  subject: string;
  course: string;
  date: string;
  time: string;
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
  const dispatch = useDispatch<AppDispatch>();
  const {allLeave,isLoading,error} = useSelector((state:RootState)=>state.getAllLeaveType);
  const {employee} = useSelector((state:RootState)=>state.allEmployee);


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
    date: "",
    time: "",
  });
  const [isArrangementsVisible, setIsArrangementsVisible] =
    useState<boolean>(false);

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
    setNewArrangement({ ...newArrangement, course, subject: "" });
  };

  const addArrangement = () => {
    if (
      newArrangement.facultyName &&
      newArrangement.subject &&
      newArrangement.course &&
      newArrangement.date &&
      newArrangement.time
    ) {
      setArrangements([...arrangements, newArrangement]);
      console.log("New Arrangement Added:", newArrangement);
      setNewArrangement({
        facultyName: "",
        subject: "",
        course: "",
        date: "",
        time: "",
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


  

  useEffect(()=>{
    dispatch(getAllLeaveType())
    dispatch(allUser());
  },[])
  console.log(allLeave,"leaveTpe");
  console.log(employee,"allEmpllloyee");
  return (
    <div className="flex w-full justify-center items-center bg-gray-100">
      <div className="lg:max-w-5xl w-full p-8 bg-white mt-8 max-xl:m-12 max-sm:m-2 rounded-lg shadow-xl">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
              <h2 className="text-xl font-semibold text-gray-700">
                Arrangements
              </h2>
              {isArrangementsVisible ? (
                <HiChevronUp className="text-gray-500" />
              ) : (
                <HiChevronDown className="text-gray-500" />
              )}
            </div>
            {isArrangementsVisible && (
              <div className="mt-4 w-full space-y-4">
                <div className=" p-4 w-full rounded-lg shadow-inner">
                  <div className="grid  grid-cols-2 gap-4">
                    <select
                      value={newArrangement.facultyName}
                      onChange={(e) =>
                        handleNewArrangementChange(
                          "facultyName",
                          e.target.value
                        )
                      }
                      className="w-full col-span-2  px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    <select
                      value={newArrangement.course}
                      onChange={(e) => handleCourseChange(e.target.value)}
                      className="w-full px-4 max-lg:col-span-2   py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    <select
                      value={newArrangement.subject}
                      onChange={(e) =>
                        handleNewArrangementChange("subject", e.target.value)
                      }
                      className="w-full max-lg:col-span-2 px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="" disabled>
                        Select Subject
                      </option>
                      {subjects[newArrangement.course]?.[1]?.map(
                        (subject, index) => (
                          <option key={index} value={subject}>
                            {subject}
                          </option>
                        )
                      )}
                    </select>
                   
                  </div>
                  <div className="grid grid-cols-2  gap-4">
                    <div className="mt-4 max-lg:col-span-2 ">
                      <label className="block text-sm font-semibold text-gray-600">
                        Date
                      </label>
                      <input
                        type="date"
                        value={newArrangement.date}
                        onChange={(e) =>
                          handleNewArrangementChange("date", e.target.value)
                        }
                        className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div className="mt-4 max-lg:col-span-2 ">
                      <label className="block text-sm font-semibold text-gray-600">
                        Time
                      </label>
                      <input
                        type="time"
                        value={newArrangement.time}
                        onChange={(e) =>
                          handleNewArrangementChange("time", e.target.value)
                        }
                        className="mt-2 block w-full px-4 py-3 bg-gray-50 shadow-inner border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addArrangement}
                    className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Add Arrangement
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 rounded-lg shadow-inner">
                    <thead className="text-xs text-gray-700 uppercase">
                      <tr>
                        <th className="px-4 py-2">Faculty</th>
                   
                        <th className="px-4 py-2">Course</th>
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time</th>
                   
                      </tr>
                    </thead>
                    <tbody>
                      {arrangements.map((arrangement, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-4 py-2">
                            {arrangement.facultyName}
                          </td>
                    
                          <td className="px-4 py-2">{arrangement.course}</td>
                          <td className="px-4 py-2">{arrangement.subject}</td>
                          <td className="px-4 py-2">{arrangement.date}</td>
                          <td className="px-4 py-2">{arrangement.time}</td>
                          <td className="px-4 py-2 text-right">
                            <button
                              onClick={() => handleDelete(index)}
                              className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
