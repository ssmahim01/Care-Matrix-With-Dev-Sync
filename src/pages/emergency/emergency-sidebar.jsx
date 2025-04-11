import { HeadingPlatform } from "@/components/heading-platform";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import * as React from "react";
import EmergencyNav from "./emergency-nav";



export function EmergencySidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadingPlatform/>
      </SidebarHeader>
      <SidebarContent>
        <EmergencyNav/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
