"use client";

import { useState } from "react";
import { FiPlus, FiEdit, FiTrash, FiX, FiInfo } from "react-icons/fi";

interface LeaveType {
  id: number;
  name: string;
  yearlyDays: number;
  monthlyDays: number;
  weeklyDays: number;
  description: string;
  rules: string;
}

const LeaveTypes: React.FC = () => {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    {
      id: 1,
      name: "Sick Leave",
      yearlyDays: 12,
      monthlyDays: 1,
      weeklyDays: 0,
      description: "Leave for illness or medical issues.",
      rules: "Requires a medical certificate if more than 2 days.",
    },
    {
      id: 2,
      name: "Casual Leave",
      yearlyDays: 10,
      monthlyDays: 0.83,
      weeklyDays: 0,
      description: "Leave for personal reasons.",
      rules:
        "Can be availed without prior approval but limited to 3 consecutive days.",
    },
    {
      id: 3,
      name: "Maternity Leave",
      yearlyDays: 180,
      monthlyDays: 0,
      weeklyDays: 0,
      description: "Leave for maternity purposes.",
      rules: "Available only to female employees; requires prior approval.",
    },
  ]);
  

  const [showModal, setShowModal] = useState(false);
  const [currentLeaveType, setCurrentLeaveType] = useState<LeaveType | null>(
    null
  );

//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [leaveTypeToDelete, setLeaveTypeToDelete] = useState<number | null>(null);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAddNewClick = () => {
    setCurrentLeaveType({
      id: leaveTypes.length + 1,
      name: "",
      yearlyDays: 0,
      monthlyDays: 0,
      weeklyDays: 0,
      description: "",
      rules: "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentLeaveType(null);
  };

  const handleEditClick = (leaveType: LeaveType) => {
    setCurrentLeaveType(leaveType);
    setShowModal(true);
  };

//   const handleDeleteClick = (id: number) => {
//     setLeaveTypeToDelete(id);
//     setShowDeleteConfirm(true);
//   };

//   const handleConfirmDelete = () => {
//     if (leaveTypeToDelete !== null) {
//       setLeaveTypes(leaveTypes.filter((leaveType) => leaveType.id !== leaveTypeToDelete));
//     }
//     setShowDeleteConfirm(false);
//     setLeaveTypeToDelete(null);
//   };

//   const handleCancelDelete = () => {
//     setShowDeleteConfirm(false);
//     setLeaveTypeToDelete(null);
//   };

//   const handleSave = () => {
//     if (currentLeaveType) {
//       if (currentLeaveType.id <= leaveTypes.length) {

//         setLeaveTypes(
//           leaveTypes.map((leaveType) =>
//             leaveType.id === currentLeaveType.id ? currentLeaveType : leaveType
//           )
//         );
//       } else {

//         setLeaveTypes([...leaveTypes, currentLeaveType]);
//       }
//     }
//     setShowModal(false);
//     setCurrentLeaveType(null);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     if (currentLeaveType) {
//       const { name, value } = e.target;
//       setCurrentLeaveType({ ...currentLeaveType, [name]: value });
//     }
//   };

  const handleToggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Leave Types</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddNewClick}
        >
          <FiPlus className="mr-2" />
          Add New Leave
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {leaveTypes.map((leaveType) => (
            <div
              key={leaveType.id}
              className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">{leaveType.name}</h2>
                <div className="flex space-x-3">
                  {/* <FiEdit
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEditClick(leaveType)}
                  />
                  <FiTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteClick(leaveType.id)}
                  /> */}
                  <FiInfo
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleToggleDetails(leaveType.id)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-base font-medium text-gray-800">
                  Total Leave:{" "}
                  {leaveType.yearlyDays
                    ? `${leaveType.yearlyDays} Days (Yearly)`
                    : leaveType.monthlyDays
                    ? `${leaveType.monthlyDays} Days (Monthly)`
                    : leaveType.weeklyDays
                    ? `${leaveType.weeklyDays} Days (Weekly)`
                    : "N/A"}
                </p>
                <p className="text-gray-600">{leaveType.description}</p>
              </div>
              {expandedId === leaveType.id && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 ">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Yearly Allowance
                      </h4>
                      <p className="text-gray-600 mt-1">{leaveType.yearlyDays}</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Monthly Allowance
                      </h4>
                      <p className="text-gray-600 mt-1">{leaveType.monthlyDays}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Weekly Allowance
                      </h4>
                      <p className="text-gray-600 mt-1">{leaveType.weeklyDays}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Description
                      </h4>
                      <p className="text-gray-600 mt-1">{leaveType.description}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Rules
                      </h4>
                      <p className="text-gray-600 mt-1">{leaveType.rules}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[200] flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this leave type?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )} */}
      {/* {showModal && currentLeaveType && (
        <div className="fixed inset-0 z-[200] bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {currentLeaveType.id ? "Edit Leave Type" : "Add New Leave Type"}
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Leave Type Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={currentLeaveType.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="yearlyDays" className="block text-sm font-medium mb-1">
                  Yearly Allowance
                </label>
                <input
                  id="yearlyDays"
                  name="yearlyDays"
                  type="number"
                  value={currentLeaveType.yearlyDays}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="monthlyDays" className="block text-sm font-medium mb-1">
                  Monthly Allowance
                </label>
                <input
                  id="monthlyDays"
                  name="monthlyDays"
                  type="number"
                  value={currentLeaveType.monthlyDays}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="weeklyDays" className="block text-sm font-medium mb-1">
                  Weekly Allowance
                </label>
                <input
                  id="weeklyDays"
                  name="weeklyDays"
                  type="number"
                  value={currentLeaveType.weeklyDays}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={currentLeaveType.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rules" className="block text-sm font-medium mb-1">
                  Rules
                </label>
                <textarea
                  id="rules"
                  name="rules"
                  value={currentLeaveType.rules}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default LeaveTypes;
