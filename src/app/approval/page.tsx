"use client";
import React, { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
const LeaveApprovalPage = () => {
  const [openModel, setOpenModel] = useState(false);

  const arr = new Array(20).fill(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
          Leave Approval Dashboard
        </h1>
        <p className="text-gray-700 mt-2">
          Review and manage leav e requests submitted by employees.
        </p>
      </header>

      <main>
        <div className="bg-white  rounded-lg shadow-lg border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">Employee</th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Leave Type
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Dates</th>
                <th className="px-4 py-2 text-left text-gray-600">Reason</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-gray-600">Details</th>
                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                arr.map((a,i)=>(  <tr>
                  <td className="px-4 py-4 flex items-center justify-center" key={i}>
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
                    <button className=" w-[130px] h-[40px] rounded-lg shadow-md bg-[#eee] hover:bg-[#fff] flex justify-center items-center gap-2">
                      View more
                    </button>
                  </td>
  
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-red-500 text-white w-[120px] h-[40px] rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={() => setOpenModel(true)}
                      >
                        <IoNotificationsCircleOutline className="inline-block mr-2" />
                        Action
                      </button>
                    </div>
                  </td>
                </tr>))
              }
            
              
            </tbody>
          </table>
        </div>
      </main>
      {/* dialog box for comment */}

      <>
        <Modal
          show={openModel}
          size="xl"
          popup
          onClose={() => setOpenModel(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Enter the Comment
              </h3>
              <div>
                <TextInput
                  id="comment"
                  placeholder="Enter the comment (optional)"
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white w-[120px] h-[40px] rounded-lg shadow-md h"
                  onClick={() => setOpenModel(true)}
                >
                  <FaCheckCircle className="inline-block mr-2" />
                  Action
                </button>
                <button
                  className="bg-red-500 text-white w-[120px] h-[40px] rounded-lg shadow-md "
                  onClick={() => setOpenModel(true)}
                >
                  <FaTimesCircle className="inline-block mr-2" />
                  Declined
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default LeaveApprovalPage;
