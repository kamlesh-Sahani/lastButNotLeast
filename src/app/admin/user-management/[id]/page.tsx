"use client"
import { useEffect, useState } from 'react'

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  permissions: string[];
}

const RoleNPermission = ({params}:{params:{id:number}}) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const {id} = params

  useEffect(() => {
    if (!id) return;

    // Fetch employee data by ID (mock data here, replace with actual API call)
    const fetchEmployee = async () => {
      const data: Employee = {
        id: id,
        name: 'John Doe',
        role: 'Developer',
        email: 'john@example.com',
        permissions: ['read', 'write', 'execute'],
      };
      setEmployee(data);
    };

    fetchEmployee();
  }, [id]);

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Saved:', employee);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (employee) {
      setEmployee({
        ...employee,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePermissionChange = (permission: string) => {
    if (employee) {
      setEmployee({
        ...employee,
        permissions: employee.permissions.includes(permission)
          ? employee.permissions.filter((p) => p !== permission)
          : [...employee.permissions, permission],
      });
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Employee Details</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <p>{employee.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <p>{employee.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Role</label>
          {isEditing ? (
            <select
              name="role"
              value={employee.role}
              onChange={handleChange}
              className="block w-full mt-1 bg-gray-100 rounded-lg p-2 border border-gray-300"
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
              {/* Add more roles as needed */}
            </select>
          ) : (
            <p>{employee.role}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Permissions</label>
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
              {['read', 'write', 'execute'].map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={employee.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          ) : (
            <ul className="list-disc pl-5 text-gray-700">
              {employee.permissions.map((permission, index) => (
                <li key={index}>{permission}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-between mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit
            </button>
          )}
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};



export default RoleNPermission