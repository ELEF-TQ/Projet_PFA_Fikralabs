import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../providers/SidebarProvider";
import Sidebar from "../../components/Sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="layout">
        <Sidebar />
        <main className="layout__main-content">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
