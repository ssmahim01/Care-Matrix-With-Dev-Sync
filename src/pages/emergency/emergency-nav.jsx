import React from 'react'
import {
    AlertCircle,
    Ambulance,
    ClipboardList,
    Phone,
  } from "lucide-react"
import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarGroup, SidebarMenu, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { Collapsible } from '@/components/ui/collapsible'


const EmergencyNav = () => {
    const {pathname} = useLocation()
    const { state } = useSidebar();

    const routes = [
        {
          label: "Emergency",
          icon: AlertCircle,
          href: "/emergency",
          active: pathname === "/emergency",
        },
        {
          label: "Emergency Contacts",
          icon: Phone,
          href: "/emergency/contacts",
          active: pathname === "/emergency/contacts",
        },
        {
          label: "Ambulance Booking",
          icon: Ambulance,
          href: "/emergency/ambulance-booking",
          active: pathname === "/emergency/ambulance-booking",
        },
        {
          label: "Emergency Triage",
          icon: ClipboardList,
          href: "/emergency/triage",
          active: pathname === "/emergency/triage",
        },
      ]


  return (
    <div
    >
      <ScrollArea className="flex-1 py-4">
        <SidebarGroup className="grid gap-1 px-2">
        <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
          {routes.map((route, i) => (
            <Link
              key={i}
              to={route.href}
              className={cn(
                `flex items-center gap-3  rounded-md ${state === "collapsed" ? "py-3 px-[5px]" : "px-3 py-2"}  text-muted-foreground hover:bg-muted hover:text-foreground `,
                route.active && "bg-red-100 hover:bg-red-200 hover:text-red-600 text-red-600 font-medium",
              )}
            >
              <route.icon className="h-5 w-5" />
              <h2 className={`${state === "collapsed" && "md:hidden"}`}>{route.label}{" "}</h2>
            </Link>
          ))}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
        </SidebarGroup>
      </ScrollArea>
    </div>
  )
}

export default EmergencyNav


