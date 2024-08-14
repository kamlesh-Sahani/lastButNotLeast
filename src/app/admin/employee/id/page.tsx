"use client";

import React, { useState } from "react";
import { ImProfile } from "react-icons/im";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";

const EditPage = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const [editProfessional, setEditProfessional] = useState<boolean>(true);
  const [editEducational, setEditEducational] = useState<boolean>(true);
  return (
    <div className="flex flex-col w-full max-w-screen max-h-screen h-full">
       <div className="flex justify-between pt-6 py-4 lg:px-8 px-3 bg-slate-50">
      <h1 className="text-3xl font-bold">Edit Employee</h1>
      <Link href='/admin/employee'>
      <button className="bg-purple-300 hover:bg-purple-400 rounded-3xl lg:px-4 lg:py-3 py-2 px-3 flex items-center gap-2">
  <IoPersonSharp className="text-xl mt-1" />
  <span className="hidden lg:block">Employees</span>
</button>
      </Link>
    </div>

      <div className="  w-full h-full rounded-lg max-h-screen px-1 lg:px-10 mt-7">
        <div className="ml-5 shadow-md dark:shadow-white bg-slate-50 border mb-3 rounded-lg mr-5 pb-4">
          <div className="flex gap-2 py-2 bg-gray-200 rounded-t-lg">
            <ImProfile className="mt-1 text-3xl ml-4" />
            <h1 className="text-2xl mt-1">Personal Details</h1>
          </div>
          {edit ? (
            <div className="flex  max-sm:flex-col mt-4 px-5">
              <div className="w-full flex flex-col gap-2">
                <div className="flex w-full ">
                  <p className="w-1/2 text-lg ">Name:</p>
                  <p className="">Tahir Khan</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">DOB:</p>
                  <p>17-05-2006</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Gender:</p>
                  <p>Male</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Contact:</p>
                  <p>9783468480</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Address:</p>
                  <p className="w-1/2">D-27, Shaheen Bagh Okhla</p>
                </div>
              </div>

              <div className="sm:w-full max-sm:flex mt-2">
                <button
                  onClick={() => setEdit(!edit)}
                  className="text-white max-sm:w-full max-sm:mx-1 bg-blue-500 p-2 rounded-sm "
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex max-lg:flex-col mt-5 mx-5 ">
              <div className="w-full flex flex-col gap-2 h-full">
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Name:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 border dark:border-black  rounded-lg outline-none"
                    placeholder="Tahir Khan"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">DOB:</label>
                  <input
                    type="date"
                    className="p-2 lg:w-1/4 border dark:border-black  rounded-lg outline-none"
                    placeholder="17-05-2006"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Gender:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="Male"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Contact:</label>
                  <input
                    type="phone"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="9783468480"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Address:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="D-27, Shaheen Bagh Okhla"
                  />
                </div>
              </div>

              <div className="sm:w-full max-sm:flex mt-2">
                <button
                  onClick={() => setEdit(!edit)}
                  className="text-white max-sm:w-full max-sm:mt-2 bg-blue-500 p-2 rounded-sm "
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Professional details */}

        <div className="ml-5 shadow-md dark:shadow-white bg-slate-50 border mb-3 rounded-lg mr-5 pb-4">
          <div className="flex gap-2 py-2 bg-gray-200 rounded-t-lg">
            <BsPersonWorkspace className="mt-1 ml-4 text-3xl" />
            <h1 className="text-2xl mt-1">Professional Details</h1>
          </div>
          {editProfessional ? (
            <div className="flex  max-sm:flex-col mt-4 mx-5">
              <div className="w-full flex flex-col gap-2">
                <div className="flex w-full ">
                  <p className="w-1/2 text-lg ">Department Id:</p>
                  <p className="">dbit001</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Designation:</p>
                  <p>Software Engineer</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Date of Joining:</p>
                  <p>17-05-2020</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Employement Type:</p>
                  <p>Full-Time</p>
                </div>
              </div>

              <div className="sm:w-full max-sm:flex mt-2">
                <button
                  onClick={() => setEditProfessional(!editProfessional)}
                  className="text-white max-sm:w-full max-sm:mx-1 bg-blue-500 p-2 rounded-sm "
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex  max-lg:flex-col mt-3 mx-5">
              <div className="w-full flex flex-col gap-1">
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Department Id:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 border dark:border-black  rounded-lg outline-none"
                    placeholder="dbit001"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Designation:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 border dark:border-black  rounded-lg outline-none"
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Date of Joining:</label>
                  <input
                    type="date"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="17-05-2020"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Employement Type:</label>
                  <input
                    type="phone"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="Full-Time"
                  />
                </div>
              </div>

              <div className="sm:w-full max-sm:flex mt-2">
                <button
                  onClick={() => setEditProfessional(!editProfessional)}
                  className="text-white max-sm:w-full max-sm:mt-2 bg-blue-500 p-2  rounded-sm "
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Eduaction details */}

        <div className="ml-5 shadow-md dark:shadow-white bg-slate-50 border mb-3 rounded-lg mr-5 pb-4">
          <div className="flex gap-2 py-2 bg-gray-200 rounded-t-lg">
            <FaUserGraduate className="mt-1 ml-4 text-3xl" />
            <h1 className="text-2xl mt-1">Educational Details</h1>
          </div>
          {editEducational ? (
            <div className="flex  max-sm:flex-col mt-4 mx-5">
              <div className="w-full flex flex-col gap-2">
                <div className="flex w-full ">
                  <p className="w-1/2 text-lg ">Qualification:</p>
                  <p className="">Graduate</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">University:</p>
                  <p>ABC University</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Year of Passing:</p>
                  <p>17-05-2018</p>
                </div>
                <div className="flex">
                  <p className="w-1/2 text-lg ">Specialization:</p>
                  <p>Computer Science</p>
                </div>
              </div>

              <div className="sm:w-full max-sm:flex mt-2">
                <button
                  onClick={() => setEditEducational(!editEducational)}
                  className="text-white max-sm:w-full max-sm:mx-1 bg-blue-500 p-2 rounded-sm "
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div className="flex  max-lg:flex-col mt-3 mx-5">
              <div className="w-full flex flex-col gap-2">
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Qualification:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 border dark:border-black  rounded-lg outline-none"
                    placeholder="Graduate"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">University:</label>
                  <input
                    type="text"
                    className="p-2 lg:w-1/4 border dark:border-black  rounded-lg outline-none"
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Year of Passing:</label>
                  <input
                    type="date"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="17-05-2018"
                  />
                </div>
                <div className="flex max-lg:flex-col">
                  <label className="w-1/2 text-lg ">Specialization:</label>
                  <input
                    type="phone"
                    className="p-2 lg:w-1/4 rounded-lg border dark:border-black  outline-none"
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="sm:w-full max-sm:flex mt-2">
                <button
                  onClick={() => setEditEducational(!editEducational)}
                  className="text-white max-sm:w-full  max-sm:mt-2 bg-blue-500 p-2 rounded-sm "
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
