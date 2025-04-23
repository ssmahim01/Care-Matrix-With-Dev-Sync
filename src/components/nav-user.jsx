"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthLoading, useAuthUser } from "@/redux/auth/authActions";

export function NavUser() {
  const loading = useAuthLoading();
  const user = useAuthUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {loading ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <div className="h-10 w-10 bg-gray-200 rounded-lg animate-shimmer skeleton" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-shimmer skeleton" />
                  <div className="h-3 w-32 bg-gray-200 rounded mt-1 animate-shimmer skeleton" />
                </div>
                <div className="ml-auto h-4 w-4 bg-gray-200 rounded animate-shimmer skeleton" />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
