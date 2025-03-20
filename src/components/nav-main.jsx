import {
  BadgeInfo,
  BriefcaseMedical,
  CalendarDays,
  ChartPie,
  ClipboardPlus,
  Contact,
  CreditCard,
  FileSpreadsheet,
  Home,
  Hospital,
  LayoutDashboard,
  Stethoscope,
  TicketSlash,
  Users,
} from "lucide-react";
import { GiMedicines } from "react-icons/gi";


import {
  Collapsible,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { FaUserDoctor } from "react-icons/fa6";

export function NavMain() {
  const administrator = true;
  const isDoctor = false
  const isPharmacist = true

  const dashboardRoutes = (
    <>
      <ul className="menu *:font-semibold *:text-gray-700 flex flex-col gap-6">
        {administrator &&
          <>
            <NavLink to="/dashboard/administrator-overview">
              <h3 className="flex gap-2 items-center">
                <LayoutDashboard className="text-base" /> Overview
              </h3>
            </NavLink>
            <NavLink to="/dashboard/administrator/manage-users">
              <h3 className="flex gap-2 items-center">
                <Users className="text-base" /> Manage Users
              </h3>
            </NavLink>
            <NavLink to="/dashboard/administrator/manage-doctors">
              <h3 className="flex gap-2 items-center">
                <FaUserDoctor className="text-base" /> Doctors Management
              </h3>
            </NavLink>
            <NavLink to="/dashboard/reports">
              <h3 className="flex gap-2 items-center">
                <ChartPie className="text-base" /> Reports & Analytics
              </h3>
            </NavLink>
            <NavLink to="/dashboard/manage-hospital">
              <h3 className="flex gap-2 items-center">
                <Hospital className="text-base" /> Hospital Management
              </h3>
            </NavLink>
            <NavLink to="/dashboard/payments">
              <h3 className="flex gap-2 items-center">
                <CreditCard className="text-base" /> Billing & Payments
              </h3>
            </NavLink>
            <div className="divider mt-2"></div>
          </>
        }
        {
          isDoctor &&
          (
            <>
              <NavLink to="/dashboard/administrator-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" /> Overview
                </h3>
              </NavLink>
              <NavLink to="/dashboard/my-appointments">
                <h3 className="flex gap-2 items-center">
                  <CalendarDays className="text-base" /> My Appointments
                </h3>
              </NavLink>
              <NavLink to="/dashboard/billing-history">
                <h3 className="flex gap-2 items-center">
                  <History className="text-base" /> Billing History
                </h3>
              </NavLink>
              <NavLink to="/dashboard/medical-records">
                <h3 className="flex gap-2 items-center">
                  <Hospital className="text-base" /> Medical Records
                </h3>
              </NavLink>
              <NavLink to="/dashboard/my-prescriptions">
                <h3 className="flex gap-2 items-center">
                  <ClipboardPlus className="text-base" /> My Prescriptions
                </h3>
              </NavLink>
              <div className="divider"></div>
            </>
          )
        }
        {
          isPharmacist &&
          (
            <>
              <NavLink to="/dashboard/patient-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" /> Overview
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/manage-medicines">
                <h3 className="flex gap-2 items-center">
                  <GiMedicines className="text-base" /> Manage Medicines
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/manage-banner">
                <h3 className="flex gap-2 items-center">
                  <TicketSlash className="text-base" /> Manage Banners
                </h3>
              </NavLink>
              <NavLink to="/dashboard/medical-records">
                <h3 className="flex gap-2 items-center">
                  <FileSpreadsheet className="text-base" /> Sales Report
                </h3>
              </NavLink>
              <NavLink to="/dashboard/my-prescriptions">
                <h3 className="flex gap-2 items-center">
                  <ClipboardPlus className="text-base" /> My Prescriptions
                </h3>
              </NavLink>
              <div className="divider"></div>
            </>
          )
        }

      </ul>
    </>
  );

  const mainRoutes = (
    <ul className="menu *:font-semibold *:text-gray-700 flex flex-col gap-6">
      <NavLink to="/">
        <h3 className="flex gap-2 items-center">
          <Home /> Home
        </h3>
      </NavLink>
      <NavLink to="/doctors">
        <h3 className="flex gap-2 items-center">
          <BriefcaseMedical className="text-lg" /> Specialties
        </h3>
      </NavLink>
      <NavLink to="/services">
        <h3 className="flex gap-2 items-center">
          <Stethoscope className="text-lg" /> Services
        </h3>
      </NavLink>
      <NavLink to="/about-us">
        <h3 className="flex gap-2 items-center">
          <BadgeInfo className="text-lg" /> About Us
        </h3>
      </NavLink>
      <NavLink to="/contact-us">
        <h3 className="flex gap-2 items-center">
          <Contact className="text-lg" /> Contact Us
        </h3>
      </NavLink>
    </ul>
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            {dashboardRoutes}
            <SidebarGroupLabel>Main Pages</SidebarGroupLabel>
            {mainRoutes}
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
