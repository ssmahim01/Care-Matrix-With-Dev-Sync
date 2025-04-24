import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import UserAction from "@/components/UserAction/UserAction";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       <UserAction />
        <div className="flex flex-1 flex-col gap-4 lg:p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
