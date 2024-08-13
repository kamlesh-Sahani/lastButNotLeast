// "use client"
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';

// interface Employee {
//   id: number;
//   name: string;
//   permissions: string[];
// }

// const employeesData: Employee[] = [
//   { id: 1, name: 'John Doe', permissions: ['Create', 'Read'] },
//   { id: 2, name: 'Jane Smith', permissions: ['Read', 'Update'] },
//   { id: 3, name: 'Bob Johnson', permissions: ['Read'] },
// ];

// const allPermissions = ['Create', 'Read', 'Update', 'Delete'];

// export default function EmployeePermissions() {
//     const [employee, setEmployee] = useState<Employee | null>(null);
//     const router = useRouter();
    
//     useEffect(() => {
//     // Check if the router is ready and the code is running on the client side
//     if (router.isReady) {
//       const { id } = router.query; // Get the employee ID from the URL
//       if (id) {
//         const foundEmployee = employeesData.find(emp => emp.id === parseInt(id as string, 10));
//         setEmployee(foundEmployee || null);
//       }
//     }
//   }, [router.isReady, router.query]);

//   const handlePermissionChange = (permission: string) => {
//     if (employee) {
//       const updatedPermissions = employee.permissions.includes(permission)
//         ? employee.permissions.filter(p => p !== permission)
//         : [...employee.permissions, permission];
      
//       setEmployee({ ...employee, permissions: updatedPermissions });

//       // Update the employees data (this would typically involve an API call to save the data)
//       const updatedEmployees = employeesData.map(emp => 
//         emp.id === employee.id ? { ...emp, permissions: updatedPermissions } : emp
//       );
//       // Ideally, you'd make an API call here to save the updated employee data
//       console.log("Updated Employees Data: ", updatedEmployees);
//     }
//   };

//   if (!employee) return <div>Loading...</div>;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-4">
//         Manage Permissions for {employee.name}
//       </h1>
//       <div className="bg-white shadow-md rounded p-4">
//         <h2 className="text-xl font-semibold mb-4">Permissions</h2>
//         <div className="flex gap-4">
//           {allPermissions.map(permission => (
//             <label key={permission} className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="mr-2"
//                 checked={employee.permissions.includes(permission)}
//                 onChange={() => handlePermissionChange(permission)}
//               />
//               {permission}
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


export default function Page({ params }: { params: { id: number } }) {
    return <h1>My Page</h1>
  }