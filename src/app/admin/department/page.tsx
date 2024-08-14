"use client";
import { useState } from 'react';

const Home = () => {
  // Sample data for departments, courses, semesters, and subjects
  const initialData = [
    {
      id: 1,
      name: 'Engineering',
      courses: [
        {
          id: 1,
          name: 'BTech',
          semesters: [
            {
              id: 1,
              number: 1,
              subjects: [
                { id: 1, name: 'Mathematics' },
                { id: 2, name: 'Physics' },
              ],
            },
            {
              id: 2,
              number: 2,
              subjects: [
                { id: 3, name: 'Chemistry' },
                { id: 4, name: 'Electronics' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Business',
      courses: [
        {
          id: 2,
          name: 'BBA',
          semesters: [
            {
              id: 3,
              number: 1,
              subjects: [
                { id: 5, name: 'Management' },
                { id: 6, name: 'Economics' },
              ],
            },
          ],
        },
        {
          id: 3,
          name: 'BCom',
          semesters: [
            {
              id: 4,
              number: 1,
              subjects: [
                { id: 7, name: 'Accounting' },
                { id: 8, name: 'Business Law' },
              ],
            },
          ],
        },
      ],
    },
  ];

  const [departments, setDepartments] = useState(initialData);
  const [departmentName, setDepartmentName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [semesterNumber, setSemesterNumber] = useState('');
  const [subjectName, setSubjectName] = useState('');

  const handleAddDepartment = () => {
    const newDepartment = {
      id: departments.length + 1,
      name: departmentName,
      courses: [
        {
          id: Date.now(),
          name: courseName,
          semesters: [
            {
              id: Date.now() + 1,
              number: Number(semesterNumber),
              subjects: [{ id: Date.now() + 2, name: subjectName }],
            },
          ],
        },
      ],
    };
    setDepartments([...departments, newDepartment]);
    setDepartmentName('');
    setCourseName('');
    setSemesterNumber('');
    setSubjectName('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Department Management</h1>

      {/* Form to Add Department, Course, Semester, Subject */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Department</h2>
        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="input ml-2"
        />
        <input
          type="text"
          placeholder="Semester Number"
          value={semesterNumber}
          onChange={(e) => setSemesterNumber(e.target.value)}
          className="input ml-2"
        />
        <input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          className="input ml-2"
        />
        <button
          onClick={handleAddDepartment}
          className="btn-primary ml-2"
        >
          Add
        </button>
      </div>

      {/* Display Department, Course, Semester, Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((department) => (
          <div key={department.id} className="p-4 bg-gray-100 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-2">{department.name}</h2>
            {department.courses.map((course) => (
              <div key={course.id}>
                <h3 className="text-lg font-semibold mb-1">{course.name}</h3>
                {course.semesters.map((semester) => (
                  <div key={semester.id}>
                    <h4 className="text-md font-medium mb-1">Semester {semester.number}</h4>
                    <ul className="list-disc pl-4">
                      {semester.subjects.map((subject) => (
                        <li key={subject.id}>{subject.name}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
