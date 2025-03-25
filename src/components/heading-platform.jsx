import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import CareMatrixLogo from "../assets/images/logo-care-matrix.webp";
import { Link } from "react-router";

export function HeadingPlatform() {
  const { state, isSidebarCollapsed } = useSidebar();


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border-b border-sky-100"
        >
          <div className="flex items-center leading-tight w-full">
            {/* Sidebar Logo */}
              <Link to="/">
            <div className="w-full flex items-center gap-1">
                  <img
                    src={CareMatrixLogo}
                    className="w-9 h-9 rounded-md transition-all duration-300"
                    referrerPolicy="no-referrer"
                    alt="Care Matrix Logo"
                  />

                <h3 className={`${state === "collapsed" && "md:hidden"} font-bold text-2xl flex gap-0 items-center`}>Care<span className="text-sky-500">Matrix</span></h3>  
            </div>
              </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}