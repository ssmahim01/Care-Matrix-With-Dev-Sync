import { Collapsible } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useRole from "@/hooks/useRole";
import "../shared/Navbar/Navbar.css";
import { useAuthLoading } from "@/redux/auth/authActions";
import {
  Award,
  BadgeInfo,
  BedSingle,
  BriefcaseMedical,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  ClipboardPlus,
  Contact,
  CreditCard,
  FileSpreadsheet,
  History,
  Home,
  Hospital,
  IdCardIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  LucideBedSingle,
  MailIcon,
  MessageSquareText,
  Newspaper,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  TicketSlash,
  UserPlus,
  Users,
} from "lucide-react";
import { FaTruck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { NavLink } from "react-router";
import historyIcon from "../assets/file.png";

export function NavMain() {
  const { state } = useSidebar();
  const loading = useAuthLoading();
  const [role, isLoading] = useRole();

  const dashboardRoutes = (
    <>
      {/* Loading Skeleton */}
      {loading || isLoading ? (
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex items-center gap-3 mt-1 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-2/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-3/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-4/6 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-3/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-2/5 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-6 h-6 bg-gray-200 skeleton animate-shimmer rounded-lg" />
            <div className="w-2/7 h-4 bg-gray-200 skeleton animate-shimmer" />
          </div>
          <div className="divider w-3/5 mx-auto"></div>
        </div>
      ) : (
        <ul className="pt-2 *:font-semibold *:text-gray-700 flex flex-col gap-6 pl-2">
          {/* Administrator Dashboard Menu*/}
          {role === "administrator" && (
            <>
              <NavLink to="/dashboard/administrator-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Overview{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/administrator/revenue-insights">
                <h3 className="flex gap-2 items-center">
                  <CircleDollarSign className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Revenue Insights{" "}
                  </span>
                </h3>
              </NavLink>{" "}
              <NavLink to="/dashboard/administrator/manage-billing-payments">
                <h3 className="flex gap-2 items-center">
                  <CreditCard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Billing & Payments{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/administrator/manage-users">
                <h3 className="flex gap-2 items-center">
                  <Users className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Users Management{" "}
                  </span>
                </h3>
              </NavLink>{" "}
              <NavLink to="/dashboard/administrator/doctors">
                <h3 className="flex gap-2 items-center tracking-[-0.2px]">
                  <IdCardIcon className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Doctors Management{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/administrator/assign-users">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <UserPlus className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Assign New User{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/administrator/manage-doctors">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <FaUserDoctor size={25} className="text-base " />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Doctor Requests{" "}
                  </span>
                </h3>
              </NavLink>
              {/* <NavLink to="/dashboard/administrator/manage-requests">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <ClipboardList size={25} className="text-base " />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Manage Requests{" "}
                  </span>
                </h3>
              </NavLink> */}
              <NavLink to="/dashboard/administrator/manage-blogs">
                <h3 className="flex gap-2 items-center tracking-wide">
                  <Newspaper size={25} className="text-base " />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Manage Blogs{" "}
                  </span>
                </h3>
              </NavLink>
              {/* <NavLink to="/dashboard/administrator/contact-message">
                <h3 className="flex gap-2 items-center">
                  <MailIcon className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Contact Message{" "}
                  </span>
                </h3>
              </NavLink> */}
              <div className="divider mt-2"></div>
            </>
          )}
          {/* Doctor Dashboard Menu */}
          {role === "doctor" && (
            <>
              <NavLink to="/dashboard/doctor-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Doctor Overview{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/doctor/doctor-chat">
                <h3 className="flex gap-2 items-center">
                  <MessageSquareText className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Patient Conversation{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/my-appointments">
                <h3 className="flex gap-2 items-center">
                  <CalendarDays className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Patient Appointments{" "}
                  </span>
                </h3>
              </NavLink>{" "}
              <NavLink to="/dashboard/doctor/manage-prescription">
                <h3 className="flex gap-2 items-center">
                  <ClipboardPlus className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    {" "}
                    Manage Prescriptions{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/doctor/billing-history">
                <h3 className="flex gap-2 items-center">
                  <History className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    My Billing History{" "}
                  </span>
                </h3>
              </NavLink>
              {/* <NavLink to="/dashboard/medical-records">
                <h3 className="flex gap-2 items-center">
                  <Hospital className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Medical Records{" "}
                  </span>
                </h3>
              </NavLink> */}
              <div className="divider"></div>
            </>
          )}
          {/* Pharmacist Dashboard Menu */}
          {role === "pharmacist" && (
            <>
              <NavLink to="/dashboard/pharmacist-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Overview
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/pharmacist-chat">
                <h3 className="flex gap-2 items-center">
                  <MessageSquareText className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Conversation{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/sales-report">
                <h3 className="flex gap-2 items-center">
                  <FileSpreadsheet className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    {" "}
                    Sales Report{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/manage-orders">
                <h3 className="flex gap-2 items-center">
                  <FaTruck className="text-2xl" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    {" "}
                    Manage Orders{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/manage-medicines">
                <h3 className="flex gap-2 items-center">
                  <GiMedicines className="text-2xl" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    {" "}
                    Manage Medicines{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/pharmacist/manage-banner">
                <h3 className="flex gap-2 items-center">
                  <TicketSlash className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    {" "}
                    Manage Banners{" "}
                  </span>
                </h3>
              </NavLink>
              <div className="divider"></div>
            </>
          )}
          {/* Patient Dashboard Menu */}
          {role === "patient" && (
            <>
              <NavLink to="/dashboard/patient-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboard className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Overview
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/patient/patient-chat">
                <h3 className="flex gap-2 items-center">
                  <MessageSquareText className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Conversation{" "}
                  </span>
                </h3>
              </NavLink>
              <NavLink
                to="/dashboard/patient/rewards"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out tracking-wider"
                }
              >
                <Award className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  <span className="tracking-widest">My</span> Rewards
                </span>
              </NavLink>
              {/* <NavLink
                to="/dashboard/patient/request-form"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <Sparkles className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  Upgrade Role
                </span>
              </NavLink> */}
              <NavLink
                to="/dashboard/patient/appointments"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <ClipboardPlus className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  My Appointments
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/patient/favorite-doctors"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <FaUserDoctor size={25} />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  My Favorite Doctors
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/patient/my-bedRequest"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <BedSingle className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  My Bed Requests
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/patient/request-history"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <History className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  Request History
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/patient/purchase-history"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <ShoppingBag className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  Order History
                </span>
              </NavLink>
              <NavLink
                to="/dashboard/patient/manage-cart"
                className={
                  "inline-flex gap-2 items-center transition-all duration-300 ease-in-out"
                }
              >
                <ShoppingCart className="text-base" />
                <span className={`${state === "collapsed" && "md:hidden"}`}>
                  Manage Cart
                </span>
              </NavLink>
              <div className="divider"></div>
            </>
          )}
          {/* Receptionist Dashboard Menu */}
          {role === "receptionist" && (
            <>
              <NavLink to="/dashboard/receptionist-overview">
                <h3 className="flex gap-2 items-center">
                  <LayoutDashboardIcon className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Overview
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/receptionist/manage-beds">
                <h3 className="flex gap-2 items-center">
                  <LucideBedSingle className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Beds Management
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/receptionist/manage-bedBooking">
                <h3 className="flex gap-2 items-center">
                  <LucideBedSingle className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Manage Bed Booking
                  </span>
                </h3>
              </NavLink>
              <NavLink to="/dashboard/receptionist/manage-appointments">
                <h3 className="flex gap-2 items-center">
                  <ClipboardPlus className="text-base" />
                  <span className={`${state === "collapsed" && "md:hidden"}`}>
                    Manage Appointments
                  </span>
                </h3>
              </NavLink>
              <div className="divider"></div>
            </>
          )}
        </ul>
      )}
    </>
  );

  const mainRoutes = (
    <ul className="pt-2 pl-2 *:font-semibold *:text-gray-700 flex flex-col gap-6">
      <NavLink to="/">
        <h3 className="flex gap-2 items-center">
          <Home />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            Home
          </span>
        </h3>
      </NavLink>
      <NavLink to="/pharmacy">
        <h3 className="flex gap-2 items-center">
          <BriefcaseMedical className="text-lg" />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            Pharmacy
          </span>
        </h3>
      </NavLink>
      <NavLink to="/services">
        <h3 className="flex gap-2 items-center">
          <Stethoscope className="text-lg" />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            Our Services
          </span>
        </h3>
      </NavLink>
      <NavLink to="/contact-us">
        <h3 className="flex gap-2 items-center">
          <Contact className="text-lg" />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            Contact Us
          </span>
        </h3>
      </NavLink>
      <NavLink to="/about-us">
        <h3 className="flex gap-2 items-center">
          <BadgeInfo className="text-lg" />
          <span className={`${state === "collapsed" && "md:hidden"}`}>
            About Us
          </span>
        </h3>
      </NavLink>
    </ul>
  );

  return (
    <SidebarGroup className={"overflow-y-auto overflow-x-hidden"}>
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
