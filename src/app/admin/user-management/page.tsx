// pages/employees.tsx
"use client";
// pages/employees.tsx
import { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  permissions: string[];
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      // Replace with your actual data fetching logic
      const data: Employee[] = [
        {
          id: 1,
          name: "John Doe",
          role: "Developer",
          email: "john@example.com",
          permissions: ["read", "write"],
        },
        {
          id: 2,
          name: "Jane Smith",
          role: "Designer",
          email: "jane@example.com",
          permissions: ["read"],
        },
        {
          id: 3,
          name: "Mike Johnson",
          role: "Manager",
          email: "mike@example.com",
          permissions: ["read", "write", "execute"],
        },
      ];
      setEmployees(data);
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Employee Data</h1>
      <div className="flex flex-wrap">
        {employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;

// components/EmployeeCard.tsx
import React from "react";

interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  permissions: string[];
}

// EmployeeCard component update to link dynamically
import Link from "next/link";

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  return (
    <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 m-4">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
            {employee.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {employee.name}
            </h2>
            <p className="text-gray-600">{employee.role}</p>
          </div>
        </div>
        <p className="text-gray-600 mb-4">
          <strong>Email:</strong> {employee.email}
        </p>
        <div>
          <p className="text-gray-600 mb-2">
            <strong>Permissions:</strong>
          </p>
          <ul className="list-none pl-0">
            {employee.permissions.map((permission, index) => (
              <li
                key={index}
                className="bg-gray-100 text-gray-700 rounded px-2 py-1 inline-block mr-2 mb-2"
              >
                {permission}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <Link
            href={`/admin/user-management/${employee.id}`}
            className="block w-full text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
