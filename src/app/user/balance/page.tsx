"use client";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const LeaveBalancePage = () => {
  // Sample data for the doughnut chart (Leave Balance)
  const doughnutData = {
    labels: ["Sick Leave", "Casual Leave", "Maternity Leave", "Paternity Leave", "Earned Leave"],
    datasets: [
      {
        data: [4, 5, 2, 3, 10], // Example remaining leave balances
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // green-500
          "rgba(59, 130, 246, 0.8)", // blue-500
          "rgba(234, 179, 8, 0.8)", // yellow-500
          "rgba(249, 115, 22, 0.8)", // orange-500
          "rgba(239, 68, 68, 0.8)", // red-500
        ],
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 1)", // green-500
          "rgba(59, 130, 246, 1)", // blue-500
          "rgba(234, 179, 8, 1)", // yellow-500
          "rgba(249, 115, 22, 1)", // orange-500
          "rgba(239, 68, 68, 1)", // red-500
        ],
      },
    ],
  };

  const doughnutOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leave Balance Distribution",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8  xl:w-[90%] m-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Leave Balance</h1>
        <p className="text-gray-600 mt-2">Track your remaining leave balance across all types.</p>
      </header>

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Sick Leave</h3>
            <p className="text-4xl font-bold text-green-500">4</p>
            <p className="text-gray-500">Remaining out of 10</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Casual Leave</h3>
            <p className="text-4xl font-bold text-blue-500">5</p>
            <p className="text-gray-500">Remaining out of 12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Maternity Leave</h3>
            <p className="text-4xl font-bold text-yellow-500">2</p>
            <p className="text-gray-500">Remaining out of 6</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Paternity Leave</h3>
            <p className="text-4xl font-bold text-orange-500">3</p>
            <p className="text-gray-500">Remaining out of 5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Earned Leave</h3>
            <p className="text-4xl font-bold text-red-500">10</p>
            <p className="text-gray-500">Remaining out of 15</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Leave Balance Overview</h2>
          <div className="flex justify-center">
            <div className="w-[100%] h-[400px]"> {/* Adjust the width and height here */}
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        <section className="bg-blue-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Tips for Managing Your Leave</h2>
          <p className="text-lg text-gray-600">
            Make sure to utilize your leave balances wisely. Remember to plan your leaves ahead of time, especially for leaves that require prior approval, such as maternity or paternity leave.
          </p>
        </section>
      </main>
    </div>
  );
};

export default LeaveBalancePage;
