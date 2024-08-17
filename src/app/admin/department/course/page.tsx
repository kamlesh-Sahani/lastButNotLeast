"use client";
import Link from "next/link";
import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { FiEdit, FiTrash, FiPlusCircle } from "react-icons/fi";

interface Semester {
  subjects: string[];
}

interface Course {
  id: string;
  name: string;
  duration: string;
  semesters: Semester[];
  currentSemester?: "ODD" | "EVEN";
  section?: number;
}

interface Department {
  id: number;
  name: string;
  courses: Course[];
}

const dummyDepartments: Department[] = [
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
          { subjects: ["Project Work", "Elective"] },
        ],
        currentSemester: "ODD",
        section: 2,
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
          { subjects: ["Project Work", "Elective"] },
        ],
        currentSemester: "EVEN",
        section: 1,
      },
    ],
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
          { subjects: ["Project Work", "Elective"] },
        ],
        currentSemester: "ODD",
        section: 3,
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
          { subjects: ["Dissertation", "Elective"] },
        ],
        currentSemester: "EVEN",
        section: 2,
      },
    ],
  },
];

const DepartmentManagement = () => {
  const [departments, setDepartments] =
    useState<Department[]>(dummyDepartments);
  const [showDepartmentModal, setShowDepartmentModal] =
    useState<boolean>(false);
  const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState<number | null>(
    null
  );
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);
  const [newDepartmentName, setNewDepartmentName] = useState<string>("");
  const [newCourseName, setNewCourseName] = useState<string>("");
  const [courseDuration, setCourseDuration] = useState<string>("");
  const [courseSemesters, setCourseSemesters] = useState<Semester[]>([]);
  const [courseCurrentSemesters, setCourseCurrentSemesters] = useState<
    "ODD" | "EVEN" | undefined
  >();
  const [courseSection, setCourseSection] = useState<number | undefined>();
  const [courseInstructors, setCourseInstructors] = useState<string[]>([]);
  const [editDepartmentId, setEditDepartmentId] = useState<number | null>(null);
  const [editCourseId, setEditCourseId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [confirmAction, setConfirmAction] = useState<() => void | null>();

  const handleAddDepartment = () => {
    if (!newDepartmentName.trim()) return;
    const newDepartment: Department = {
      id: Date.now(),
      name: newDepartmentName,
      courses: [],
    };
    setDepartments([...departments, newDepartment]);
    resetDepartmentForm();
  };

  const handleEditDepartment = () => {
    if (editDepartmentId === null) return;
    setDepartments(
      departments.map((department) =>
        department.id === editDepartmentId
          ? { ...department, name: newDepartmentName }
          : department
      )
    );
    resetDepartmentForm();
  };

  const handleDeleteDepartment = (id: number) => {
    setCurrentDepartmentId(id);
    setConfirmAction(() => () => {
      setDepartments(departments.filter((department) => department.id !== id));
      resetConfirmModal();
    });
    setShowConfirmModal(true);
  };

  const handleAddCourse = () => {
    if (currentDepartmentId === null || !newCourseName.trim()) return;
    const newCourse: Course = {
      id: Date.now().toString(),
      name: newCourseName,
      duration: courseDuration,
      semesters: courseSemesters,
      currentSemester: courseCurrentSemesters,
      section: courseSection,
    };
    const updatedDepartments = departments.map((department) =>
      department.id === currentDepartmentId
        ? { ...department, courses: [...department.courses, newCourse] }
        : department
    );
    setDepartments(updatedDepartments);
    resetCourseForm();
  };

  const handleEditCourse = () => {
    if (currentDepartmentId === null || editCourseId === null) return;
    const updatedDepartments = departments.map((department) =>
      department.id === currentDepartmentId
        ? {
            ...department,
            courses: department.courses.map((course) =>
              course.id === editCourseId
                ? {
                    ...course,
                    name: newCourseName,
                    duration: courseDuration,
                    semesters: courseSemesters,
                    instructors: courseInstructors,
                  }
                : course
            ),
          }
        : department
    );
    setDepartments(updatedDepartments);
    resetCourseForm();
  };

  const handleDeleteCourse = (departmentId: number, courseId: string) => {
    setCurrentDepartmentId(departmentId);
    setCurrentCourseId(courseId);
    setConfirmAction(() => () => {
      const updatedDepartments = departments.map((department) =>
        department.id === departmentId
          ? {
              ...department,
              courses: department.courses.filter(
                (course) => course.id !== courseId
              ),
            }
          : department
      );
      setDepartments(updatedDepartments);
      resetConfirmModal();
    });
    setShowConfirmModal(true);
  };

  const addSubject = (semesterIndex: number, subject: string) => {
    setCourseSemesters((prevSemesters) =>
      prevSemesters.map((semester, index) =>
        index === semesterIndex
          ? { ...semester, subjects: [...semester.subjects, subject] }
          : semester
      )
    );
  };

  const removeSubject = (semesterIndex: number, subjectIndex: number) => {
    setCourseSemesters((prevSemesters) =>
      prevSemesters.map((semester, index) =>
        index === semesterIndex
          ? {
              ...semester,
              subjects: semester.subjects.filter((_, i) => i !== subjectIndex),
            }
          : semester
      )
    );
  };

  const addInstructor = (instructor: string) => {
    setCourseInstructors((prevInstructors) => [...prevInstructors, instructor]);
  };

  const removeInstructor = (instructorIndex: number) => {
    setCourseInstructors((prevInstructors) =>
      prevInstructors.filter((_, i) => i !== instructorIndex)
    );
  };

  const resetDepartmentForm = () => {
    setNewDepartmentName("");
    setEditDepartmentId(null);
    setShowDepartmentModal(false);
  };

  const resetCourseForm = () => {
    setNewCourseName("");
    setCourseDuration("");
    setCourseSemesters([]);
    setCourseInstructors([]);
    setEditCourseId(null);
    setShowCourseModal(false);
    setCurrentDepartmentId(null);
  };

  const resetConfirmModal = () => {
    setConfirmAction(() => {});
    setShowConfirmModal(false);
  };

  const openAddDepartmentModal = () => {
    setModalTitle("Add Department");
    setShowDepartmentModal(true);
  };

  const openEditDepartmentModal = (department: Department) => {
    setEditDepartmentId(department.id);
    setNewDepartmentName(department.name);
    setModalTitle("Edit Department");
    setShowDepartmentModal(true);
  };

  const openAddCourseModal = (departmentId: number) => {
    setCurrentDepartmentId(departmentId);
    setModalTitle("Add Course");
    setShowCourseModal(true);
  };

  const openEditCourseModal = (departmentId: number, course: Course) => {
    setCurrentDepartmentId(departmentId);
    setCurrentCourseId(course.id);
    setNewCourseName(course.name);
    setCourseDuration(course.duration);
    setCourseSemesters(course.semesters);
    setCourseSemesters(course.semesters);
    setCourseCurrentSemesters(course.currentSemester);
    setCourseSection(course.section);
    setModalTitle("Edit Course");
    setShowCourseModal(true);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between border-b-2 border-blue-700 mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Department Management
        </h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center mb-6"
          onClick={openAddDepartmentModal}
        >
          <FiPlusCircle className="mr-2" />
          Add Department
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {department.name}
              </h2>
              <div className="flex space-x-2">
                <button
                  className="text-blue-500"
                  onClick={() => openEditDepartmentModal(department)}
                >
                  <FiEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  <FiTrash />
                </button>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mt-4"
              onClick={() => openAddCourseModal(department.id)}
            >
              <FiPlusCircle className="mr-2" />
              Add Course
            </button>
            <div className="mt-4">
              {department.courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2 flex justify-between items-center"
                >
                  <Link
                    href={`/admin/department/course/${course.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {course.name}
                  </Link>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500"
                      onClick={() => openEditCourseModal(department.id, course)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() =>
                        handleDeleteCourse(department.id, course.id)
                      }
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Department Modal */}
        <Modal show={showDepartmentModal} onClose={resetDepartmentForm}>
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              placeholder="Enter Department Name"
              className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={resetDepartmentForm}>
              Cancel
            </Button>
            <Button
              onClick={
                editDepartmentId !== null
                  ? handleEditDepartment
                  : handleAddDepartment
              }
            >
              {editDepartmentId !== null ? "Edit Department" : "Add Department"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Course Modal */}
        <Modal show={showCourseModal} onClose={resetCourseForm}>
          <Modal.Header>{modalTitle}</Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              placeholder="Enter Course Name"
              className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
            <input
              type="text"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              placeholder="Enter Duration"
              className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
            <input
              type="number"
              value={courseSection}
              onChange={(e) => setCourseSection(parseInt(e.target.value))}
              placeholder="Enter Number of section "
              className="mb-4 p-2 border border-gray-300 rounded-lg w-full"
            />
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Semesters</h3>
              {courseSemesters.map((semester, semesterIndex) => (
                <div key={semesterIndex} className="mb-4">
                  <h4 className="text-md font-semibold">
                    Semester {semesterIndex + 1}
                  </h4>
                  {semester.subjects.map((subject, subjectIndex) => (
                    <div
                      key={subjectIndex}
                      className="flex items-center justify-between mb-2"
                    >
                      <span>{subject}</span>
                      <button
                        className="text-red-500"
                        onClick={() =>
                          removeSubject(semesterIndex, subjectIndex)
                        }
                      >
                        <FiTrash />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Add Subject"
                    className="p-2 border border-gray-300 rounded-lg w-full mb-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addSubject(
                          semesterIndex,
                          (e.target as HTMLInputElement).value
                        );
                        (e.target as HTMLInputElement).value = "";
                      }
                    }}
                  />
                  <p className="text-sm text-gray-400 mt-0 pt-0">
                    Press "Enter" to add new Subject
                  </p>
                </div>
              ))}
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={() =>
                  setCourseSemesters([...courseSemesters, { subjects: [] }])
                }
              >
                Add Semester
              </button>
            </div>
            <div className="mb-4 flex gap-5 items-center">
              <h3 className="text-lg font-semibold">Current Semester</h3>

              <select
                name="current"
                value={courseCurrentSemesters}
                onChange={(e) =>
                  setCourseCurrentSemesters(e.target.value as "ODD" | "EVEN")
                }
                className="p-2 border border-gray-300 rounded-lg max-w-xs"
              >
                <option value="">Select Current Semester</option>
                <option value="ODD">ODD</option>
                <option value="EVEN">EVEN</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={resetCourseForm}>
              Cancel
            </Button>
            <Button
              onClick={
                editCourseId !== null ? handleEditCourse : handleAddCourse
              }
            >
              {editCourseId !== null ? "Edit Course" : "Add Course"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Confirmation Modal */}
        <Modal show={showConfirmModal} onClose={resetConfirmModal}>
          <Modal.Header>Confirmation</Modal.Header>
          <Modal.Body>
            <p className="text-center text-gray-700">
              Are you sure you want to delete this item?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={resetConfirmModal}>
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                if (confirmAction) confirmAction();
                resetConfirmModal();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

import Head from "next/head";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Department Management</title>
        <meta name="description" content="Department management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DepartmentManagement />
      </main>
    </div>
  );
};

export default Home;
