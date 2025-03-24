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

import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { FaUserDoctor } from "react-icons/fa6";
import { ShoppingBag } from "lucide-react";
import useRole from "@/hooks/useRole";

// export function NavMain() {
//   const administrator = true;
//   const isDoctor = false;
//   const isPharmacist = true;
//   const isPatient = true

//   const { state } = useSidebar();
//   // console.log(state);


export function NavMain() {
  const { state } = useSidebar();

  const [role, isLoading] = useRole();
  console.log(role);

  if (isLoading) {
    <div>

    </div>
  }

  const dashboardRoutes = (

    <>
      <ul className="menu *:font-semibold *:text-gray-700 flex flex-col gap-6">
        {role === "administrator" && (
          <>
            <NavLink to="/dashboard/administrator-overview">
              <h3 className="flex gap-2 items-center">
                <LayoutDashboard className="text-base" /> Overview
                <span className={`${state === "collapsed" && "md:hidden"}`}>Overview </span>


              </h3>
            </NavLink>
            <NavLink to="/dashboard/administrator/manage-users">
              <h3 className="flex gap-2 items-center">
                <Users className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Manage Users </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/administrator/manage-doctors">
              <h3 className="flex gap-2 items-center">
                <FaUserDoctor size={25} className="text-base " />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Doctors Management </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/reports">
              <h3 className="flex gap-2 items-center">
                <ChartPie className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Reports & Analytics </span>
              </h3>
            </NavLink>
            <NavLink to="/dashboard/manage-hospital">
              <h3 className="flex gap-2 items-center">
                <Hospital className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Hospital Management </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/payments">
              <h3 className="flex gap-2 items-center">
                <CreditCard className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Billing & Payments </span>
              </h3>
            </NavLink>
            <div className="divider mt-2"></div>
          </>
        )}
        {role === "doctor" && (
          <>
            <NavLink to="/dashboard/administrator-overview">
              <h3 className="flex gap-2 items-center">
                <LayoutDashboard className="text-base" /> Overview
                <span className={`${state === "collapsed" && "md:hidden"}`}>Overview </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/my-appointments">
              <h3 className="flex gap-2 items-center">
                <CalendarDays className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>My Appointments </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/billing-history">
              <h3 className="flex gap-2 items-center">
                <History className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Billing History </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/medical-records">
              <h3 className="flex gap-2 items-center">
                <Hospital className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>Medical Records </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/my-prescriptions">
              <h3 className="flex gap-2 items-center">
                <ClipboardPlus className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> My Prescriptions </span>

              </h3>
            </NavLink>
            <div className="divider"></div>
          </>
        )}
        {role === "pharmacist" && (
          <>
            <NavLink to="/dashboard/patient-overview">
              <h3 className="flex gap-2 items-center">
                <LayoutDashboard className="text-base" /> Overview
              </h3>
            </NavLink>
            <NavLink to="/dashboard/pharmacist/manage-medicines">
              <h3 className="flex gap-2 items-center">
                <GiMedicines className="text-2xl" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> Manage Medicines </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/pharmacist/manage-banner">
              <h3 className="flex gap-2 items-center">
                <TicketSlash className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> Manage Banners </span>
              </h3>
            </NavLink>
            <NavLink to="/dashboard/medical-records">
              <h3 className="flex gap-2 items-center">
                <FileSpreadsheet className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> Sales Report </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/my-prescriptions">
              <h3 className="flex gap-2 items-center">
                <ClipboardPlus className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> My Prescriptions </span>

              </h3>
            </NavLink>
            <div className="divider"></div>
          </>
        )}

        {/* Patient Dashboard Menu */}
        {/* {!isPharmacist && !isDoctor && !administrator &&( */}
        {role === "patient" && (
          <>
            <NavLink to="/dashboard/patient-overview">
              <h3 className="flex gap-2 items-center">
                <LayoutDashboard className="text-base" /> Overview
              </h3>
            </NavLink>
            <NavLink to="/dashboard/patient/manage-cart">
              <h3 className="flex gap-2 items-center">
                <ShoppingBag className="text-xl" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> Manage Cart </span>

              </h3>
            </NavLink>
            {/* <NavLink to="/dashboard/pharmacist/manage-banner">
              <h3 className="flex gap-2 items-center">
                <TicketSlash className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> Manage Banners </span>
              </h3>
            </NavLink>
            <NavLink to="/dashboard/medical-records">
              <h3 className="flex gap-2 items-center">
                <FileSpreadsheet className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> Sales Report </span>

              </h3>
            </NavLink>
            <NavLink to="/dashboard/my-prescriptions">
              <h3 className="flex gap-2 items-center">
                <ClipboardPlus className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}> My Prescriptions </span>

              </h3>
            </NavLink> */}
            <div className="divider"></div>
          </>
        )}


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
