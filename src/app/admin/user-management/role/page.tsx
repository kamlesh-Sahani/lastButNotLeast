"use client";
import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

const rolesData: Role[] = [
  { id: 1, name: "Admin", permissions: ["Create", "Read", "Update", "Delete"] },
  { id: 2, name: "Manager", permissions: ["Read", "Update"] },
  // Add more roles as needed
];

const PermissionsPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [roleName, setRoleName] = useState<string>("");
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleCreateRole = () => {
    setRoleName("");
    setRolePermissions([]);
    setIsEditing(false);
    setSelectedRoleId(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setRoleName(role.name);
    setRolePermissions(role.permissions);
    setIsEditing(true);
    setSelectedRoleId(role.id);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete) {
      setRoles((prevRoles) =>
        prevRoles.filter((r) => r.id !== roleToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setRoleToDelete(null);
    }
  };

  const handleSaveRole = () => {
    if (isEditing && selectedRoleId !== null) {
      setRoles((prevRoles) =>
        prevRoles.map((r) =>
          r.id === selectedRoleId
            ? { ...r, name: roleName, permissions: rolePermissions }
            : r
        )
      );
    } else {
      const newRole: Role = {
        id: roles.length + 1,
        name: roleName,
        permissions: rolePermissions,
      };
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
  };

  const handlePermissionChange = (permission: string) => {
    setRolePermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  return (
    <div className="max-w-7xl mx-auto w-full py-5 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Roles</h2>
        <button
          onClick={handleCreateRole}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <FaPlus size={20} className="mr-2" />
          Create Role
        </button>
      </div>
      <ul className="space-y-4">
        {roles.map((role) => (
          <li key={role.id} className="bg-white rounded shadow-md p-4 flex justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center">
              <span className="text-lg font-medium">{role.name}</span>
              <span className="md:ml-4 text-gray-600 flex flex-wrap">
                {role.permissions.join(", ")}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleEditRole(role)}
                className="text-gray-500 hover:text-gray-800"
              >
                <FaEdit size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRole(role);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Creating/Editing Role */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Role" : "Create Role"}
      >
        <div className="p-5">
          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Permissions
            </label>
            <div className="mt-2 space-y-2">
              {["Create", "Read", "Update", "Delete"].map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={rolePermissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={permission}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={handleSaveRole}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal for Confirming Delete */}
      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="p-5">
          <p>Are you sure you want to delete the role "{roleToDelete?.name}"?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteRole}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PermissionsPage;
