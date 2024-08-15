"use client";
import { useState } from "react";

interface Leave {
  id: number;
  startDate: string;
  endDate: string;
  type: string;
  status: "Approved"|"Pending"|"Rejected";
  days: number;
  reason: string;
  approvalReason?: {
    title?: string,
    reason?:string,
  }[]|undefined;
  rejectionReason?: {
    title?: string,
    reason?:string,
  }[]
  approvedBy?: string[];
  rejectedBy?: string[];
  documents?: string[];
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
      approvedBy: ["HOD","VP","Director"],
      documents: ["medical_certificate.pdf"],
    },
    {
      id: 2,
      startDate: "2024-03-14",
      endDate: "2024-03-14",
      type: "Casual Leave",
      status: "Rejected",
      days: 1,
      reason: "Personal work",
      approvedBy:['HOD'],
      rejectionReason:[{
        title:"VP",
       reason: "Too many leaves in a short period",
      }],
      rejectedBy: ["VP"],
    },
    {
      id: 3,
      startDate: "2024-05-22",
      endDate: "2024-05-26",
      type: "Annual Leave",
      status: "Pending",
      days: 5,
      reason: "Family vacation ",
      approvedBy: ["HOD"],
    },
    // Add more data as needed
  ]);

  const [filter, setFilter] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Leave[]>(leaveData);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);

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

  const truncateReason = (reason: string) => {
    const words = reason.split(" ");
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return reason;
  };

  const handleLeaveClick = (leave: Leave) => {
    setSelectedLeave(leave);
  };

  const closeModal = () => {
    setSelectedLeave(null);
  };

  return (
    <div className="h-full w-full bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 my-4">
        <h1 className="text-4xl font-bold mb-8 text-blue-500 max-sm:text-center">Leave History</h1>

        <div className="mb-6 flex md:justify-between items-center max-sm:flex-col gap-2">
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
              <option value="Pending">Pending</option>
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
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleLeaveClick(leave)}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  {leave.startDate} - {leave.endDate}
                </span>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-600"
                      :leave.status==='Rejected'? "bg-red-100 text-red-600":'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {leave.status}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {leave.type}
              </h2>
              <p className="text-gray-600 mb-2">Days: {leave.days}</p>
              <p className="text-gray-600 italic">
                Reason: {truncateReason(leave.reason)}
              </p>
            </div>
          ))}
        </div>

        {selectedLeave && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Leave Details</h2>
              <p>
                <strong>Type:</strong> {selectedLeave.type}
              </p>
              <p>
                <strong>Status:</strong> {selectedLeave.status}
              </p>
              <p>
                <strong>Start Date:</strong> {selectedLeave.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {selectedLeave.endDate}
              </p>
              <p>
                <strong>Duration:</strong> {selectedLeave.days} days
              </p>
              <p>
                <strong>Reason:</strong> {selectedLeave.reason}
              </p>
              {(selectedLeave.status) && (
                <>
                  <p>
                    <strong>Approved By:</strong> {selectedLeave.approvedBy?.map((i)=>(


                        <p className="font-medium flex gap-2"><span>{i}</span> </p>
                      
                    ))}
                  </p>
                  {/* yeh jab show hu jab reason mention hu dummy data per  
                  <p>
                    
                    <strong>Approval Reason:</strong>{" "}
                    {selectedLeave.approvalReason?.length===0&&(
                      selectedLeave.approvalReason?.map((items)=>(
                        <div>
                          <h3>{items.title}</h3>
                          <p>{items.reason}</p>
                        </div>
                      ))
                    )}
                  </p> */}
                </>
              )}
              {selectedLeave.status === "Rejected" && (
                <>
                  <p>
                    <strong>Rejected By:</strong> {selectedLeave.rejectedBy}
                  </p>
                  <p>
                    <strong>Rejection Reason:</strong>{" "}
                    {selectedLeave.rejectionReason&&(
                      selectedLeave.rejectionReason.map((items)=>(
                        <div className="flex gap-2">
                          <h3 className="font-semibold">{items.title}:</h3>
                          <p>{items.reason}</p>
                        </div>
                      ))
                    )}
                  </p>
                </>
              )}
              {selectedLeave.documents && (
                <div className="mt-4">
                  <strong>Documents:</strong>
                  <ul className="list-disc ml-5 mt-2">
                    {selectedLeave.documents.map((doc, index) => (
                      <li key={index}>
                        <a
                          href={`/path/to/documents/${doc}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {doc}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;
