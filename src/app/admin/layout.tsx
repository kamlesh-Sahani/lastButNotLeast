
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ReactNode,Suspense } from "react";
import Loader from "@/components/Loader";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex  h-screen ">
      <AdminSidebar />
      <div className="flex-1 h-screen overflow-x-auto bg-gray-100 ">
      <Suspense fallback={<Loader/>}>
        {children}
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;