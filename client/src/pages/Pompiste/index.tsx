import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../providers/SidebarProvider";
import Sidebar from "../../components/shared/Sidebar";
import DashHeader from "../../components/shared/DashHeader";

const Index = () => {
  return (
    <>
    <DashHeader/>
    <SidebarProvider>
     <div className="layout">
       <Sidebar />
       <main className="layout__main-content">
         <Outlet />
       </main>
     </div>
   </SidebarProvider>
   </>
  );
};

export default Index;
