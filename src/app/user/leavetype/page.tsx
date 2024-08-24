"use client";
import { getAllLeaveType } from "@/lib/strore/features/leave/types/typesThank";
import { AppDispatch, RootState } from "@/lib/strore/store";
import { useEffect, useState } from "react";
import { FiPlus, FiEdit, FiTrash, FiX, FiInfo } from "react-icons/fi";
import {useDispatch,useSelector} from 'react-redux'
const LeaveTypes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {allLeave,isLoading} = useSelector((state:RootState)=>state.getAllLeaveType);

  useEffect(()=>{
    dispatch(getAllLeaveType());
  },[])
  
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleAddNewClick = () => {

  };


  const handleToggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Leave Types</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={handleAddNewClick}
        >
          <FiPlus className="mr-2" />
          Add New Leave
        </button>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {allLeave?.leaveTypes?.map((type:any) => (
            <div
              key={type._id}
              className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">{type.name}</h2>
                <div className="flex space-x-3">
                  <FiInfo
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleToggleDetails(type._id)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-base font-medium text-gray-800">
                  Total Leave:{" "}
                {type?.allowances?.yearly} Days (Yearly)
                </p>
                <p className="text-gray-600">{type.description}</p>
              </div>
              {expandedId === type._id && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg p-4 z-10 ">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Yearly Allowance
                      </h4>
                      <p className="text-gray-600 mt-1">{type?.allowances?.yearly}</p>
                    </div>

                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Monthly Allowance
                      </h4>
                      <p className="text-gray-600 mt-1">{type?.allowances?.monthly}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Weekly Allowance
                      </h4>
                      <p className="text-gray-600 mt-1">{type?.allowances?.weekly}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Description
                      </h4>
                      <p className="text-gray-600 mt-1">{type?.description}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                      <h4 className="text-base font-medium text-gray-800">
                        Rules
                      </h4>
                      <p className="text-gray-600 mt-1">{type?.rules}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveTypes;
