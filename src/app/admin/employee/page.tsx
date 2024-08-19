"use client";
import { IoMdEye } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import DisplayTable from "../../../components/admin/DisplayTable";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from "@/lib/strore/store";
import { useEffect } from "react";
import { allUser } from "@/lib/strore/features/user/userThanks";
import Loader from "@/components/Loader";
interface RequestEmployeeType {
  id: number;
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
const requests: RequestEmployeeType[] = [
  {
    id: 1,
    name: "Ali Samer",
    email: "alisamer@gmail.com",
    city: "New Delhi",
    role: "QA Engineer",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=12",
    action: [
      <Link href="/edit" key="edit1">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/42478234920jhdsfsk" key="view1">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 2,
    name: "John Doe",
    email: "johndoe@gmail.com",
    city: "San Francisco",
    role: "Developer",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=5",
    action: [
      <Link href="/edit" key="edit2">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/2342384723487dsfdf" key="view2">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "janesmith@gmail.com",
    city: "London",
    role: "Project Manager",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=32",
    action: [
      <Link href="/edit" key="edit3">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/42478234920jhkjsd" key="view3">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 4,
    name: "Carlos Ramos",
    email: "carlosramos@gmail.com",
    city: "Madrid",
    role: "UX Designer",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=9",
    action: [
      <Link href="/edit" key="edit4">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/2342893489skdfn" key="view4">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 5,
    name: "Emily Johnson",
    email: "emilyjohnson@gmail.com",
    city: "Sydney",
    role: "Developer",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=5",
    action: [
      <Link href="/edit" key="edit5">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/3490283489kdjf" key="view5">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 6,
    name: "Mohamed Ali",
    email: "mohamedali@gmail.com",
    city: "Cairo",
    role: "QA Engineer",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=9",
    action: [
      <Link href="/edit" key="edit6">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/234293849sdkf" key="view6">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 7,
    name: "Priya Singh",
    email: "priyasingh@gmail.com",
    city: "Mumbai",
    role: "Developer",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=13",
    action: [
      <Link href="/edit" key="edit7">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/23948029sdf" key="view7">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 8,
    name: "Li Wei",
    email: "liwei@gmail.com",
    city: "Beijing",
    role: "UX Designer",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=1",
    action: [
      <Link href="/edit" key="edit8">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/2349823lkj" key="view8">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 9,
    name: "Hannah Brown",
    email: "hannahbrown@gmail.com",
    city: "Toronto",
    role: "Project Manager",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=4",
    action: [
      <Link href="/edit" key="edit9">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/2342938sdfk" key="view9">
        <IoMdEye />
      </Link>,
    ],
  },
  {
    id: 10,
    name: "Sara Lee",
    email: "saralee@gmail.com",
    city: "Seoul",
    role: "QA Engineer",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=3",
    action: [
      <Link href="/edit" key="edit10">
        <AiOutlineEdit />
      </Link>,
      <Link href="/employe/2394802sdk" key="view10">
        <IoMdEye />
      </Link>,
    ],
  },
];

const columns: TableColumnType[] = [
  {
    Header: "ID",
    accessor: "id",
    className: "w-1/12 sm:w-1/12 md:w-1/12 lg:w-1/12",
  },
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
    Header: "City",
    accessor: "city",
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
        className={` font-semibold  rounded-full pt-1 pb-1 pl-3 pr-3 capitalize ${value.toLowerCase() === "active"
            ? "text-[#1a513f] bg-[#D1FAE5]"
            : "text-[#6c2121] bg-[#F1C9C9]"
          }`}
      >
        {value}
      </span>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    className: "w-1/12 sm:w-1/12 md:w-1/12 lg:w-1/12",
    Cell: ({ cell: { value } }: { cell: { value: any } }) => {
      return (
        <div className="flex">
          {value.map((icon: any, index: number) => {
            return (
              <div
                key={index}
                className="border-2 border-gray-300 rounded-[10px] p-1 mx-0.5 bg-white cursor-pointer"
              >
                {icon}
              </div>
            );
          })}
        </div>
      );
    },
  },
];
const employeePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employee, isLoading, error } = useSelector((state: RootState) => state.allEmployee);

  useEffect(() => {
    dispatch(allUser());
  }, []);
  console.log(employee,'allEployee');
  return (
    <>
      {
        isLoading ? <Loader /> : <DisplayTable
          columns={columns}
          requests={requests}
          searchableFields={["name", "email", "city", "role", "status"]}
        />

      }

    </>
  );
};

export default employeePage;
