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
  HiCheckCircle,
  HiUserGroup,
} from "react-icons/hi";
import { SlGraph } from "react-icons/sl";
import { RiAdminFill, RiMenu4Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { SlCalender } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/strore/store";
import { profileUser } from "@/lib/strore/features/user/userThanks";
import Loader from "../Loader";
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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const {user,isLoading} = useSelector((state:RootState)=>state.me);
  useEffect(()=>{
    dispatch(profileUser());
  },[dispatch])

  return isLoading?<Loader />: (
    <>
      <div onClick={() => setShowSidebar(!showSidebar)}>
        {!showSidebar && (
          <RiMenu4Fill className="text-3xl cursor-pointer md:hidden absolute top-4 left-4 z-[999]" />
        )}
      </div>

      {showSidebar && (
        <div
          className="w-full h-full bg-black/5 cursor-pointer md:hidden"
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
      )}
      {showSidebar && (
        <div
          className={`bg-white max-md:${
            showSidebar ? "block absolute z-[100]" : "hidden "
          } flex flex-col md:relative`}
          style={{ width: "300px", height: "100vh" }}
        >
          <div className="flex gap-5 items-center justify-center mb-7 relative ">
            <div className="flex gap-5 items-center justify-center  mt-7">
              <img
                src={"https://i.pravatar.cc/150?img=12"}
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
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <HiChartPie />
                <p className="">Dashboard</p>
              </div>
            </Link>

            <Link href={"/user/profile"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/profile" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <HiUser />
                <p className="text">Profile</p>
              </div>
            </Link>

            <Link href={"/user/application"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/application" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <HiShoppingBag />
                <p className="text">Application</p>
              </div>
            </Link>
            <Link href={"/user/status"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/status" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <SlGraph />
                <p className="text">Status</p>
              </div>
            </Link>
            <Link href={"/user/balance"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/balance" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <HiCreditCard />
                <p className="text">Balance</p>
              </div>
            </Link>
            <Link href={"/user/leavetype"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/leavetype" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <SlCalender />
                <p className="text">Leaves</p>
              </div>
            </Link>

            <Link href={"/user/history"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/history" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <HiViewBoards />
                <p className="text">History</p>
              </div>
            </Link>
            <Link href={"/approval"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/approval" ? "bg-[#3d24fc2a]" : ""
                }`}
              >
                <HiCheckCircle />
                <p className="text">Approval</p>
              </div>
            </Link>

            <Link href={"/user/substitute-requests"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#eee] pl-4 text-[20px] text-[#595959] ${
                  pathname === "/user/substitute-requests"
                    ? "bg-[#3d24fc2a]"
                    : ""
                }`}
              >
                <HiUserGroup />
                <p className="text">Substitute Requests</p>
                <div>
                  <span className="text-red-600 font-semibold">(2)</span>
                </div>
              </div>
            </Link>
            {
              user?.role==="ADMIN" &&  <Link href={"/admin"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-[#3d24fc2a] pl-4 text-[20px] text-[#595959] `}
              >
            <RiAdminFill />
                <p className="text">Admin</p>
              </div>
            </Link>
            }

           

          </div>
          <div className=" flex items-center w-full justify-center flex-auto">
            <button
              onClick={() => setOpenModal(true)}
              className="w-[270px] items-center bg-blue-500 h-[40px] rounded-md text-white"
              
            >
              Logout
            </button>
     
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
                  <Link href={"/logout"}>
                    <Button color="blue" onClick={() => setOpenModal(false)}>
                      {"Yes, I'm sure"}
                    </Button>
                    </Link>
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
