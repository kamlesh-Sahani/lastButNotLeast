"use client";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
  HiCreditCard,
} from "react-icons/hi";
import { RiMenu4Fill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
export default function UserSidebar() {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (                                    
    <>
      <div onClick={() => setShowSidebar(!showSidebar)}>
        {!showSidebar && (
          <RiMenu4Fill className="text-3xl cursor-pointer md:hidden absolute top-4 left-4 z-[999]" />
        )}
      </div>

      {showSidebar && (
        <div
          className="w-full h-full bg-black/20 cursor-pointer md:hidden"
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
      )}
      {showSidebar && (
        <div
          className={`bg-white max-md:${
            showSidebar ? "block absolute z-[999]" : "hidden "
          } flex flex-col md:relative`}
          style={{ width: "300px", height: "100vh" }}
        >
          <div className="flex gap-5 items-center justify-center mb-7 relative">
            <div className="flex gap-5 items-center justify-center  mt-7">
              <img
                src={"https://avatar.iran.liara.run/public/boy"}
                alt="df"
                className="h-[80px] w-[80px] rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-semibold">Saad Mehmood</h1>
                <p className="text-[#6b6b6b]">frontend developer</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-[3]">
            <Link href={"/user"}>
              <div className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${pathname ==='/user'?"bg-[#eee]":""}`}>
                <HiChartPie />
                <p className="">Dashboard</p>
              </div>
            </Link>

            <Link href={"/user/profile"}>
            <div className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${pathname ==='/user/profile'?"bg-[#eee]":""}`}>
                <HiUser />
                <p className="text">Profile</p>
              </div>
            </Link>

            <Link href={"/user/application"}>
            <div className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${pathname ==='/user/application'?"bg-[#eee]":""}`}>
                <HiShoppingBag />
                <p className="text">Application</p>
              </div>
            </Link>
            <Link href={"/user/balance"}>
            <div className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${pathname ==='/user/balance'?"bg-[#eee]":""}`}>
                <HiCreditCard />
                <p className="text">Balance</p>
              </div>
            </Link>

            <Link href={"/user/history"}>
            <div className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${pathname ==='/user/history'?"bg-[#eee]":""}`}>
                <HiViewBoards />
                <p className="text">History</p>
              </div>
            </Link>

            {/* <Link href={"/user/setting"}>
            <div className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${pathname ==='/user/setting'?"bg-[#eee]":""}`}>
                <p className="text">Setting</p>
              </div>
            </Link> */}
          </div>
          <div className=" flex items-center w-full justify-center flex-auto">
            <Button
              onClick={() => setOpenModal(true)}
              className=" w-[270px] items-center bg-transparent border border-blue-500 text-black hover:bg-blue-600 hover:text-white hover:border-transparent"
              color={"blue-500"}
            >
              Logout
            </Button>
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                 
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to Logout?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="blue"  onClick={() => setOpenModal(false)}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
