"use client";
import { useState } from "react";

const Departmeent = () => {
  const tab = [
    { name: "tab1", label: "tab1" },
    { name: "tab2", label: "tab2" },
    { name: "tab3", label: "tab3" },
  ];
  const [active, setActive] = useState<string>("tab1");

  return (
    <main className="container m-auto py-5 w-full max-h-screen overflow-scroll no-scrollbar ">
      <header className="flex items-center justify-between border-b-2 pb-4  border-gray-300">
        <h1 className="text-4xl font-semibold text-blue-500 ">Department</h1>
        <button className="flex text-white bg-blue-500 font-medium text-lg p-4 rounded-lg shadow-lg hover:shadow-none hover:bg-blue-600">
          Add Department
        </button>
      </header>
      <main className="h-full w-full flex flex-1">
        {tab.map((tab) => (
          <div>
            <h1 className="text-gray-500 font-medium text-lg ">{tab.name}</h1>
          </div>
        ))}
      </main>
    </main>
  );
};
export default Departmeent;
