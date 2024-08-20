"use client";
import { IoMdEye } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import DisplayTable from "../../../components/admin/DisplayTable";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/lib/strore/store";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import axios from "axios";

interface RequestEmployeeType {
  id: string; 
  name: string;
  email: string;
  city: string;
  role: string;
  status: string;
  image: string;
  action: JSX.Element[];
}

interface TableColumnType {
  Header: string;
  accessor: string;
  className: string;
  Cell?: (props: { cell: { value: any } }) => JSX.Element;
}

const columns: TableColumnType[] = [
  // {
  //   Header: "ID",
  //   accessor: "id",
  //   className: "w-1/12 sm:w-1/12 md:w-1/12 lg:w-1/12",
  // },
  {
    Header: "Image",
    accessor: "image",
    className: "w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12",
    Cell: ({ cell: { value } }: { cell: { value: any } }) => (
      <img
        src={value}
        alt="Employee"
        className="w-12 h-12 object-cover rounded-full"
      />
    ),
  },
  {
    Header: "Name",
    accessor: "name",
    className: "w-2/12 sm:w-3/12 md:w-3/12 lg:w-3/12",
  },
  {
    Header: "Email",
    accessor: "email",
    className: "w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12",
  },
  {
    Header: "Date of Birth",
    accessor: "dob",
    className: "w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12",
  },
  {
    Header: "Role",
    accessor: "role",
    className: "w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12",
  },
  {
    Header: "Status",
    accessor: "status",
    className: "w-2/12 sm:w-2/12 md:w-2/12 lg:w-2/12",
    Cell: ({ cell: { value } }: { cell: { value: any } }) => (
      <span
        className={`font-semibold rounded-full pt-1 pb-1 pl-3 pr-3 capitalize ${value === true
            ? "text-[#1a513f] bg-[#D1FAE5]"
            : "text-[#6c2121] bg-[#F1C9C9]"
          }`}
      >
        {value === true ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    className: "w-1/12 sm:w-1/12 md:w-1/12 lg:w-1/12",
    Cell: ({ cell: { value } }: { cell: { value: any } }) => (
      <div className="flex">
        {value.map((icon: any, index: number) => (
          <div
            key={index}
            className="border-2 border-gray-300 rounded-[10px] p-1 mx-0.5 bg-white cursor-pointer"
          >
            {icon}
          </div>
        ))}
      </div>
    ),
  },
];

const EmployeePage = () => {
  const [data, setData] = useState<RequestEmployeeType[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { employee, isLoading, error } = useSelector((state: RootState) => state.allEmployee);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employee/all'); 
        const employees = response.data.employees.map((emp: any) => ({
          name: emp.personalInfo.fullName,
          email: emp.personalInfo.email || "", 
          dob: emp.personalInfo.dob || "", 
          role: emp.role || "", 
          status: emp.isActive || "", 
          image: "https://i.pravatar.cc/150?img=5",
          action: [
            <Link href={`/edit/${emp._id}`} key={`edit-${emp._id}`}>
              <AiOutlineEdit />
            </Link>,
            <Link href={`/employee/${emp._id}`} key={`view-${emp._id}`}>
              <IoMdEye />
            </Link>,
          ],
        }));
        setData(employees);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };

    fetchEmployees();
  }, [dispatch]);
  

  return (
    <>
      {isLoading ? <Loader /> : (
        <DisplayTable
          columns={columns}
          requests={data}
          searchableFields={["name", "email", "dob", "role", "status"]}
        />
      )}
    </>
  );
};

export default EmployeePage;
