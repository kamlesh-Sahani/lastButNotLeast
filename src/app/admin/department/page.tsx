"use client";
import { Card } from "flowbite-react";
import mongoose from "mongoose";
import { useState } from "react";
import { FaArrowLeft, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

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
  courseName: string;
  duration: number;
  durationType: "SEMESTER" | "QUARTERLY" | "SESSIONAL";
  sections: number;
  subjects: SemesterSubjects | QuarterlySubjects | SessionalSubjects;
}
export interface DepartmentSchemaType extends Document {
  departmentName: string;
  departmentHead: mongoose.Schema.Types.ObjectId;
  courses: CourseType[];
  employees: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
export const dumy = [
  {
    departmentName: "Computer Science",
    departmentHead: "64e8f9b9b0b5d6d2d85c5b9a",
    courses: [
      {
        courseName: "Introduction to Programming",
        duration: 6,
        durationType: "SEMESTER",
        sections: 3,
        subjects: {
          "Fall 2024": [
            "Programming Basics",
            "Introduction to Algorithms",
            "Data Structures",
          ],
          "Spring 2025": [
            "Object-Oriented Programming",
            "Software Engineering",
            "Web Development",
          ],
        },
      },
      {
        courseName: "Data Science",
        duration: 4,
        durationType: "QUARTERLY",
        sections: 2,
        subjects: {
          "Q1 2024": ["Data Analysis", "Statistics"],
          "Q2 2024": ["Machine Learning", "Data Visualization"],
          "Q3 2024": ["Big Data Technologies", "Data Mining"],
          "Q4 2024": ["Artificial Intelligence", "Deep Learning"],
        },
      },
      {
        courseName: "Advanced Networking",
        duration: 3,
        durationType: "SESSIONAL",
        sections: 1,
        subjects: {
          "Spring 2024": ["Network Protocols", "Network Security"],
          "Fall 2024": ["Wireless Networks", "Network Design"],
        },
      },
    ],
    employees: [
      "64e8f9b9b0b5d6d2d85c5b9b",
      "64e8f9b9b0b5d6d2d85c5b9c",
      "64e8f9b9b0b5d6d2d85c5b9d",
    ],
    createdAt: "2024-08-31T12:00:00Z",
    updatedAt: "2024-08-31T12:00:00Z",
  },
  {
    departmentName: "Computer Science",
    departmentHead: "64e8f9b9b0b5d6d2d85c5b9a",
    courses: [
      {
        courseName: "Introduction to Programming",
        duration: 6,
        durationType: "SEMESTER",
        sections: 3,
        subjects: {
          "Fall 2024": [
            "Programming Basics",
            "Introduction to Algorithms",
            "Data Structures",
          ],
          "Spring 2025": [
            "Object-Oriented Programming",
            "Software Engineering",
            "Web Development",
          ],
        },
      },
      {
        courseName: "Data Science",
        duration: 4,
        durationType: "QUARTERLY",
        sections: 2,
        subjects: {
          "Q1 2024": ["Data Analysis", "Statistics"],
          "Q2 2024": ["Machine Learning", "Data Visualization"],
          "Q3 2024": ["Big Data Technologies", "Data Mining"],
          "Q4 2024": ["Artificial Intelligence", "Deep Learning"],
        },
      },
      {
        courseName: "Advanced Networking",
        duration: 3,
        durationType: "SESSIONAL",
        sections: 1,
        subjects: {
          "Spring 2024": ["Network Protocols", "Network Security"],
          "Fall 2024": ["Wireless Networks", "Network Design"],
        },
      },
    ],
    employees: [
      "64e8f9b9b0b5d6d2d85c5b9b",
      "64e8f9b9b0b5d6d2d85c5b9c",
      "64e8f9b9b0b5d6d2d85c5b9d",
    ],
    createdAt: "2024-08-31T12:00:00Z",
    updatedAt: "2024-08-31T12:00:00Z",
  },
];
const Departmeent = () => {
  const [department, setDepartment] = useState<DepartmentSchemaType[]>(dumy);

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
    const newCourse: any = {
      cName: "",
      duration: 0,
      dType: "SEMESTER",
    };
    setDepartment((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index].courses.push(newCourse);
      return updatedDepartments;
    });
  };

  const removeCourseFromDepartment = (
    deptIndex: number,
    courseIndex: number
  ) => {
    setDepartment((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[deptIndex].courses.splice(courseIndex, 1);
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
  const router = useRouter();

  return (
    <main className="relative flex flex-wrap gap-2 w-full mt-3">
      {department.map((department) => (
        <Card onClick={() => router.push(`/admin/department/courses/${department.courses.map(i=>i.courseName)}`)} className="cursor-pointer">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {department.departmentName}
          </h5>
        </Card>
      ))}
    </main>
  );
};
export default Departmeent;
