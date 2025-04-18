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


const EmergencyNav = () => {
    const {pathname} = useLocation()

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
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-muted/40 md:relative -translate-x-full",
        "transition-transform duration-200 ease-in-out md:translate-x-0",
      )}
    >
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route, i) => (
            <Link
              key={i}
              to={route.href}
              className={cn(
                "flex items-center gap-3  rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
                route.active && "bg-red-100 hover:bg-red-200 hover:text-red-600 text-red-600 font-medium",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

export default EmergencyNav


