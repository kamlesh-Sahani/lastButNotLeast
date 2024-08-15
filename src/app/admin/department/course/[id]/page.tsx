'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
// Adjust import path as necessary
interface Course {
  id: string;
  name: string;
  duration:string;
  semesters:{
    subjects:string[]
  }[]
  instructors:string[]
}

interface Department {
  id: number;
  name: string;
  courses: Course[];
}
// Dummy data
const initialDepartments: Department[] = [
  {
    id: 1,
    name: "Computer Science",
    courses: [
      {
        id: "bca",
        name: "BCA",
        duration: "3 years",
        semesters: [
          { subjects: ["Mathematics", "Computer Science Basics"] },
          { subjects: ["Programming", "Data Structures"] },
          { subjects: ["Algorithms", "Database Systems"] },
          { subjects: ["Software Engineering", "Operating Systems"] },
          { subjects: ["Networking", "Web Development"] },
          { subjects: ["Artificial Intelligence", "Machine Learning"] },
          { subjects: ["Computer Graphics", "Data Analytics"] },
          { subjects: ["Project Work", "Elective"] }
        ],
        instructors: ["Dr. John Doe", "Prof. Jane Smith"]
      },
      {
        id: "mca",
        name: "MCA",
        duration: "3 years",
        semesters: [
          { subjects: ["Advanced Programming", "Mathematics"] },
          { subjects: ["Software Engineering", "Database Management"] },
          { subjects: ["Networking", "Operating Systems"] },
          { subjects: ["Web Technologies", "Mobile Computing"] },
          { subjects: ["Artificial Intelligence", "Data Mining"] },
          { subjects: ["Cloud Computing", "Big Data"] },
          { subjects: ["Information Security", "Software Testing"] },
          { subjects: ["Project Work", "Elective"] }
        ],
        instructors: ["Dr. Emily Davis", "Prof. Robert Brown"]
      }
    ]
  },
  {
    id: 2,
    name: "Management",
    courses: [
      {
        id: "bba",
        name: "BBA",
        duration: "3 years",
        semesters: [
          { subjects: ["Introduction to Business", "Economics"] },
          { subjects: ["Accounting", "Business Law"] },
          { subjects: ["Marketing", "Human Resource Management"] },
          { subjects: ["Operations Management", "Entrepreneurship"] },
          { subjects: ["Financial Management", "Strategic Management"] },
          { subjects: ["International Business", "Project Management"] },
          { subjects: ["Business Ethics", "Corporate Governance"] },
          { subjects: ["Project Work", "Elective"] }
        ],
        instructors: ["Dr. Alice Green", "Prof. Michael White"]
      },
      {
        id: "mba",
        name: "MBA",
        duration: "2 years",
        semesters: [
          { subjects: ["Organizational Behavior", "Quantitative Methods"] },
          { subjects: ["Marketing Management", "Financial Accounting"] },
          { subjects: ["Operations Management", "Human Resource Management"] },
          { subjects: ["Business Strategy", "International Business"] },
          { subjects: ["Managerial Economics", "Business Research Methods"] },
          { subjects: ["Corporate Finance", "Entrepreneurship"] },
          { subjects: ["Supply Chain Management", "Project Management"] },
          { subjects: ["Dissertation", "Elective"] }
        ],
        instructors: ["Dr. Sarah Johnson", "Prof. David Lee"]
      }
    ]
  }
];

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [course, setCourse] = useState<Course | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    console.log('Params ID:', params.id);

    const dept = initialDepartments.find(dept =>
      dept.courses.some(course => course.id === params.id)
    );
    console.log('Department:', dept);

    if (dept) {
      const foundCourse = dept.courses.find(course => course.id === params.id);
      console.log('Found Course:', foundCourse);
      setDepartment(dept);
      setCourse(foundCourse || null);
    }
  }, [params.id]);

  if (!course || !department) {
    return <div className="text-center p-6">Course not found.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">{course.name} Details</h1>
        <p className="text-lg text-gray-600 mt-2">Explore the comprehensive details of this course.</p>
      </header>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 text-lg font-medium text-center ${activeTab === "overview" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`flex-1 py-4 text-lg font-medium text-center ${activeTab === "semesters" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("semesters")}
          >
            Semesters
          </button>
          <button
            className={`flex-1 py-4 text-lg font-medium text-center ${activeTab === "instructors" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setActiveTab("instructors")}
          >
            Instructors
          </button>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Course Overview</h2>
              <p className="text-lg text-gray-700"><strong>Course Name:</strong> {course.name}</p>
              <p className="text-lg text-gray-700"><strong>Duration:</strong> {course.duration}</p>
              <p className="text-lg text-gray-700"><strong>Department:</strong> {department.name}</p>
            </div>
          )}

          {activeTab === "semesters" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Semesters</h2>
              {course.semesters.map((semester, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                  <h3 className="text-xl font-semibold text-gray-800">Semester {index + 1}</h3>
                  <ul className="list-disc pl-5 mt-2 text-gray-700">
                    {semester.subjects.map((subject, idx) => (
                      <li key={idx}>{subject}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "instructors" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Instructors</h2>
              <ul className="list-disc pl-5 text-gray-700">
                {course.instructors.map((instructor, index) => (
                  <li key={index}>{instructor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-6 text-center">
        <Link href="/admin/department/course" className="text-blue-500 hover:underline text-lg">
          &larr; Back to Courses
        </Link>
      </footer>
    </div>
  );
}
