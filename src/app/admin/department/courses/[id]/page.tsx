import { Card } from "flowbite-react";
import { dumy } from "../../page";
import { useState } from "react";
import { DepartmentSchemaType } from "@/models/Department.model";

const Courses = (params: { id: string }) => {
  const [department, setDepartment] = useState<DepartmentSchemaType[]>(dumy);
  // const courseName = department.map()
  return (
    <div className="flex flex-wrap gap-3 ">
      <Card>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Course Name
        </h5>
      </Card>
    </div>
  );
};
export default Courses;
