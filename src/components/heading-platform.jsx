import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import CareMatrixLogo from "@/assets/Images/logo-care-matrix.webp";
import { Link } from "react-router";

export function HeadingPlatform() {
  const { state, isSidebarCollapsed } = useSidebar();


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-b border-sky-100 shadow-sm hover:shadow-md rounded"
        >
          <div className="flex items-center text-left text-sm leading-tight w-full">
            {/* Sidebar Logo */}
            <div className="w-full flex items-center gap-2 ">
              <Link to="/" className="flex gap-1 items-center">
                <figure className="flex items-center justify-center">
                  <img
                    src={CareMatrixLogo}
                    className="w-9 h-9 rounded-md transition-all duration-300"
                    referrerPolicy="no-referrer"
                    alt="Care Matrix Logo"
                  />
                </figure>
                {/* Hide text when sidebar is collapsed */}
                <h4
                  className={`font-bold text-2xl ${state === "collapsed" && "md:hidden"} flex flex-row flex-wrap gap-0 transition-all duration-300 ${isSidebarCollapsed ? "hidden" : "block"
                    }`}
                >
                  <span>Care</span>
                  <span className="text-[#535ed1]">Matrix</span>
                </h4>
              </Link>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}