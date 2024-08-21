"use client";
import Loader from "@/components/Loader";
import { oneUser } from "@/lib/strore/features/user/userThanks";
import { AppDispatch, RootState } from "@/lib/strore/store";
import { Avatar, Button, Card } from "flowbite-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { employee, error, isLoading } = useSelector((state: RootState) => state.getOneEmployee);

  useEffect(() => {
    dispatch(oneUser(params.id));
  }, [dispatch, params.id]);
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(employee);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          <Card className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <Avatar
                // img={personalInfo?.avatar}
                alt="User Avatar"
                size="lg"
                className="mb-4 md:mb-0 md:mr-6"
              />
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                {employee?.employee?.personalInfo?.fullName}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {employee?.employee?.professionalInfo?.designation}
                </p>
              </div>
            </div>

            <div className="w-full mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Department Details</h3>
              <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Department</h4>
                  <p className="text-gray-600 mt-1">Computer Science</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Employee ID</h4>
                  <p className="text-gray-600 mt-1">{employee?.employee?._id}</p>
                </div>
              </div>
            </div>

            <div className="w-full mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Personal Information</h3>
              <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Date of Birth</h4>
                  <p className="text-gray-600 mt-1">{employee?.employee?.personalInfo?.dob}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Email</h4>
                  <p className="text-gray-600 mt-1">{employee?.employee?.personalInfo?.email}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Phone</h4>
                  <p className="text-gray-600 mt-1">{employee?.employee?.personalInfo?.contactNumber}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Address</h4>
                  <p className="text-gray-600 mt-1">{employee?.employee?.personalInfo?.address}</p>
                </div>
              </div>
            </div>

            <div className="w-full mb-6">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Educational Qualification</h3>
              <div className="flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Bachelor's Degree</h4>
                  <p className="text-gray-600 mt-1">{employee?.employee?.educationInfo?.highestQualification}</p>
                  <p className="text-gray-600 mt-1">{employee?.employee?.educationInfo?.university}, {employee?.employee?.educationInfo?.yearOfPassing}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-base font-medium text-gray-800">Master's Degree</h4>
                  <p className="text-gray-600 mt-1">MSc in Software Engineering</p>
                  <p className="text-gray-600 mt-1">University of ABC, 2016-2018</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Button className="w-full" color="blue">
                Edit Profile
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default UserProfile;