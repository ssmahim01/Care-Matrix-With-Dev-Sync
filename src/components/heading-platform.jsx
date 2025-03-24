import * as React from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import CareMatrixLogo from "../assets/logo.jpg";
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
          <div className="flex items-center text-left text-sm leading-tight w-full">
            {/* Sidebar Logo */}
            <div className="w-full flex items-center gap-2 px-4 py-2">
              <Link to="/">
                <figure className={`${
                    isSidebarCollapsed ? "hidden" : "block"
                  } transition-all duration-300`}>
                  <img
                    src={CareMatrixLogo}
                    className="w-44 h-full transition-all duration-300"
                    referrerPolicy="no-referrer"
                    alt="Care Matrix Logo"
                  />
                </figure>              
              </Link>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}