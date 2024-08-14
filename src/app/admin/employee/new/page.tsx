"use client";
import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
const AddDataForm = () => {
  const inputArr = [];
  //   ["Holiday Name", "text", "holidayName", "eg. diwali"],
  const persoonalInfo = [
    ["Full Name", "text", "fullName", "eg. John Doe"],
    ["Date of Birth", "date", "dob", "eg. 1990-05-15"],
    ["Gender", "text", "gender", "eg. male"],
    ["Contact Number", "tel", "contactNumber", "eg. 1234567890"],
    ["Email", "email", "email", "eg. john.doe@example.com"],
    ["Address", "text", "address", "eg. 1234 Main St, Anytown, USA"],
  ];

  const professionalInfo = [
    ["Department ID", "text", "departmentId", "eg. 60b8d295f1d2a609c814f86b"],
    ["Designation", "text", "designation", "eg. Software Engineer"],
    ["Date of Joining", "date", "dateOfJoining", "eg. 2020-06-01"],
    ["Employment Type", "text", "employmentType", "eg. FULL_TIME"],
  ];

  const experienceInfo = [
    ["Company", "text", "company", "eg. Tech Corp"],
    ["Job Title", "text", "jobTitle", "eg. Junior Developer"],
    ["Start Date", "date", "duration.startDate", "eg. 2018-01-01"],
    ["End Date", "date", "duration.endDate", "eg. 2020-05-31"],
    [
      "Responsibilities",
      "text",
      "responsibilities",
      "eg. Developed web applications and collaborated with cross-functional teams.",
    ],
  ];

  const educationInfo = [
    ["Highest Qualification", "text", "highestQualification", "eg. Bachelors"],
    ["University", "text", "university", "eg. ABC University"],
    ["Year of Passing", "date", "yearOfPassing", "eg. 2017-05-15"],
    ["Specialization", "text", "specialization", "eg. Computer Science"],
  ];

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log(formData, "formData");
  };

  const [showPersonal, setShowPersonal] = useState(true);
  const [showProfessional, setShowProfessional] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  return (
    <>
    <div className="flex justify-between pt-6 py-4 lg:px-8 px-3 bg-slate-50">
      <h1 className="text-3xl font-bold">Create New Employee</h1>
      <Link href='/admin/employee'>
      <button className="bg-purple-300 hover:bg-purple-400 rounded-3xl lg:px-4 lg:py-3 py-2 px-3 flex items-center gap-2">
  <IoPersonSharp className="text-xl mt-1" />
  <span className="hidden lg:block">Employees</span>
</button>
      </Link>
    </div>
    <div className=" flex justify-center  mt-10">
      <form
        className="flex flex-col gap-6 rounded-2xl bg-white shadow-md p-10 w-[900px] items-center"
        onSubmit={formSubmitHandler}
      >
        <div className={`flex  flex-wrap gap-10 `}>

          <div className="w-full flex flex-col gap-5">
            <button
              className="text-xl font-semibold border-b-2 h-[40px] flex justify-between hover:text-[#515151] border-[#c4c4c4] cursor-pointer"
              onClick={() => setShowPersonal((prev) => !prev)}
            >
              <span>Personal Information</span>
              {showPersonal ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {showPersonal && (
              <div className="w-full flex flex-wrap gap-5">
                {persoonalInfo.map((int, i) => (
                  <div className="flex flex-col gap-1 " key={i}>
                    <label className=" font-medium text-[#797979]">
                      {int[0]}
                    </label>

                    <input
                      type={int[1]}
                      className="h-[45px] w-[400px] rounded pl-2 shadow border border-[#646464] focus:border-[3px] focus:border-[#0c6DD9] outline-0 cursor-pointer"
                      placeholder={int[3]}
                      name={int[2]}
                      value={formData[int[2]] || ""}
                      onChange={valueHandler}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-5">
            <button
              className="text-xl font-semibold border-b-2 h-[40px] flex justify-between hover:text-[#515151] border-[#c4c4c4] cursor-pointer"
              onClick={() => setShowProfessional((prev) => !prev)}
            >
              <span>Professional Information</span>
              {showProfessional ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {showProfessional && (
              <div className="w-full flex flex-wrap gap-5">
                {professionalInfo.map((int, i) => (
                  <div className="flex flex-col gap-1 " key={i}>
                    <label className=" font-medium text-[#797979]">
                      {int[0]}
                    </label>

                    <input
                      type={int[1]}
                      className="h-[45px] w-[400px] rounded pl-2 shadow border border-[#646464] focus:border-[3px] focus:border-[#0c6DD9] outline-0 cursor-pointer"
                      placeholder={int[3]}
                      name={int[2]}
                      value={formData[int[2]] || ""}
                      onChange={valueHandler}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>


          <div className="w-full flex flex-col gap-5">
            <button
              className="text-xl font-semibold border-b-2 h-[40px] flex justify-between hover:text-[#515151] border-[#c4c4c4] cursor-pointer"
              onClick={() => setShowEducation((prev) => !prev)}
            >
              <span>Education Information</span>
              {showEducation ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {showEducation && (
              <div className="w-full flex flex-wrap gap-5">
                {educationInfo.map((int, i) => (
                  <div className="flex flex-col gap-1 " key={i}>
                    <label className=" font-medium text-[#797979]">
                      {int[0]}
                    </label>

                    <input
                      type={int[1]}
                      className="h-[45px] w-[400px] rounded pl-2 shadow border border-[#646464] focus:border-[3px] focus:border-[#0c6DD9] outline-0 cursor-pointer"
                      placeholder={int[3]}
                      name={int[2]}
                      value={formData[int[2]] || ""}
                      onChange={valueHandler}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-5">
            <button
              className="text-xl font-semibold border-b-2 h-[40px] flex justify-between hover:text-[#515151] border-[#c4c4c4] cursor-pointer"
              onClick={() => setShowExperience((prev) => !prev)}
            >
              <span>Experience Information</span>
              {showExperience ? <IoIosArrowDown /> : <IoIosArrowForward />}
            </button>
            {showExperience && (
              <div className="w-full flex flex-wrap gap-5">
                {experienceInfo.map((int, i) => (
                  <div className="flex flex-col gap-1 " key={i}>
                    <label className=" font-medium text-[#797979]">
                      {int[0]}
                    </label>

                    <input
                      type={int[1]}
                      className="h-[45px] w-[400px] rounded pl-2 shadow border border-[#646464] focus:border-[3px] focus:border-[#0c6DD9] outline-0 cursor-pointer"
                      placeholder={int[3]}
                      name={int[2]}
                      value={formData[int[2]] || ""}
                      onChange={valueHandler}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

         
        </div>
       <div className="w-full gap-3 flex">
       <button type="reset"   className=" h-[50px] w-1/2 mt-5 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Reset</button>
       <button type="submit"   className="h-[50px] w-1/2 mt-5 text-black hover:text-white border border-purple-700 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 bg-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">Submit</button>
       
       </div>
      </form>
    </div>
    </>
  );
};

export default AddDataForm;
