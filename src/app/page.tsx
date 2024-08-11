import dbitLogo from '@/assets/dbitlogo.png';
import TypingAnimation from '../components/TypingAnimation'; 
import Image from 'next/image';
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="py-12 flex flex-col items-center justify-center">
          {/* College Logo and Name */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src={dbitLogo}  
              alt="Don Bosco Institute of Technologies Logo"
              className="w-24 h-24 mb-4"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">Don Bosco Institute of Technology</h1>
            <h3 className="text-lg md:text-xl font-light">Leave Management System</h3>
          </div>

        <div className="text-center">
        

          {/* Typing Animation */}
          <TypingAnimation />

          {/* Action Buttons */}
          <section className="flex gap-4 mt-8 justify-center">
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </a>
            <a
              href="#learn-more"
              className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-semibold shadow-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
            >
              Learn More
            </a>
          </section>
        </div>
      </header>

      {/* Features Section */}
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">Submit Leave Requests</h3>
              <p className="text-gray-700">Easily apply for leave with a simple and intuitive form. Select the type of leave, specify dates, and submit your request in minutes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">Track Leave Status</h3>
              <p className="text-gray-700">Monitor the status of your leave requests in real-time. Receive notifications on approval or rejection directly in the system.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">View Leave History</h3>
              <p className="text-gray-700">Access a comprehensive history of all your past leave applications. Review details and statuses to keep track of your leave records.</p>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default HomePage;
