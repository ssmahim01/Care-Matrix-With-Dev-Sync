import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import * as React from "react";
import { Link } from "react-router";
import collapseLogo from "/collapse-logo.png";

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
            <div className="w-full flex items-center gap-2 ">
              <Link to="/">
                <figure className={`transition-all duration-300`}>
                  {state === "collapsed" ? (
                    <img
                      src={collapseLogo}
                      alt=""
                      className="absolute -top-0.5"
                    />
                  ) : (
                    <img
                      src="https://i.ibb.co.com/0p51x7fq/care-matrix-logo-mainlogo.png"
                      className="w-44 h-full transition-all duration-300"
                      referrerPolicy="no-referrer"
                      alt="Care Matrix Logo"
                    />
                  )}
                </figure>
              </Link>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
