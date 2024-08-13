import React from 'react';

interface Course {
  id: string;
  name: string;
  code: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface Department {
  id: number;
  name: string;
  courses: Course[];
  subjects: Subject[];
}

interface DepartmentCardProps {
  department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{department.name}</h2>
        <p className="mt-2 text-gray-600">Courses: {department.courses.length}</p>
        <p className="mt-1 text-gray-600">Subjects: {department.subjects.length}</p>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700">Courses</h3>
          <ul className="mt-2 space-y-2">
            {department.courses.map((course) => (
              <li key={course.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="text-gray-800">{course.name}</span>
                <span className="text-gray-600 text-sm">{course.code}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-700">Subjects</h3>
          <ul className="mt-2 space-y-2">
            {department.subjects.map((subject) => (
              <li key={subject.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span className="text-gray-800">{subject.name}</span>
                <span className="text-gray-600 text-sm">{subject.code}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};




const departments: Department[] = [
  {
    id: 1,
    name: 'Computer Science',
    courses: [
      { id: 'c1', name: 'BCA', code: 'CS101' },
      
    ],
    subjects: [
      { id: 's1', name: 'Algorithms', code: 'CS201' },
      { id: 's2', name: 'Computer Networks', code: 'CS202' },
    ],
  },
  // Add more departments as needed
];

const DepartmentList: React.FC = () => {
  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {departments.map((dept) => (
        <DepartmentCard key={dept.id} department={dept} />
      ))}
    </div>
  );
};

export default DepartmentList;
