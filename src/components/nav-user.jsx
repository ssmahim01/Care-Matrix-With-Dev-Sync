import {
  Bell,
  LogOut,
  Mail,
  Sparkles,
  User
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useIsMobile } from "@/hooks/use-mobile";
import useRole from "@/hooks/useRole";
import { logOut, useAuthLoading, useAuthUser } from "@/redux/auth/authActions";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";

export function NavUser() {
  const dispatch = useDispatch();
  const loading = useAuthLoading();
  const user = useAuthUser();
  const [role] = useRole();
  const isMobile = useIsMobile();

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
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
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
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={"border"} />
            <DropdownMenuGroup className="flex flex-col gap-1">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                      : "hover:bg-[#f1f5f9] transition-all duration-300 ease-in-out py-[6px] rounded-md"
                  }`
                }
              >
                <User size={20} />
                View Profile
              </NavLink>
              {role === "patient" ||
              role === "doctor" ||
              role === "pharmacist" ? (
                <NavLink
                  to="/dashboard/notifications"
                  className={({ isActive }) =>
                    `inline-flex gap-x-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                      isActive
                        ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                        : "hover:bg-[#f1f5f9] transition-all duration-300 ease-in-out py-[6px] rounded-md"
                    }`
                  }
                >
                  <Bell size={20} />
                 <span className="-mt-[1.6px]">Notifications</span>  
                </NavLink>
              ) : (
                <></>
              )}
              {role === "administrator" && (
                <NavLink
                  to="/dashboard/administrator/contact-message"
                  className={({ isActive }) =>
                    `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                      isActive
                        ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                        : "hover:bg-[#f1f5f9] transition-all duration-300 ease-in-out py-[6px] rounded-md"
                    }`
                  }
                >
                  <Mail size={20} />
                  Contact Messages
                </NavLink>
              )}
              {role === "patient" && (
                <NavLink
                  to="/dashboard/patient/request-form"
                  className={({ isActive }) =>
                    `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                      isActive
                        ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                        : "hover:bg-[#f1f5f9] transition-all duration-300 ease-in-out py-[6px] rounded-md"
                    }`
                  }
                >
                  <Sparkles size={20} />
                  Upgrade to Pro
                </NavLink>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className={"border"} />
            <div>
              <button
                className={
                  "hover:bg-[#f1f5f9] transition-all duration-500 ease-in-out py-[6px] rounded-md cursor-pointer hover:text-red-500 flex items-center gap-2 w-full px-2 text-xs font-medium "
                }
                onClick={() => {
                  dispatch(logOut);
                  navigate("/");
                }}
              >
                <LogOut className="hover:text-red-500" size={20} />
                Logout
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
