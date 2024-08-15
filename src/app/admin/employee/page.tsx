"use client";
import { useState } from "react";
import EmployeeCard from "../../../components/admin/EmployeeCard";
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
      imageUrl: "https://avatar.iran.liara.run/public/boy",
    },
    {
      name: "Amandeep Singh",
      role: "H.O.D of CS",
      status: "INACTIVE",
      department: "Computer Science",
      dateOfJoining: "18 Feb, 2021",
      email: "markwood@gmail.com",
      phone: "(229) 555-0109",
      imageUrl: "https://avatar.iran.liara.run/public/boy",
    },
    {
      name: "Charanpreet Kaur",
      role: "Associate Professor",
      status: "ACTIVE",
      department: "Computer Science",
      dateOfJoining: "13 Feb, 2020",
      email: "markwood@gmail.com",
      phone: "(229) 555-0109",
      imageUrl: "https://avatar.iran.liara.run/public",
    },
    {
      name: "Mark Wood",
      role: "Business Analyst",
      status: "ACTIVE",
      department: "Management Studies",
      dateOfJoining: "24 Aug, 2021",
      email: "markwood@gmail.com",
      phone: "(229) 555-0109",
      imageUrl: "https://avatar.iran.liara.run/public/girl",
    },
    {
      name: "Amandeep Singh",
      role: "H.O.D of CS",
      status: "INACTIVE",
      department: "Computer Science",
      dateOfJoining: "22 Sep, 2022",
      email: "markwood@gmail.com",
      phone: "(229) 555-0109",
      imageUrl: "https://avatar.iran.liara.run/public/boy",
    },
  ];
  

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSort, setSelectedSort] = useState("dateOfJoining");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  const filteredEmployees = employeeData
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(employee => 
      selectedDepartment === "All" || employee.department === selectedDepartment
    );

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
      <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-slate-50">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href={"employee/new"}>
          <button className="bg-purple-300 hover:bg-purple-400 rounded-full px-4 py-2">
            <span className="block lg:hidden text-xl font-bold">+</span>
            <span className="hidden lg:block">+ Add Employee</span>
          </button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:px-8 px-4 py-4 lg:justify-between">
        <div className="flex flex-col lg:flex-row gap-4">
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
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="dateOfJoining">Sort by Joining Date</option>
            <option value="department">Sort by Department</option>
          </select>
        </div>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute right-0 pr-2">
            <LuSearch className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 max-lg:px-10 md:px-4 py-3 px-5 items-center justify-center">
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
    </>
  );
}
