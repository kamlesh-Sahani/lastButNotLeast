"use client";
import { Avatar, Button, Card, Modal } from "flowbite-react";
import { useState } from "react";

const UserProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: "Saad Mehmood",
    email: "saad.@gmail.com",
    phone: "123-456-7890",
    address: "D-27 Shaheen Bagh Okhla new delhi 110025",
    dob: "15-03-2003",
  });

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleSave = () => {
    // Save the updated personal information here
    setModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Avatar
            img="https://avatar.iran.liara.run/public/boy"
            alt="User Avatar"
            size="lg"
            className="mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold mb-1">{personalInfo.name}</h2>
            <p className="text-gray-600">Software Engineer</p>
          </div>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold mb-4">Department Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">Department</h4>
              <p className="text-gray-600 mt-1">Computer Science</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">
                Department ID
              </h4>
              <p className="text-gray-600 mt-1">348973948320</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
              <h4 className="text-lg font-medium text-gray-800">Designation</h4>
              <p className="text-gray-600 mt-1">Senior Faculty</p>
            </div>
          </div>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">Name</h4>
              <p className="text-gray-600 mt-1">{personalInfo.name}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">
                Date of Birth
              </h4>
              <p className="text-gray-600 mt-1">{personalInfo.dob}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">Email</h4>
              <p className="text-gray-600 mt-1">{personalInfo.email}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">Phone</h4>
              <p className="text-gray-600 mt-1">{personalInfo.phone}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
              <h4 className="text-lg font-medium text-gray-800">Address</h4>
              <p className="text-gray-600 mt-1">{personalInfo.address}</p>
            </div>
          </div>
          <Button className="mt-6" color="blue" onClick={handleEditClick}>
            Edit Personal Information
          </Button>
        </div>

        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold mb-4">
            Educational Qualification
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">
                Bachelor's Degree
              </h4>
              <p className="text-gray-600 mt-1">BSc in Computer Science</p>
              <p className="text-gray-600 mt-1">University of XYZ, 2012-2016</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">
                Master's Degree
              </h4>
              <p className="text-gray-600 mt-1">MSc in Software Engineering</p>
              <p className="text-gray-600 mt-1">University of ABC, 2016-2018</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full">
          <Button className="w-full" color="blue">
            Edit Profile
          </Button>
          <Button className="w-full" color="gray">
            Log Out
          </Button>
        </div>
      </Card>

      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Edit Personal Information</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
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
                className="form-input mt-1 block w-full"
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
                className="form-input mt-1 block w-full"
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
                className="form-input mt-1 block w-full"
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
                type="text"
                value={personalInfo.phone}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, phone: e.target.value })
                }
                className="form-input mt-1 block w-full"
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
                className="form-textarea mt-1 block w-full"
                rows={3}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button color="blue" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserProfile;
