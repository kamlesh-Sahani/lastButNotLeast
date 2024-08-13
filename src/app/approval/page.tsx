"use client";
import React, { useState } from "react";
import { FaUserCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
const LeaveApprovalPage = () => {
  const [declinedOpenModal, setDeclinedOpenModal] = useState(false);
  const  [approvedOpenModal,setApprovedOpenModal] = useState(false)

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
                <th className="px-4 py-5 text-left text-gray-600">Employee</th>
                {/* <th className="px-4 py-2 text-left text-gray-600">Department</th> */}
                <th className="px-4 py-5 text-left text-gray-600">
                  Leave Type
                </th>
                <th className="px-4 py-5 text-left text-gray-600">Dates</th>
                {/* <th className="px-4 py-2 text-left text-gray-600">Substitute Teacher</th> */}
                <th className="px-4 py-5 text-left text-gray-600">Reason</th>
                <th className="px-4 py-5 text-left text-gray-600">
                  Proof Document
                </th>
                <th className="px-4 py-5 text-left text-gray-600">Status</th>
                <th className="px-4 py-5 text-center text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
          

              <tr>
                <td className="px-4 py-4 flex items-center justify-center">
                  <FaUserCircle className="text-blue-600 text-2xl mr-3" />
                  John Doe
                </td>
                <td className="px-4 py-4">Sick Leave</td>
                <td className="px-4 py-4">15-10 - 08-3</td>
                <td className="px-4 py-4">Medical appointment</td>
                <td className="px-4 py-4">
                  <a
                    href={`/uploads/medical_certificate.pdf`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    medical_certificate.pdf
                  </a>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-600 text-white w-[140px] h-[40px]  rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" onClick={() => setApprovedOpenModal(true)}>
                      <FaCheckCircle className="inline-block mr-2" />
                      Approve
                    </button>
                    <button className="bg-red-600 text-white w-[140px] h-[40px] rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => setDeclinedOpenModal(true)}>
                      <FaTimesCircle className="inline-block mr-2" />
                      Declined
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 flex items-center justify-center">
                  <FaUserCircle className="text-blue-600 text-2xl mr-3" />
                  John Doe
                </td>
                <td className="px-4 py-4">Sick Leave</td>
                <td className="px-4 py-4">15-10 - 08-3</td>
                <td className="px-4 py-4">Medical appointment</td>
                <td className="px-4 py-4">
                  <a
                    href={`/uploads/medical_certificate.pdf`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    medical_certificate.pdf
                  </a>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-600 text-white w-[140px] h-[40px]  rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" onClick={() => setApprovedOpenModal(true)}>
                      <FaCheckCircle className="inline-block mr-2" />
                      Approve
                    </button>
                    <button className="bg-red-600 text-white w-[140px] h-[40px] rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => setDeclinedOpenModal(true)}>
                      <FaTimesCircle className="inline-block mr-2" />
                      Declined
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-4 flex items-center justify-center">
                  <FaUserCircle className="text-blue-600 text-2xl mr-3" />
                  John Doe
                </td>
                <td className="px-4 py-4">Sick Leave</td>
                <td className="px-4 py-4">15-10 - 08-3</td>
                <td className="px-4 py-4">Medical appointment</td>
                <td className="px-4 py-4">
                  <a
                    href={`/uploads/medical_certificate.pdf`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    medical_certificate.pdf
                  </a>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-600 text-white w-[140px] h-[40px]  rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" onClick={() => setApprovedOpenModal(true)}>
                      <FaCheckCircle className="inline-block mr-2" />
                      Approve
                    </button>
                    <button className="bg-red-600 text-white w-[140px] h-[40px] rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => setDeclinedOpenModal(true)}>
                      <FaTimesCircle className="inline-block mr-2" />
                      Declined
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-4 flex items-center justify-center">
                  <FaUserCircle className="text-blue-600 text-2xl mr-3" />
                  John Doe
                </td>
                <td className="px-4 py-4">Sick Leave</td>
                <td className="px-4 py-4">15-10 - 08-3</td>
                <td className="px-4 py-4">Medical appointment</td>
                <td className="px-4 py-4">
                  <a
                    href={`/uploads/medical_certificate.pdf`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    medical_certificate.pdf
                  </a>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-500 text-white">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-600 text-white w-[140px] h-[40px]  rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" onClick={() => setApprovedOpenModal(true)}>
                      <FaCheckCircle className="inline-block mr-2" />
                      Approve
                    </button>
                    <button className="bg-red-600 text-white w-[140px] h-[40px] rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => setDeclinedOpenModal(true)}>
                      <FaTimesCircle className="inline-block mr-2" />
                      Declined
                    </button>
                  </div>
                </td>
              </tr>
              

              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </main>
{/* dialog box for comment */}
      <>
        <Modal
          show={declinedOpenModal}
          size="md"
          popup
          onClose={() => setDeclinedOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
               Enter the Comment to <span className="text-red-600 font-semibold">Declined</span> 
              </h3>
              <div>
                <TextInput
                  id="comment"
                  placeholder="Enter the comment (optional)"
                  required
                />
                <Button className="bg-red-600 mt-3 rounded w-[140px] h-[40px] hover:bg-red-300">Submit</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
      <>

        <Modal
          show={approvedOpenModal}
          size="md"
          popup
          onClose={() => setApprovedOpenModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
               Enter the Comment to <span className="text-green-600 font-semibold">Approved</span> 
              </h3>
              <div>
                <TextInput
                  id="comment"
                  placeholder="Enter the comment (optional)"

                />
                <Button className="bg-green-600 mt-3 rounded w-[140px] h-[40px] hover:bg-red-300">Submit</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default LeaveApprovalPage;
