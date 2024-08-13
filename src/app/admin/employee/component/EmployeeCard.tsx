import { FC, useState } from "react";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { IoMailOutline } from "react-icons/io5";
import { CiMobile1 } from "react-icons/ci";

interface EmployeeCardProps {
  name: string;
  role: string;
  status: string;
  department: string;
  dateOfJoining: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const EmployeeCard: FC<EmployeeCardProps> = ({
  name,
  role,
  status,
  department,
  dateOfJoining,
  email,
  phone,
  imageUrl,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState<Boolean>(false);

  const toggleOptions = () => {
    setIsOptionsVisible(prev => !prev);
  };
  
  return (
   <>
         <div className="w-[250px] h-[327px] rounded-3xl overflow-hidden shadow-md bg-white px-3 py-3 border border-gray-200 relative">
         <PiDotsThreeOutlineVertical className="flex float-end cursor-pointer" onClick={toggleOptions}/>
         {isOptionsVisible && (
          <div className="absolute top-8 right-2 bg-white border border-gray-200 shadow-lg rounded-lg w-32">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => alert('Edit clicked')}>Edit</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" onClick={() => alert('Remove clicked')}>Remove</button>
          </div>
        )}
      <div className="flex items-center justify-center">
      <img src={imageUrl} className="w-16 h-16 rounded-full object-cover " />
      </div>
      <div className=" text-center">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">{role}</p>
        <span className={`inline-block mt-1 px-4 py-1 text-sm font-semibold rounded-full ${status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {status}
        </span>
      </div>
      <div className="mt-2 bg-gray-50 rounded-2xl px-3 py-2">
        <div className="flex items-center text-sm ">
          <IoMailOutline className="mr-2"/>
          <p>{email}</p>
        </div>
        <div className="flex items-center mt-1 text-sm gap-1 text-gray-500">
          <CiMobile1 className="-ml-1 h-4 w-6"/>
          <p>{phone}</p>
        </div>
      </div>
      <div className="mt-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-2xl">
        <p className="text-xs font-medium">Department</p>
        <p className="text-sm font-bold">{department}</p>
        <p className="text-xs font-medium mt-1">Date of Joining</p>
        <p className="text-sm font-bold">{dateOfJoining}</p>
      </div>
    </div>
   </>
  );
};

export default EmployeeCard;