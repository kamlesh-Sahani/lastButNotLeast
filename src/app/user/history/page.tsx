"use client";
import { useState } from "react";

interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  days: number;
  reason: string;
}

const LeaveHistory = () => {
  const [leaveData] = useState<Leave[]>([
    {
      id: 1,
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      type: "Sick Leave",
      status: "Approved",
      days: 2,
      reason: "Flu and fever",
    },
    {
      id: 2,
      startDate: "2024-03-14",
      endDate: "2024-03-14",
      type: "Casual Leave",
      status: "Rejected",
      days: 1,
      reason: "Personal work",
    },
    {
      id: 3,
      startDate: "2024-05-22",
      endDate: "2024-05-26",
      type: "Annual Leave",
      status: "Approved",
      days: 5,
      reason: "Family vacation",
    },
    {
      id: 3,
      startDate: "2024-05-22",
      endDate: "2024-05-26",
      type: "Annual Leave",
      status: "Approved",
      days: 5,
      reason: "Family vacation",
    },
    {
      id: 3,
      startDate: "2024-05-22",
      endDate: "2024-05-26",
      type: "Annual Leave",
      status: "Approved",
      days: 5,
      reason: "Family vacation",
    },
    // Add more data as needed
  ]);

  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Leave[]>(leaveData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilter(value);

    let data = leaveData;

    if (value) {
      data = data.filter(
        (leave) => leave.type === value || leave.status === value
      );
    }

    setFilteredData(data);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as "asc" | "desc";
    setSortOrder(order);

    const sortedData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);

      if (order === "asc") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });

    setFilteredData(sortedData);
  };

  return (
    <div className="bg-gray-100 h-screen w-full">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-blue-500">Leave History</h1>

        <div className="mb-6 flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <label className="font-semibold text-gray-600">Filter by:</label>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex space-x-4 items-center">
            <label className="font-semibold text-gray-600">Sort by Date:</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((leave) => (
            <div
              key={leave.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  {leave.startDate} - {leave.endDate}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {leave.status}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {leave.type}
              </h2>
              <p className="text-gray-600 mb-2">Days: {leave.days}</p>
              <p className="text-gray-600 italic">Reason: {leave.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
