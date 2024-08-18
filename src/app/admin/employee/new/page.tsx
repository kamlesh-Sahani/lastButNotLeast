"use client";
import React, { useState, useCallback } from "react";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch,RootState } from "@/lib/strore/store";
import { registerUser } from "@/lib/strore/features/user/userThanks";
import { Button, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
const AddDataForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employee, isLoading, error } = useSelector((state: RootState) => state.register);

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
    ["Responsibilities", "text", "responsibilities", "eg. Developed web applications and collaborated with cross-functional teams."],
  ];

  const educationInfo = [
    ["Highest Qualification", "text", "highestQualification", "eg. Bachelors"],
    ["University", "text", "university", "eg. ABC University"],
    ["Year of Passing", "date", "yearOfPassing", "eg. 2017-05-15"],
    ["Specialization", "text", "specialization", "eg. Computer Science"],
  ];

  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [showPersonal, setShowPersonal] = useState(true);
  const [showProfessional, setShowProfessional] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);

  const valueHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const formSubmitHandler = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData));
      if (employee?.success) {
        toast.success(employee.message);
      } else {
        toast.error(employee?.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  }, [dispatch, formData, employee]);

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
      <div className="flex justify-center mt-10">
        <form
          className="flex flex-col gap-6 rounded-2xl bg-white shadow-md p-5 sm:p-10 lg:w-[900px] w-full"
          onSubmit={formSubmitHandler}
        >
          <div className="flex flex-col gap-6">
            {[
              { title: "Personal Information", data: persoonalInfo, show: showPersonal, setShow: setShowPersonal },
              { title: "Professional Information", data: professionalInfo, show: showProfessional, setShow: setShowProfessional },
              { title: "Education Information", data: educationInfo, show: showEducation, setShow: setShowEducation },
              { title: "Experience Information", data: experienceInfo, show: showExperience, setShow: setShowExperience },
            ].map((section, index) => (
              <div key={index} className="w-full flex flex-col gap-5">
                <button
                  type="button"
                  className="text-xl font-semibold border-b-2 h-[40px] flex justify-between hover:text-[#515151] border-[#c4c4c4] cursor-pointer"
                  onClick={() => section.setShow((prev) => !prev)}
                >
                  <span>{section.title}</span>
                  {section.show ? <IoIosArrowDown /> : <IoIosArrowForward />}
                </button>
                {section.show && (
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {section.data.map((item, i) => (
                      <div className="flex flex-col gap-1" key={i}>
                        <label className="font-medium text-[#797979]">{item[0]}</label>
                        <input
                          type={item[1]}
                          className="h-[45px] w-full rounded pl-2 shadow border border-[#646464] focus:border-[3px] focus:border-[#0c6DD9] outline-0"
                          placeholder={item[3]}
                          name={item[2]}
                          value={formData[item[2]] || ""}
                          onChange={valueHandler}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex gap-3 flex-col sm:flex-row">
            <button
              type="reset"
              className="h-[50px] w-full sm:w-1/2 mt-5 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 text-center"
            >
              Reset
            </button>
            {isLoading ? (
              <Button>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">loading...</span>
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDataForm;
