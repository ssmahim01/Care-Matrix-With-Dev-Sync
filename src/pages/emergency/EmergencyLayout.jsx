import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { EmergencySidebar } from "./emergency-sidebar";
import EmergencyNav from "./emergency-nav";

const EmergencyLayout = () => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  });

  return (
    <section>
      <header><EmergencyNav/></header>
        <div className="flex flex-1 flex-col gap-4 p-4 w-11/12 mx-auto lg:w-10/12 pt-5">
          <Outlet />
        </div>
    </section>
  );
};

export default EmergencyLayout