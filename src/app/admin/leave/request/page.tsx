"use client";
import { useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
interface LeaveRequest {
  id: number;
  name: string;
  profileImage: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  reason: string;
  email: string;
  phone: string;
}

const LeaveRequests: React.FC = () => {
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Accepted' | 'Declined'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      name: 'John Doe',
      profileImage: 'https://avatar.iran.liara.run/public/boy',
      startDate: '2024-08-15',
      endDate: '2024-08-18',
      status: 'Pending',
      reason: 'Family emergency',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane Smith',
      profileImage: 'https://avatar.iran.liara.run/public/boy',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      status: 'Accepted',
      reason: 'Medical leave',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
    },
    {
      id: 3,
      name: 'Emily Johnson',
      profileImage: 'https://avatar.iran.liara.run/public/boy',
      startDate: '2024-08-25',
      endDate: '2024-08-28',
      status: 'Declined',
      reason: 'Personal reason',
      email: 'emily.johnson@example.com',
      phone: '456-789-0123',
    },
    {
      id: 4,
      name: 'Michael Brown',
      profileImage: 'https://avatar.iran.liara.run/public/boy',
      startDate: '2024-09-01',
      endDate: '2024-09-03',
      status: 'Pending',
      reason: 'Conference attendance',
      email: 'michael.brown@example.com',
      phone: '321-654-0987',
    },
    {
      id: 5,
      name: 'Linda White',
      profileImage: 'https://avatar.iran.liara.run/public/boy',
      startDate: '2024-09-10',
      endDate: '2024-09-15',
      status: 'Accepted',
      reason: 'Vacation',
      email: 'linda.white@example.com',
      phone: '654-321-7890',
    },
  ];


  // Filter, search, and sort logic
  const filteredRequests = leaveRequests
    .filter((request) =>
      filterStatus === 'All' || request.status === filterStatus
    )
    .filter((request) =>
      request.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        : new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );

  const handleViewDetail = (id: number) => {
    setExpandedRequestId(expandedRequestId === id ? null : id);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Leave Requests</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <AiOutlineSearch className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value as "All" | "Pending" | "Accepted" | "Declined"
              )
            }
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Declined">Declined</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredRequests.map((request) => (
          <div key={request.id} className="border-b mb-6 last:mb-0">
            <div className="flex justify-between p-4 items-center">
              <div className="flex items-center">
                <img
                  src={request.profileImage}
                  alt={`${request.name}'s profile`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium text-lg">{request.name}</p>
                  <p className="text-gray-500">
                    {request.startDate} - {request.endDate}
                  </p>
                  <p className={`text-sm font-semibold ${request.status === 'Pending' ? 'text-yellow-500' : request.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}>
                    {request.status}
                  </p>
                </div>
              </div>
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleViewDetail(request.id)}
              >
                {expandedRequestId === request.id ? (
                  <MdOutlineArrowDropDown className="w-5 h-5" />
                ) : (
                  <IoMdArrowDropdown className="w-5 h-5" />
                )}
              </button>
            </div>
            {expandedRequestId === request.id && (
              <div className="flex flex-col p-4 pl-20 space-y-2 bg-gray-100">
                <p><strong>Reason:</strong> {request.reason}</p>
                <p><strong>Email:</strong> {request.email}</p>
                <p><strong>Phone:</strong> {request.phone}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequests;
