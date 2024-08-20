import dbitLogo from "@/assets/dbitlogo.png";
import TypingAnimation from "../components/TypingAnimation";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="flex gap-4 justify-center items-center bg-blue-10  pt-4 ">
        <Image
          src={dbitLogo}
          alt="Don Bosco Institute of Technologies Logo"
          className="w-20  max-md:w-16 "
        />
        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg   max-md:text-2xl max-sm:text-xl">
          Don Bosco Institute of Technology
        </h1>
      </div>
      <header className="py-6 flex flex-col items-center justify-center">
        {/* College Logo and Name */}
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-lg md:text-3xl font-medium">
            Leave Management System
          </h3>
        </div>

        <div className="text-center">
          {/* Typing Animation */}
          <TypingAnimation />

          {/* Action Buttons */}
          <section className="flex gap-4 mt-8 justify-center">
            <Link
              href="/login"
              className="bg-[#FBCA38]  w-[150px] h-[50px] flex justify-center items-center rounded-full text-lg font-semibold shadow-lg  transition-colors duration-300"
            >
              Login
            </Link>

            <Link
              href="/user"
              className="bg-white text-gray-900 w-[150px] h-[50px] flex justify-center items-center rounded-full text-lg font-semibold shadow-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
            >
              Get Started
            </Link>
          </section>
        </div>
      </header>

      {/* Features Section */}
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 max-sm:text-3xl">
            System Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">
                Submit Leave Requests
              </h3>
              <p className="text-gray-700">
                Easily apply for leave with a simple and intuitive form. Select
                the type of leave, specify dates, and submit your request in
                minutes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">
                Track Leave Status
              </h3>
              <p className="text-gray-700">
                Monitor the status of your leave requests in real-time. Receive
                notifications on approval or rejection directly in the system.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer">
              <h3 className="text-2xl font-semibold mb-4">
                View Leave History
              </h3>
              <p className="text-gray-700">
                Access a comprehensive history of all your past leave
                applications. Review details and statuses to keep track of your
                leave records.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
