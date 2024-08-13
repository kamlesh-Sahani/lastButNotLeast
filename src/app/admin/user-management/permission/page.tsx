"use client";
import React, { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import "flowbite";

interface Permission {
  id: number;
  name: string;
}

const initialPermissions: Permission[] = [
  { id: 1, name: "Create" },
  { id: 2, name: "Read" },
  { id: 3, name: "Update" },
  { id: 4, name: "Delete" },
  // Add more permissions as needed
];

const PermissionsManagementPage: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
  const [permissionName, setPermissionName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [permissionToDelete, setPermissionToDelete] = useState<Permission | null>(null);

  const handleAddPermission = () => {
    if (permissionName.trim()) {
      const newPermission: Permission = {
        id: permissions.length + 1,
        name: permissionName.trim(),
      };
      setPermissions([...permissions, newPermission]);
      setPermissionName("");
      setIsModalOpen(false);
    }
  };

  const handleDeletePermission = (permission: Permission) => {
    setPermissionToDelete(permission);
    const deleteModal = document.getElementById("deletePermissionModal");
    if (deleteModal) deleteModal.classList.remove("hidden");
  };

  const confirmDeletePermission = () => {
    if (permissionToDelete) {
      setPermissions((prevPermissions) =>
        prevPermissions.filter((p) => p.id !== permissionToDelete.id)
      );
      setPermissionToDelete(null);
      closeDeleteModal();
    }
  };

  const closeDeleteModal = () => {
    const deleteModal = document.getElementById("deletePermissionModal");
    if (deleteModal) deleteModal.classList.add("hidden");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Manage Permissions</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <FaPlus size={20} className="mr-2" />
            Add Permission
          </button>
        </div>
        <ul className="space-y-4">
          {permissions.map((permission) => (
            <li
              key={permission.id}
              className="p-4 bg-white rounded shadow-md flex items-center justify-between"
            >
              <span>{permission.name}</span>
              <button
                onClick={() => handleDeletePermission(permission)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Adding Permission */}
      <div
        id="addPermissionModal"
        aria-hidden="true"
        className={`${
          isModalOpen ? "" : "hidden"
        } fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50`}
      >
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Add Permission</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permission Name</label>
              <input
                type="text"
                value={permissionName}
                onChange={(e) => setPermissionName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPermission}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Confirming Delete */}
      <div
        id="deletePermissionModal"
        aria-hidden="true"
        className="hidden fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div className="relative w-full max-w-md h-full md:h-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p>
              Are you sure you want to delete the permission "
              {permissionToDelete?.name}"?
            </p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeletePermission}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsManagementPage;
