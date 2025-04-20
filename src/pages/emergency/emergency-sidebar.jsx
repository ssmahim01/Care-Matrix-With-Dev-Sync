import { HeadingPlatform } from "@/components/heading-platform";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import * as React from "react";
import EmergencyNav from "./emergency-nav";
import { useAuthUser } from "@/redux/auth/authActions";



export function EmergencySidebar({ ...props }) {
  const user  = useAuthUser()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HeadingPlatform/>
      </SidebarHeader>
      <SidebarContent>
        <EmergencyNav/>
      </SidebarContent>
      <SidebarFooter>
        {user ? <NavUser /> : null }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
