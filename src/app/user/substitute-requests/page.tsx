"use client";
import React, { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Modal, Button } from "flowbite-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const SubstituteRequestPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const substituteRequests = [
    {
      employee: "Jane Doe",
      substituteType: "Temporary Leave",
      dates: "05-08 - 15-08",
      reason: "Personal reasons",
      status: "Pending",
    },
    {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },
      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },

      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },
      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },
      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },
      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },

      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },
      {
        employee: "Jane Doe",
        substituteType: "Temporary Leave",
        dates: "05-08 - 15-08",
        reason: "Personal reasons",
        status: "Pending",
      },
    // Add more request objects as needed
  ];

  const handleViewMore = (index) => {
    setSelectedRequest(index);
    setOpenDetails(true);
  };

  return (
    <div className="min-h-screen  p-6 md:p-8 xl:w-[90%] m-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Substitute Request Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage and approve substitute requests submitted by employees.
        </p>
      </header>

      <main className="flex flex-wrap justify-center gap-6">
        {substituteRequests.map((request, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg p-6 w-[320px]">
            <div className="flex items-center mb-4">
              <FaUserCircle className="text-blue-600 text-3xl mr-3" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{request.employee}</h3>
                <p className="text-gray-500">{request.substituteType}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-semibold">Dates:</span> {request.dates}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Reason:</span> {request.reason}
              </p>
            </div>
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${request.status === "Pending" ? "bg-yellow-500 text-white" : request.status === "Approved" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                {request.status}
              </span>
            </div>
            <div className="w-full">
              <Button onClick={() => setOpenModel(true)} className="w-full" color="blue">
                <IoNotificationsCircleOutline className="mr-1" />
                Action
              </Button>
            </div>
          </div>
        ))}
      </main>


      {/* Modal for Action */}
      <Modal
        show={openModel}
        size="md"
        popup
        onClose={() => setOpenModel(false)}
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 text-center pl-2">Enter the Comment</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <textarea
              id="comment"
              placeholder="Enter the comment (optional)"
              className="w-full h-24 px-3 py-2 border rounded-lg"
            />
            <div className="flex gap-4">
              <button onClick={() => setOpenModel(false)} className="w-[130px] h-[40px] flex justify-center items-center rounded-lg bg-green-600 text-white gap-2 ">
                <FaCheckCircle className="mr-1" />
                Accept
              </button>
              <button onClick={() => setOpenModel(false)} className="w-[130px] h-[40px] bg-red-700 rounded-lg text-white flex justify-center items-center gap-2">
                <FaTimesCircle className="mr-1" />
                Decline
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubstituteRequestPage;
