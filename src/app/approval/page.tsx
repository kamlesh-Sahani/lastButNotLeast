"use client";
import React, { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, Modal, TextInput } from "flowbite-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";

const LeaveApprovalPage = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const arr = new Array(20).fill(0);

  const handleViewMore = (index) => {
    // Set the selected leave request and open the details modal
    setSelectedLeave(index);
    setOpenDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
          Leave Approval Dashboard
        </h1>
        <p className="text-gray-700 mt-2">
          Review and manage leave requests submitted by employees.
        </p>
      </header>

      <main>
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Employee</th>
                <th className="px-4 py-2 text-left text-gray-600">Leave Type</th>
                <th className="px-4 py-2 text-left text-gray-600">Dates</th>
                <th className="px-4 py-2 text-left text-gray-600">Reason</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Details</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {arr.map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-4 flex items-center justify-center">
                    <FaUserCircle className="text-blue-600 text-2xl mr-3" />
                    John Doe
                  </td>
                  <td className="px-4 py-4">Sick Leave</td>
                  <td className="px-4 py-4">15-10 - 08-3</td>
                  <td className="px-4 py-4">Medical appointment</td>
                  <td className="px-4 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      className="w-[130px] h-[40px] rounded-lg shadow-md bg-[#eee] hover:bg-[#fff] flex justify-center items-center gap-2 transition-colors duration-300"
                      onClick={() => handleViewMore(i)}
                    >
                      View More
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-red-500 text-white w-[120px] h-[40px] rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                        onClick={() => setOpenModel(true)}
                      >
                        <IoNotificationsCircleOutline className="inline-block mr-2" />
                        Action
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal for Leave Details */}
      <Modal
        show={openDetails}
        size="md"
        popup
        onClose={() => setOpenDetails(false)}
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900">
            Leave Request Details
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4 space-y-4 bg-gray-50 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-800">Employee: John Doe</p>
            <p className="text-lg font-medium text-gray-800">Leave Type: Sick Leave</p>
            <p className="text-lg font-medium text-gray-800">Dates: 15-10 - 08-3</p>
            <p className="text-lg font-medium text-gray-800">Reason: Medical appointment</p>
            <p className="text-lg font-medium text-gray-800">Proof Document: <a href={`/uploads/medical_certificate.pdf`} className="text-blue-600 hover:underline">medical_certificate.pdf</a></p>
            <p className="text-lg font-medium text-gray-800">Additional Comments: N/A</p>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              className="bg-green-500 text-white w-full h-[40px] rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
              onClick={() => setOpenDetails(false)}
            >
              <FaCheckCircle className="inline-block mr-2" />
              Approve
            </button>
            <button
              className="bg-red-500 text-white w-full h-[40px] rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
              onClick={() => setOpenDetails(false)}
            >
              <FaTimesCircle className="inline-block mr-2" />
              Decline
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal for Comment */}
      <Modal
        show={openModel}
        size="md"
        popup
        onClose={() => setOpenModel(false)}
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900">Enter the Comment</h3>
        </Modal.Header>
        <Modal.Body>
          <div className="p-4 space-y-6 bg-gray-50 rounded-lg shadow-md">
            <TextInput
              id="comment"
              placeholder="Enter the comment (optional)"
              className="w-full"
            />
            <div className="flex gap-4">
              <button
                className="bg-green-500 text-white w-full h-[40px] rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                onClick={() => setOpenModel(false)}
              >
                <FaCheckCircle className="inline-block mr-2" />
                Action
              </button>
              <button
                className="bg-red-500 text-white w-full h-[40px] rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
                onClick={() => setOpenModel(false)}
              >
                <FaTimesCircle className="inline-block mr-2" />
                Decline
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeaveApprovalPage;
