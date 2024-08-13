"use client";
import React from "react";
import {
  FaUserShield,
  FaBuilding,
  FaChalkboardTeacher,
  FaUserTie,
  FaRegCalendarCheck,
  FaHistory,
  FaDownload,
} from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";



const leaveTrendData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Leaves Over Time",
      data: [30, 40, 20, 50, 30, 60, 70, 20, 90, 100, 110, 80],
      fill: false,
      backgroundColor: "#4caf50",
      borderColor: "#4caf50",
      tension: 0.1,
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const LMSAdminDashboard = () => {
  // Data for the pie chart (Leave Requests Status)
  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [60, 20, 5],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(239, 68, 68, 1)",
        ],
      },
    ],
  };

  // Data for the bar chart (Leave Requests Over Time)
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Leave Requests",
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const pieOptions:any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leave Requests Status",
      },
    },
  };

  // Options for the bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Leave Requests Over Time",
      },
    },
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8 xl:w-[90%] m-auto">
      <header className="mb-8 flex justify-between max-md:flex-col">
        <div>
        <h1 className="text-4xl font-bold text-blue-600 max-md:text-2xl">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Overview of the LMS system statistics and activities.
        </p>
        </div>
     
        <button
          className="mt-4 bg-blue-600 text-white h-[40px] w-[200px] rounded-lg flex items-center cursor-pointer justify-center "
        >
          <FaDownload className="mr-2" />
          Download Report
        </button>
      </header>

      <main>
        {/* Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUserShield className="text-4xl text-blue-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">Total Roles</h2>
              <p className="text-gray-600 mt-2 text-lg">3</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaBuilding className="text-4xl text-green-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Total Departments
              </h2>
              <p className="text-gray-600 mt-2 text-lg">4</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaChalkboardTeacher className="text-4xl text-orange-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Total Courses
              </h2>
              <p className="text-gray-600 mt-2 text-lg">4</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUserTie className="text-4xl text-red-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Total Employees
              </h2>
              <p className="text-gray-600 mt-2 text-lg">100</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaRegCalendarCheck className="text-4xl text-purple-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Total Leave Requests
              </h2>
              <p className="text-gray-600 mt-2 text-lg">85</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaHistory className="text-4xl text-gray-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Pending Leave Requests
              </h2>
              <p className="text-gray-600 mt-2 text-lg">20</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaRegCalendarCheck className="text-4xl text-green-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Approved Leaves
              </h2>
              <p className="text-gray-600 mt-2 text-lg">60</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaRegCalendarCheck className="text-4xl text-red-600 mr-4" />
            <div>
              <h2 className="text-2xl font-bold text-gray-700">
                Rejected Leaves
              </h2>
              <p className="text-gray-600 mt-2 text-lg">5</p>
            </div>
          </div>
        </section>

        {/* Graphs Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Leave Requests Status
            </h2>
            <Pie data={pieData} options={pieOptions} height={210}/>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Monthly Leave Requests
            </h2>
            <Bar
            height={210}
              data={{
                labels: leaveTrendData.labels,
                datasets: [
                  {
                    label: "Leave Requests",
                    data: leaveTrendData.datasets[0].data,
                    backgroundColor: "#2196f3",
                  },
                ],
              }}
            />
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Recent Activities
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between text-gray-600">
              <span>John Doe applied for leave.</span>
              <span className="text-blue-600">2 hours ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Jane Smith's leave request was approved.</span>
              <span className="text-blue-600">5 hours ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Michael Brown's leave request was rejected.</span>
              <span className="text-blue-600">1 day ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>New teacher registered: Emily Clark.</span>
              <span className="text-blue-600">2 days ago</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default LMSAdminDashboard;
