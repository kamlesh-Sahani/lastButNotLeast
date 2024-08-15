"use client";
import React, { useState } from 'react';

interface LeaveApplication {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  hodStatus: 'Pending' | 'Accepted' | 'Declined';
  directorStatus: 'Pending' | 'Accepted' | 'Declined';
  vicePrincipalStatus: 'Pending' | 'Accepted' | 'Declined';
}

const LeaveApplicationTracking: React.FC = () => {
  const [selectedApplication, setSelectedApplication] = useState<LeaveApplication | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const leaveApplications: LeaveApplication[] = [
    {
      id: '1',
      leaveType: 'Medical Leave',
      startDate: '2024-08-01',
      endDate: '2024-08-05',
      status: 'Pending',
      hodStatus: 'Accepted',
      directorStatus: 'Pending',
      vicePrincipalStatus: 'Pending',
    },
    {
      id: '2',
      leaveType: 'Casual Leave',
      startDate: '2024-08-10',
      endDate: '2024-08-12',
      status: 'Accepted',
      hodStatus: 'Accepted',
      directorStatus: 'Accepted',
      vicePrincipalStatus: 'Accepted',
    },
    {
      id: '3',
      leaveType: 'Earned Leave',
      startDate: '2024-08-20',
      endDate: '2024-08-22',
      status: 'Declined',
      hodStatus: 'Accepted',
      directorStatus: 'Declined',
      vicePrincipalStatus: 'Pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Accepted':
        return 'bg-green-500';
      case 'Declined':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleApplicationClick = (application: LeaveApplication) => {
    if (selectedApplication?.id === application.id) {
      setShowDetail(!showDetail);
    } else {
      setSelectedApplication(application);
      setShowDetail(true);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Leave Application Tracking</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {leaveApplications.map((application) => (
          <div
            key={application.id}
            className="p-4 rounded-lg shadow-md bg-white cursor-pointer"
            onClick={() => handleApplicationClick(application)}
          >
            <h2 className="text-lg font-semibold">{application.leaveType}</h2>
            <p>{application.startDate} - {application.endDate}</p>
            <div className="mt-4 flex sm:justify-between max-sm:flex-col max-sm:gap-6  sm:items-center">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(application.hodStatus)} flex items-center justify-center text-white`}>
                  1
                </div>
                <div className="h-1 w-16 bg-gray-300 mx-2"></div>
                <div className={`w-8 h-8 rounded-full ${getStatusColor(application.directorStatus)} flex items-center justify-center text-white`}>
                  2
                </div>
                <div className="h-1 w-16 bg-gray-300 mx-2"></div>
                <div className={`w-8 h-8 rounded-full ${getStatusColor(application.vicePrincipalStatus)} flex items-center justify-center text-white`}>
                  3
                </div>
              </div>
              <div>
                <span className={`p-2 rounded-full ${getStatusColor(application.status)} text-white`}>
                  {application.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedApplication && showDetail && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Leave Details</h2>
          <p><strong>Leave Type:</strong> {selectedApplication.leaveType}</p>
          <p><strong>Start Date:</strong> {selectedApplication.startDate}</p>
          <p><strong>End Date:</strong> {selectedApplication.endDate}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Approval Status</h3>
            <div className="flex justify-between items-center mt-2">
              <div className="text-center">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(selectedApplication.hodStatus)} mx-auto`}></div>
                <p>HOD</p>
              </div>
              <div className="h-1 w-16 bg-gray-300"></div>
              <div className="text-center">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(selectedApplication.directorStatus)} mx-auto`}></div>
                <p>Director</p>
              </div>
              <div className="h-1 w-16 bg-gray-300"></div>
              <div className="text-center">
                <div className={`w-8 h-8 rounded-full ${getStatusColor(selectedApplication.vicePrincipalStatus)} mx-auto`}></div>
                <p>Vice Principal</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplicationTracking;
