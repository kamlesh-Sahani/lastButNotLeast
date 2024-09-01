import { ReactNode } from "react";

const DepartmentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container m-auto py-5 w-full max-h-screen overflow-scroll no-scrollbar ">
      <header className="flex items-center justify-between border-b-2 pb-4  border-gray-300">
        <h1 className="text-4xl font-semibold text-blue-500 font-serif">
          Department & Courses
        </h1>
        <div className="flex gap-4"></div>
      </header>
      <main className="mt-4">
        {children}
      </main>
    </div>
  );
};
export default DepartmentLayout;
