"use client";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, ArcElement, Title, Tooltip, Legend);

const DashboardPage = () => {


  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Leave Requests',
        data: [3, 2, 5, 4, 6, 7, 8],
        borderColor: 'rgba(59, 130, 246, 0.9)', // Tailwind's blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Tailwind's blue-500 with transparency
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Sample data for the bar chart (Leave Types Distribution)
  const barData = {
    labels: ['Sick Leave', 'Casual Leave', 'Maternity Leave', 'Paternity Leave', 'Earned Leave'],
    datasets: [
      {
        label: 'Number of Leaves',
        data: [5, 7, 3, 2, 8],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the doughnut chart (Leave Approval Status)
  const doughnutData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [18, 6, 2],
        backgroundColor: ['rgba(34, 197, 94, 0.8)', 'rgba(249, 115, 22, 0.8)', 'rgba(239, 68, 68, 0.8)'],
        hoverBackgroundColor: ['rgba(34, 197, 94, 1)', 'rgba(249, 115, 22, 1)', 'rgba(239, 68, 68, 1)'],
      },
    ],
  };

  const lineOptions:any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Leave Requests Over Time',
      },
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Leave Types Distribution',
      },
    },
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8 xl:w-[90%] m-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here’s a summary of your leave requests and other insights.</p>
      </header>

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Leave Requests</h3>
            <p className="text-4xl font-bold text-blue-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Approved Requests</h3>
            <p className="text-4xl font-bold text-blue-600">18</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Pending Requests</h3>
            <p className="text-4xl font-bold text-blue-600">6</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Leave Requests Over Time</h2>
            <Line data={lineData} options={lineOptions} height={210}/>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">Leave Types Distribution</h2>
            <Bar data={barData} options={barOptions} height={210}/>
          </div>
        </div>

     

          <section className="bg-blue-50 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Leave Management Insights</h2>
          <p className="text-lg text-gray-600">The system shows a balanced leave distribution among different types, with a majority of requests being approved. Make sure to submit your requests early for timely approval.</p>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
