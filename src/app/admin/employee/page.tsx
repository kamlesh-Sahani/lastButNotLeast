"use client";
import { useState, useMemo, useCallback } from "react";
import { LuSearch } from "react-icons/lu";
import Link from "next/link";

// Sample employee data
const employeeData = [
  {
    name: "Mark Wood",
    role: "Business Analyst",
    status: "ACTIVE",
    department: "Commerce & Business",
    dateOfJoining: "11 Jan, 2021",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Amandeep Singh",
    role: "H.O.D of CS",
    status: "INACTIVE",
    department: "Computer Science",
    dateOfJoining: "18 Feb, 2021",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Amandeep Singh",
    role: "H.O.D of CS",
    status: "ACTIVE",
    department: "Computer Science",
    dateOfJoining: "18 Feb, 2021",
    email: "markwood@gmail.com",
    phone: "(229) 555-0109",
    imageUrl: "https://i.pravatar.cc/150?img=7",
  },
  // ... other employee records
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSort, setSelectedSort] = useState("dateOfJoining");

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleDepartmentChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDepartment(event.target.value);
    },
    []
  );

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSort(event.target.value);
    },
    []
  );

  const filteredEmployees = useMemo(() => {
    return employeeData
      .filter((employee) => {
        const lowercasedTerm = searchTerm.toLowerCase();
        return (
          employee.name.toLowerCase().includes(lowercasedTerm) ||
          employee.role.toLowerCase().includes(lowercasedTerm) ||
          employee.department.toLowerCase().includes(lowercasedTerm)
        );
      })
      .filter((employee) =>
        selectedDepartment === "All"
          ? true
          : employee.department === selectedDepartment
      );
  }, [searchTerm, selectedDepartment]);

  const sortedEmployees = useMemo(() => {
    return filteredEmployees.sort((a, b) => {
      if (selectedSort === "dateOfJoining") {
        return (
          new Date(a.dateOfJoining).getTime() -
          new Date(b.dateOfJoining).getTime()
        );
      } else if (selectedSort === "department") {
        return a.department.localeCompare(b.department);
      }
      return 0;
    });
  }, [filteredEmployees, selectedSort]);

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
      <div className="flex flex-wrap gap-4 py-3 px-5 items-center justify-center">
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

// Employee components 


import { FC } from "react";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { CiMobile1 } from "react-icons/ci";

interface EmployeeCardProps {
  name: string;
  role: string;
  status: string;
  department: string;
  dateOfJoining: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const EmployeeCard: FC<EmployeeCardProps> = ({
  name,
  role,
  status,
  department,
  dateOfJoining,
  email,
  phone,
  imageUrl,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState<Boolean>(false);

  const toggleOptions = () => {
    setIsOptionsVisible(prev => !prev);
  };
  
  return (
   <>
         <div className="lg:w-[250px] lg:h-[327px] max-sm:h-[350px] max-sm:w-[370px] rounded-3xl overflow-hidden shadow-md bg-white px-3 py-3 border border-gray-200 relative">
         <PiDotsThreeOutlineVertical className="flex float-end cursor-pointer" onClick={toggleOptions}/>
         {isOptionsVisible && (
          <div className="absolute top-8 right-2 bg-white border border-gray-200 shadow-lg rounded-lg w-32">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => alert('Edit clicked')}>Edit</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => alert('Remove clicked')}>Remove</button>
          </div>
        )}
      <div className="flex items-center justify-center">
      <img alt="name" src={imageUrl} className="w-16 h-16 rounded-full object-cover " />
      </div>
      <div className=" text-center">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>
        <span className={`inline-block lg:mt-1 mt-2 px-4 py-1 text-sm font-semibold rounded-full ${status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {status}
        </span>
      </div>
      <div className="lg:mt-2 mt-5 bg-gray-50 rounded-2xl px-3 py-2">
        <div className="flex items-center text-sm ">
          <IoMailOutline className="mr-2"/>
          <p>{email}</p>
        </div>
        <div className="flex items-center mt-1 text-sm gap-1 text-gray-500">
          <CiMobile1 className="-ml-1 h-4 w-6"/>
          <p>{phone}</p>
        </div>
      </div>
      <div className="mt-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-2xl">
        <p className="text-xs font-medium">Department</p>
        <p className="text-sm font-bold">{department}</p>
        <p className="text-xs font-medium mt-1">Date of Joining</p>
        <p className="text-sm font-bold">{dateOfJoining}</p>
      </div>
    </div>
   </>
  );
};
