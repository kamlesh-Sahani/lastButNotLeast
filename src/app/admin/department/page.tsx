"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiPlus, FiEdit, FiTrash, FiInfo } from "react-icons/fi";

interface Department {
  id: number;
  name: string;
  courses: string[];
  semestersCount: number;
  description: string;
  route:string;
}

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: "Computer Science",
      
      courses: ["BCA"],
      semestersCount: 6,
      description: "Department focused on Computer Science and IT education.",
      route:'/computer'
    },
    {
      id: 2,
      name: "Management",
      courses: ["BBA"],
      semestersCount: 6,
      description: "Department for Management and Business Administration.",
      route:'/manage'
    },
    {
      id: 3,
      name: "Commerce",
      courses: ["BCom"],
      semestersCount: 6,
      description: "Department covering Commerce and Finance studies.",
      route:"/comm"
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null
  );

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(
    null
  );

  const [expandedId, setExpandedId] = useState<number | null>(null);

  const router = useRouter();

  const handleAddNewClick = () => {
    setCurrentDepartment({
      id: departments.length + 1,
      name: "",
      courses: [],
      semestersCount: 0,
      description: "",
      route:""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDepartment(null);
  };

  const handleEditClick = (department: Department) => {
    setCurrentDepartment(department);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setDepartmentToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (departmentToDelete !== null) {
      setDepartments(departments.filter((department) => department.id !== departmentToDelete));
    }
    setShowDeleteConfirm(false);
    setDepartmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setDepartmentToDelete(null);
  };

  const handleSave = () => {
    if (currentDepartment) {
      if (currentDepartment.id <= departments.length) {
        // Update existing department
        setDepartments(
          departments.map((department) =>
            department.id === currentDepartment.id ? currentDepartment : department
          )
        );
      } else {
        // Add new department
        setDepartments([...departments, currentDepartment]);
      }
    }
    setShowModal(false);
    setCurrentDepartment(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (currentDepartment) {
      const { name, value } = e.target;
      setCurrentDepartment({ ...currentDepartment, [name]: value });
    }
  };

  const handleToggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddNewClick}
        >
          <FiPlus className="mr-2" />
          Add New Department
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {departments.map((department) => (
          <div
            key={department.id}
            className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">{department.name}</h2>
              <div className="flex space-x-3">
                <button
                  className="text-blue-500"
                  onClick={() => router.push(`/admin/department${department.route}`)}
                >
                  <FiInfo />
                </button>
                <FiEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEditClick(department)}
                />
                <FiTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteClick(department.id)}
                />
              </div>
            </div>
            <div className="mb-4">
              <p className="text-base font-medium text-gray-800">
                Number of Semesters: {department.semestersCount}
              </p>
              <p className="text-gray-600">{department.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[200] flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this department?</p>
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
      )}

      {showModal && currentDepartment && (
        <div className="fixed inset-0 z-[200] bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              {currentDepartment.id ? "Edit Department" : "Add New Department"}
            </h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Department Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={currentDepartment.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="semestersCount" className="block text-sm font-medium mb-1">
                  Number of Semesters
                </label>
                <input
                  id="semestersCount"
                  name="semestersCount"
                  type="number"
                  value={currentDepartment.semestersCount}
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
                  value={currentDepartment.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
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
      )}
    </div>
  );
};

export default Departments;
