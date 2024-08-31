"use client";
import mongoose from "mongoose";
import { useState } from "react";
import { FaArrowLeft, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface SemesterSubjects {
  [semester: string]: string[];
}
interface QuarterlySubjects {
  [quarter: string]: string[];
}
interface SessionalSubjects {
  [session: string]: string[];
}

interface CourseType {
  courseName:string;
  duration: number;
  durationType:"SEMESTER" | "QUARTERLY" | "SESSIONAL";
  sections: number;
  subjects: SemesterSubjects | QuarterlySubjects | SessionalSubjects; 
}
export interface DepartmentSchemaType extends Document{
  departmentName:string;
  departmentHead:mongoose.Schema.Types.ObjectId;
  courses:CourseType[];
  employees:mongoose.Schema.Types.ObjectId[];
  createdAt:Date;
  updatedAt:Date;
}

const Departmeent = () => {
  const [department, setDepartment] = useState<DepartmentSchemaType[]>([
    {
      departmentName:'',
      departmentHead:,
      courses:CourseType[],
      employees:mongoose.Schema.Types.ObjectId[];
      createdAt:Date;
      updatedAt:Date;}
  ])

const addDepartment = () => {
  const newDepartment: any = {
    dName: "",
    dHead: "",
    course: [
      {
        cName: "",
        duration: 0,
        dType: "SEMESTER",
      },
    ],
  };
  setDepartment((prevDepartments) => [...prevDepartments, newDepartment]);
};

const removeDepartment = () => {
  setDepartment((prevDepartments) => prevDepartments.slice(0, -1));
};

const addCourseToDepartment = (index: number) => {
  const newCourse: CourseType = {
    cName: "",
    duration: 0,
    dType: "SEMESTER",
  };
  setDepartment((prevDepartments) => {
    const updatedDepartments = [...prevDepartments];
    updatedDepartments[index].course.push(newCourse);
    return updatedDepartments;
  });
};

const removeCourseFromDepartment = (deptIndex: number, courseIndex: number) => {
  setDepartment((prevDepartments) => {
    const updatedDepartments = [...prevDepartments];
    updatedDepartments[deptIndex].course.splice(courseIndex, 1);
    return updatedDepartments;
  });
};

  const tab = [
    { id: 1, label: "Dep1" },
    { id: 2, label: "Dep2" },
    { id: 3, label: "Dep3" },
  ];
  const course = [
    { id: 1, label: "course1" },
    { id: 2, label: "course2" },
    { id: 3, label: "course3" },
  ];
  const [active, setActive] = useState<number>(1);
  const [courses, setCourses] = useState<boolean>(false);

  return (
    <main className="container m-auto py-5 w-full max-h-screen overflow-scroll no-scrollbar ">
      <header className="flex items-center justify-between border-b-2 pb-4  border-gray-300">
        <h1 className="text-4xl font-semibold text-blue-500 font-serif">
          Department & Courses
        </h1>
        <div className="flex gap-4">
          {/* <button className="flex text-white bg-blue-500 font-medium text-lg p-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-600">
            Add Department
          </button>
          <button className="flex text-white bg-blue-500 font-medium text-lg p-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-600">
            Add Course
          </button> */}
        </div>
      </header>
      <main className="h-full w-full flex gap-3 transition-all">
        <div className="flex flex-col px-2 w-fit  border-black h-fit">
          {tab.map((tab) => (
            <div
              className="flex justify-between max-w-sm w-full flex-col pt-5"
              key={tab.id}
            >
              <h1
                className={` border flex justify-between rounded-lg items-center min-w-[24rem]  px-3 font-medium py-4 text-xl transition-all duration-200 ${
                  active === tab.id
                    ? "text-blue-500 bg-blue-50 border-blue-500 font-semibold"
                    : "text-gray-500  bg-white"
                } ${courses && active === tab.id?"text-blue-400 bg-white":"border"}  cursor-pointer`}
                onClick={() => setActive(tab.id)}
              >
                {tab.label}
                <FiArrowRight className="w-6 h-6 object-contain" />
              </h1>
              {courses && active === tab.id && (
                <div className="w-full h-28 flex flex-col bg-white/50 mt-1 rounded-lg gap-2">
                  {course.map((cors)=>(
                    <h1 key={cors.id} className="text-lg  font-medium">{cors.label}</h1>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-between my-4">
            <button className="flex items-center gap-3 text-red-500 border-red-500 border font-medium text-lg p-4 rounded-lg  hover:shadow-lg  hover:bg-red-50">
              <FaTrash />
              Delete
            </button>
            <button className="flex items-center gap-3 text-white bg-blue-500 font-medium text-lg p-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-600">
              <FaPlus />
              Add
            </button>
          </div>
        </div>
        {courses ? (
          <div className="py-5 h-[89vh] overflow-scroll no-scrollbar  border-black  w-full transition-all duration-150">
            <FiArrowLeft className="text-blue-500 w-7 h-7 cursor-pointer" onClick={()=>setCourses(false)}/>
          </div>
        ) : (
          <div className= "relative  py-5 h-[89vh] overflow-scroll no-scrollbar  border-black  w-full transition-all duration-150">
             <div className="flex justify-end gap-4 mb-2">
             <button className=" flex items-center gap-3 text-white bg-blue-500 font-medium text-lg p-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-600">
              <FaPlus />
              Add
            </button>
             {/* <button className=" flex items-center gap-3  border text-emerald-500 border-emerald-500 font-medium text-lg p-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-50">
              <FaEdit />
              Edit
            </button> */}
             </div>
            {active === 1 && (
              <div className="flex flex-wrap  gap-2 justify-between w-full ">
                <CardCourse handleclick={()=>setCourses(true)}/>
                <CardCourse handleclick={()=>setCourses(true)}/>
                {/* <CardCourse />

                <CardCourse /> */}
              </div>
            )}
            {active === 2 && (
              <div className="flex flex-wrap  gap-2 ">
                {/* <CardCourse />
                
                <CardCourse /> */}
                dep2
              </div>
            )}
            {active === 3 && (
              <div className="flex flex-wrap  gap-2 ">
                {/* <CardCourse /> */}
                dep3
              </div>
            )}
          </div>
        )}
      </main>
    </main>
  );
};
export default Departmeent;


const CardCourse = ({ handleclick, onEdit, onDelete }:{handleclick:()=>void, onEdit?:()=>void, onDelete?:()=>void}) => {
  return (
    <div
      className="relative max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-200"
      onClick={handleclick}
    >
      <div className="p-6">
        {/* Edit/Delete Icons */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // onEdit();
            }}
            className="text-blue-500 hover:text-blue-500"
          >
            <FaEdit className="w-5 h-5"/>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // onDelete();
            }}
            className="text-red-500 hover:text-red-600"
          >
            <FaTrash className="w-5 h-5"/>
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">{"Title"}</h2>
        <h3 className="text-lg font-medium text-gray-600 mt-1">{"subtitle"}</h3>
        <p className="text-gray-500 mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae amet ut,
          atque aliquid quibusdam sunt omnis cumque libero inventore voluptas
          exercitationem iste ducimus eius maxime ex nemo velit deserunt!
          Voluptate?
        </p>
      </div>
    </div>
  );
};

