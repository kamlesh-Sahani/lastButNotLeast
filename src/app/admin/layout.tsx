import UserSidebar from "@/components/user/UserSidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex  h-screen ">
      <UserSidebar />
      <div className="flex-1 h-screen overflow-x-auto bg-gray-100 ">
        {children}
      </div>
    </div>
  );
}

export default Layout;