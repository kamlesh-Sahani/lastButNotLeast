
"use client";
import { useState } from "react";
import EmployeeCard from "./component/EmployeeCard";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

const employeeData = [
  {
    name: "Mark Wood",
    role: "Business Analyst",
    status: "ACTIVE",
    department: "Commerce & Business",
    dateOfJoining: "11 Jan, 2021",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Amandeep Singh",
    role: "H.O.D of CS",
    status: "INACTIVE",
    department: "Computer Science",
    dateOfJoining: "18 Feb, 2021",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Charanpreet Kaur",
    role: "Associate Professor",
    status: "ACTIVE",
    department: "Computer Science",
    dateOfJoining: "13 Feb, 2020",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
  },
  {
    name: "Mark Wood",
    role: "Business Analyst",
    status: "ACTIVE",
    department: "Management Studies",
    dateOfJoining: "24 Aug, 2021",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Amandeep Singh",
    role: "H.O.D of CS",
    status: "INACTIVE",
    department: "Computer Science",
    dateOfJoining: "22 Sep, 2022",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [selectedSort, setSelectedSort] = useState("dateOfJoining");
  
    // Handle change in search input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    // Handle department filter change
    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDepartment(event.target.value);
    };
  
    // Handle sorting option change
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSort(event.target.value);
    };

  
    // Filter employees based on search term and department
    const filteredEmployees = employeeData
      .filter(employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(employee => 
        selectedDepartment === "All" || employee.department === selectedDepartment
      );
  
    // Sort employees based on selected sort option
    const sortedEmployees = filteredEmployees.sort((a, b) => {
      if (selectedSort === "dateOfJoining") {
        return new Date(a.dateOfJoining).getTime() - new Date(b.dateOfJoining).getTime();
      } else if (selectedSort === "department") {
        return a.department.localeCompare(b.department);
      }
      return 0;
    });
  

  return (
    <>
      <div className="flex justify-between pt-6 py-4 px-8 bg-slate-50">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href={'employee/new'}>
        <button className="bg-purple-300 hover:bg-purple-400 rounded-3xl px-4 py-3">
          + Add Employee
        </button>
        </Link>
      </div>
      <div className="flex px-10 pb-2 mt-6 -ml-2   justify-between">
        
        <div className="flex gap-2">
        <div className="relative">
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Departments</option>
              <option value="Commerce & Business">Commerce & Business</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Management Studies">Management Studies</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={selectedSort}
              onChange={handleSortChange}
              className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="dateOfJoining">Sort by Joining Date</option>
              <option value="department">Sort by Department</option>
            </select>
          </div>
        </div>
        <div className="w-[300px] flex">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-[300px] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className=" bg-red-100 w-10 h-10 p-2 -ml-[42px] mt-[1px] rounded-r-lg cursor-pointer ">
          <LuSearch className="w-5 h-5 z-10"/>
          </div>
        </div>
      </div>
      <div className="flex p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {sortedEmployees.map((employee, index) => (
            <EmployeeCard
              key={index}
              name={employee.name}
              role={employee.role}
              status={employee.status}
              department={employee.department}
              dateOfJoining={employee.dateOfJoining}
              email={employee.email}
              phone={employee.phone}
              imageUrl={employee.imageUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

