
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex  h-screen ">
      <AdminSidebar />
      <div className="flex-1 h-screen overflow-x-auto bg-gray-100 ">
        {children}
      </div>
    </div>
  );
}

export default Layout;