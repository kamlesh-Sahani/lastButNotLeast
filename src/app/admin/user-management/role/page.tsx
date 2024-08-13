"use client"
import { useState } from 'react';

const rolesData = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Editor' },
  { id: 3, name: 'Viewer' },
];

export default function Roles() {
  const [roles, setRoles] = useState(rolesData);
  const [newRole, setNewRole] = useState('');

  const handleAddRole = () => {
    setRoles([...roles, { id: roles.length + 1, name: newRole }]);
    setNewRole('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Manage Roles</h1>
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="New Role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <button
          onClick={handleAddRole}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Role
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Role Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="py-2 px-4 border-b">{role.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
