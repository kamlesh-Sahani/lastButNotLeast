'use client'
import { useState } from 'react';
import { FiEdit, FiTrash, FiPlusCircle } from 'react-icons/fi';
import { Modal, Button } from 'flowbite-react';

// Interfaces
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

interface DepartmentSchemaType {
  departmentName: string;
  departmentHead: string;
  courses: CourseType[];
  employees: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Initial Dummy Data
const initialDepartments: DepartmentSchemaType[] = [
  {
    departmentName: "Computer Science",
    departmentHead: "head_id_1",
    courses: [
      {
        courseName: "Data Structures",
        duration: 8,
        durationType: "SEMESTER",
        sections: 3,
        subjects: { "Semester 1": ["Linked Lists", "Stacks", "Queues"] },
      },
    ],
    employees: ["employee_id_1"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<DepartmentSchemaType[]>(initialDepartments);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState<CourseType>({
    courseName: '',
    duration: 8,
    durationType: "SEMESTER",
    sections: 1,
    subjects: {},
  });
  const [subjectInputs, setSubjectInputs] = useState<Record<string, string[]>>({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'ADD_DEPARTMENT' | 'EDIT_DEPARTMENT' | 'ADD_COURSE' | 'EDIT_COURSE'>('ADD_DEPARTMENT');
  const [editingCourseIndex, setEditingCourseIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Open Modal Functions
  const openAddDepartmentModal = () => {
    setModalType('ADD_DEPARTMENT');
    setModalTitle('Add New Department');
    setModalOpen(true);
  };

  const openEditDepartmentModal = (departmentName: string) => {
    setSelectedDepartmentId(departmentName);
    const department = departments.find(dept => dept.departmentName === departmentName);
    if (department) {
      setNewDepartmentName(department.departmentName);
      setModalType('EDIT_DEPARTMENT');
      setModalTitle('Edit Department');
      setModalOpen(true);
    }
  };

  const openAddCourseModal = (departmentName: string) => {
    setSelectedDepartmentId(departmentName);
    setModalType('ADD_COURSE');
    setModalTitle('Add New Course');
    // Reset course data
    setNewCourse({
      courseName: '',
      duration: 8,
      durationType: 'SEMESTER',
      sections: 1,
      subjects: {},
    });
    setSubjectInputs({});
    setEditingCourseIndex(null);
    setModalOpen(true);
  };

  const openEditCourseModal = (departmentName: string, courseIndex: number) => {
    const courseToEdit = departments.find(dept => dept.departmentName === departmentName)?.courses[courseIndex];
    if (courseToEdit) {
      setNewCourse(courseToEdit);
      setSubjectInputs(courseToEdit.subjects);
      setEditingCourseIndex(courseIndex);
      setModalType('EDIT_COURSE');
      setModalTitle('Edit Course');
      setModalOpen(true);
    }
  };

  // Handle Department Operations
  const handleAddDepartment = () => {
    if (newDepartmentName.trim() === '') {
      setErrorMessage('Department name cannot be empty.');
      return;
    }

    const newDepartment: DepartmentSchemaType = {
      departmentName: newDepartmentName,
      departmentHead: 'head_id_1', // Dummy head ID
      courses: [],
      employees: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("New Department Data:", newDepartment);
    setDepartments([...departments, newDepartment]);
    setNewDepartmentName('');
    setErrorMessage(null);
    setModalOpen(false);
  };

  const handleEditDepartment = () => {
    if (!selectedDepartmentId) return;

    const updatedDepartments = departments.map((dept) => {
      if (dept.departmentName === selectedDepartmentId) {
        return { ...dept, departmentName: newDepartmentName };
      }
      return dept;
    });

    console.log("Updated Department Data:", updatedDepartments.find(dept => dept.departmentName === selectedDepartmentId));
    setDepartments(updatedDepartments);
    setNewDepartmentName('');
    setErrorMessage(null);
    setModalOpen(false);
  };

  // Handle Course Operations
  const handleAddCourse = () => {
    if (!selectedDepartmentId) return;

    const validDuration =
      (newCourse.durationType === 'SEMESTER' && newCourse.duration === 8) ||
      (newCourse.durationType === 'QUARTERLY' && newCourse.duration === 16) ||
      (newCourse.durationType === 'SESSIONAL' && newCourse.duration === 4);

    if (!validDuration) {
      setErrorMessage(
        `For ${newCourse.durationType.toLowerCase()} courses, the duration must be ${
          newCourse.durationType === 'SEMESTER' ? 8 : newCourse.durationType === 'QUARTERLY' ? 16 : 4
        } to match the 4-year course requirement.`
      );
      return;
    }

    const updatedCourse = { ...newCourse, subjects: subjectInputs };

    const updatedDepartments = departments.map((dept) => {
      if (dept.departmentName === selectedDepartmentId) {
        if (editingCourseIndex !== null) {
          dept.courses[editingCourseIndex] = updatedCourse;
        } else {
          dept.courses.push(updatedCourse);
        }
      }
      return dept;
    });

    console.log("Updated Department Data:", updatedDepartments.find(dept => dept.departmentName === selectedDepartmentId));
    setDepartments(updatedDepartments);
    setNewCourse({
      courseName: '',
      duration: 8,
      durationType: 'SEMESTER',
      sections: 1,
      subjects: {},
    });
    setSubjectInputs({});
    setEditingCourseIndex(null);
    setErrorMessage(null);
    setModalOpen(false);
  };

  const handleDeleteCourse = (departmentName: string, courseIndex: number) => {
    const updatedDepartments = departments.map((dept) => {
      if (dept.departmentName === departmentName) {
        dept.courses.splice(courseIndex, 1);
      }
      return dept;
    });

    console.log("Updated Department Data After Deletion:", updatedDepartments.find(dept => dept.departmentName === departmentName));
    setDepartments(updatedDepartments);
  };

  // Handle Subject Management
  const handleAddSubject = (period: string, subject: string) => {
    if (subject.trim() === '') return;

    const updatedSubjects = { ...subjectInputs };
    if (!updatedSubjects[period]) {
      updatedSubjects[period] = [];
    }
    updatedSubjects[period].push(subject);
    setSubjectInputs(updatedSubjects);
  };

  const handleRemoveSubject = (period: string, index: number) => {
    const updatedSubjects = { ...subjectInputs };
    if (updatedSubjects[period]) {
      updatedSubjects[period].splice(index, 1);
      setSubjectInputs(updatedSubjects);
    }
  };

  // Render Subject Inputs Based on Duration Type
  const renderSubjectInputs = () => {
    const periods =
      newCourse.durationType === 'SEMESTER'
        ? Array.from({ length: newCourse.duration }, (_, i) => `Semester ${i + 1}`)
        : newCourse.durationType === 'QUARTERLY'
        ? Array.from({ length: newCourse.duration }, (_, i) => `Quarter ${i + 1}`)
        : Array.from({ length: newCourse.duration }, (_, i) => `Session ${i + 1}`);

    return periods.map((period, index) => (
      <div key={index} className="mb-4">
        <label className="block font-semibold text-gray-700 mb-2">{period}</label>
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Subject"
            className="block px-4 py-2 border rounded-lg w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSubject(period, (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
        </div>
        {subjectInputs[period]?.map((subject, subIndex) => (
          <div key={subIndex} className="flex items-center space-x-2 mb-2">
            <span className="bg-gray-200 px-2 py-1 rounded">{subject}</span>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => handleRemoveSubject(period, subIndex)}
            >
              <FiTrash size={20} />
            </button>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Departments & Courses</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          onClick={openAddDepartmentModal}
        >
          <FiPlusCircle />
          <span>Add Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div key={department.departmentName} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{department.departmentName}</h2>
              <button
                onClick={() => openAddCourseModal(department.departmentName)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center mb-4"
              >
                <FiPlusCircle className="mr-2" />
                Add Course
              </button>

              <button
                onClick={() => openEditDepartmentModal(department.departmentName)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center mb-4"
              >
                <FiEdit className="mr-2" />
                Edit Department
              </button>

              <button
                onClick={() => handleDeleteDepartment(department.departmentName)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
              >
                <FiTrash className="mr-2" />
                Delete Department
              </button>

              <h3 className="font-semibold text-gray-600 mt-4">Courses:</h3>
              <ul className="mt-2 space-y-2">
                {department.courses.map((course, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md">
                    <div>
                      <span className="font-semibold">{course.courseName}</span>
                      <p className="text-sm text-gray-500">
                        Duration: {course.duration} {course.durationType.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => openEditCourseModal(department.departmentName, index)}
                      >
                        <FiEdit size={20} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteCourse(department.departmentName, index)}
                      >
                        <FiTrash size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>{modalTitle}</Modal.Header>
        <Modal.Body>
          {modalType === 'ADD_DEPARTMENT' && (
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Department Name</label>
              <input
                type="text"
                placeholder="Department Name"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                className="block mb-4 px-4 py-2 border rounded-lg w-full"
              />
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <Button onClick={handleAddDepartment} className="w-full">
                Add Department
              </Button>
            </div>
          )}

          {modalType === 'EDIT_DEPARTMENT' && (
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Department Name</label>
              <input
                type="text"
                placeholder="Department Name"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                className="block mb-4 px-4 py-2 border rounded-lg w-full"
              />
              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
              <Button onClick={handleEditDepartment} className="w-full">
                Update Department
              </Button>
            </div>
          )}

          {(modalType === 'ADD_COURSE' || modalType === 'EDIT_COURSE') && (
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Course Name</label>
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.courseName}
                onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                className="block mb-4 px-4 py-2 border rounded-lg w-full"
              />

              <label className="block font-semibold text-gray-700 mb-2">Duration Type</label>
              <select
                value={newCourse.durationType}
                onChange={(e) => {
                  const durationType = e.target.value as "SEMESTER" | "QUARTERLY" | "SESSIONAL";
                  setNewCourse({
                    ...newCourse,
                    durationType,
                    duration: durationType === 'SEMESTER' ? 8 : durationType === 'QUARTERLY' ? 16 : 4,
                  });
                }}
                className="block mb-4 px-4 py-2 border rounded-lg w-full"
              >
                <option value="SEMESTER">Semester</option>
                <option value="QUARTERLY">Quarterly</option>
                <option value="SESSIONAL">Sessional</option>
              </select>

              <label className="block font-semibold text-gray-700 mb-2">Duration</label>
              <input
                type="number"
                value={newCourse.duration}
                readOnly
                className="block mb-4 px-4 py-2 border rounded-lg w-full bg-gray-200"
              />

              {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

              {renderSubjectInputs()}

              <Button onClick={handleAddCourse} className="w-full">
                {modalType === 'ADD_COURSE' ? 'Add Course' : 'Update Course'}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DepartmentsPage;
