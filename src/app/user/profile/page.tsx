"use client";
import Loader from "@/components/Loader";
import { profileUser } from "@/lib/strore/features/user/userThanks";
import { AppDispatch, RootState } from "@/lib/strore/store";
import { Avatar, Button, Card, Modal } from "flowbite-react";
import { useState, ChangeEvent, useEffect } from "react";
import {useDispatch,useSelector} from "react-redux"
// Define a type for personal information
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  avatar: string;
  password: string;
}

const UserProfile: React.FC = () => {
  const dispatch= useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const {user,error,isLoading} = useSelector((state:RootState)=>state.user);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "Saad Mehmood",
    email: "saad.@gmail.com",
    phone: "123-456-7890",
    address: "D-27 Shaheen Bagh Okhla new delhi 110025",
    dob: "15-03-2003",
    avatar: "https://avatar.iran.liara.run/public/boy",
    password: "**********", // Password placeholder
  });

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleSave = () => {
    setModalOpen(false);
  };

  useEffect(()=>{
    dispatch(profileUser());
  },[dispatch]);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(user?.employee?.personalInfo,'userprofile ');

  return (
    <>
    {
      isLoading ? <Loader />:  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <Avatar
            img={personalInfo.avatar}
            alt="User Avatar"
            size="lg"
            className="mb-4 md:mb-0 md:mr-6"
          />
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              {user?.employee?.personalInfo?.fullName}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Software Engineer
            </p>
          </div>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Department Details
          </h3>
          <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">
                Department
              </h4>
              <p className="text-gray-600 mt-1">Computer Science</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">
                Employee ID
              </h4>
              <p className="text-gray-600 mt-1">348973948320</p>
            </div>
            {/* <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
              <h4 className="text-base font-medium text-gray-800">
                Designation
              </h4>
              <p className="text-gray-600 mt-1">Senior Faculty</p>
            </div> */}
          </div>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Personal Information
          </h3>
          <div className="sm:grid sm:grid-cols-2 flex flex-col gap-4">
            {/* <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">Name</h4>
              <p className="text-gray-600 mt-1">{personalInfo.name}</p>
            </div> */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">
                Date of Birth
              </h4>
              <p className="text-gray-600 mt-1">{user?.employee?.personalInfo?.dob}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">Email</h4>
              <p className="text-gray-600 mt-1">{personalInfo.email}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">Phone</h4>
              <p className="text-gray-600 mt-1">{personalInfo.phone}</p>
            </div>
         
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">Address</h4>
              <p className="text-gray-600 mt-1">{personalInfo.address}</p>
            </div>
            {/* <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
              <h4 className="text-base font-medium text-gray-800">Password</h4>
              <p className="text-gray-600 mt-1">{personalInfo.password}</p>
              <Button className="mt-2" color="blue">
                Change Password
              </Button>
            </div> */}
          </div>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Educational Qualification
          </h3>
          <div className="flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">
                Bachelor's Degree
              </h4>
              <p className="text-gray-600 mt-1">BSc in Computer Science</p>
              <p className="text-gray-600 mt-1">University of XYZ, 2012-2016</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-base font-medium text-gray-800">
                Master's Degree
              </h4>
              <p className="text-gray-600 mt-1">MSc in Software Engineering</p>
              <p className="text-gray-600 mt-1">University of ABC, 2016-2018</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full">
          <Button className="w-full" color="blue" onClick={handleEditClick}>
            Edit Profile
          </Button>
          {/* <Button className="w-full" color="gray">
            Log Out
          </Button> */}
        </div>
      </Card>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header className="text-xl font-semibold text-gray-800">
          Edit Profile
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar
              </label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="form-input mt-2 block w-full"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={personalInfo.name}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, name: e.target.value })
                }
                className="form-input mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                value={personalInfo.dob}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, dob: e.target.value })
                }
                className="form-input mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, email: e.target.value })
                }
                className="form-input mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
                className="form-input mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                value={personalInfo.address}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, address: e.target.value })
                }
                className="form-input mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={handleSave}>
            Save
          </Button>
          <Button color="gray" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    }
    </>
  );
};

export default UserProfile;
