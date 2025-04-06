"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsRight,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { logOut, useAuthUser } from "@/redux/auth/authActions";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";

export function NavUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useAuthUser();
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
              <ChevronsRight className="ml-auto size-4" />
            </SidebarMenuButton>
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
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="flex flex-col gap-3 py-2">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                      : "hover:bg-base-300/80 transition-all duration-300 ease-in-out py-[6px] rounded-md"
                  }`
                }
              >
                <User size={20} />
                View Profile
              </NavLink>
              <NavLink
                to="/dashboard/patient/request-form"
                className={({ isActive }) =>
                  `inline-flex gap-2 px-2 items-center text-xs font-medium transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-blue-50 rounded-md py-[6px] w-full text-blue-500"
                      : "hover:bg-base-300/80 transition-all duration-300 ease-in-out py-[6px] rounded-md"
                  }`
                }
              >
                <Sparkles size={20} />
                Upgrade to Pro
              </NavLink>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <p
                onClick={() => {
                  dispatch(logOut);
                  navigate("/");
                }}
                className="cursor-pointer hover:text-rose-500 flex gap-2 items-center"
              >
                <LogOut className="hover:text-rose-500" />
                Log out
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
