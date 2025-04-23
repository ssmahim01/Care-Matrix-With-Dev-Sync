import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaHome, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import { MdDashboard, MdMedicalServices } from "react-icons/md";
import { Award, BedIcon, Moon, Siren } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const MobileSidebar = ({
  isMenuOpen,
  setIsMenuOpen,
  user,
  role,
  dispatch,
  navigate,
  toast,
}) => {
  // Debug log to confirm the component is rendering
  console.log("MobileSidebar rendering", { isMenuOpen, user, role });

  return (
    <SidebarProvider>
      <div className={`lg:hidden fixed inset-0 z-50 ${isMenuOpen ? "block" : "hidden"}`}>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-[300px] bg-[#e2ebee] transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <Sidebar className="h-full w-full">
            <SidebarHeader>
              <div className="p-4">
                <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
                  <img
                    src={"https://i.ibb.co.com/m5ctR6v8/collapse-logo.png"}
                    className="w-12 h-12 rounded-md"
                    referrerPolicy="no-referrer"
                    alt="Logo of Care Matrix"
                  />
                </Link>
              </div>
            </SidebarHeader>
            <SidebarContent>
              {/* Debug Content */}
              <div className="p-4 text-black" style={{ backgroundColor: "white" }}>
                <p>Debug: Sidebar Content Should Appear Below</p>
              </div>

              <SidebarGroup>
                <SidebarGroupLabel style={{ color: "black", fontWeight: "bold" }}>
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                          <FaHome className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Home</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/about-us" onClick={() => setIsMenuOpen(false)}>
                          <FaInfoCircle className="inline-block mr-2" />
                          <span style={{ color: "black" }}>About Us</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/pharmacy" onClick={() => setIsMenuOpen(false)}>
                          <GiMedicines size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Our Pharmacy</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel style={{ color: "black", fontWeight: "bold" }}>
                  Pages
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/doctors" onClick={() => setIsMenuOpen(false)}>
                          <FaUserDoctor size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Our Expert Doctors</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/available-beds" onClick={() => setIsMenuOpen(false)}>
                          <BedIcon size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Our Available Beds</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/services" onClick={() => setIsMenuOpen(false)}>
                          <MdMedicalServices size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Our Services</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/contact-us" onClick={() => setIsMenuOpen(false)}>
                          <FaMapMarkerAlt size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Hospital Location</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/patient-rewards" onClick={() => setIsMenuOpen(false)}>
                          <Award size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Rewards</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/eid-greetings" onClick={() => setIsMenuOpen(false)}>
                          <Moon size={20} className="inline-block mr-2" />
                          <span style={{ color: "black" }}>Eid Greetings</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {user && (
                <SidebarGroup>
                  <SidebarGroupLabel style={{ color: "black", fontWeight: "bold" }}>
                    User
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={
                              role === "administrator"
                                ? "/dashboard/administrator-overview"
                                : role === "doctor"
                                ? "/dashboard/doctor-overview"
                                : role === "pharmacist"
                                ? "/dashboard/pharmacist-overview"
                                : role === "patient"
                                ? "/dashboard/patient-overview"
                                : role === "receptionist"
                                ? "/dashboard/receptionist-overview"
                                : "/"
                            }
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <MdDashboard size={20} className="inline-block mr-2" />
                            <span style={{ color: "black" }}>Dashboard</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => {
                            dispatch(logOut);
                            toast.success("Log out successful");
                            navigate("/");
                            setIsMenuOpen(false);
                          }}
                          className="text-red-500"
                        >
                          <BiLogOutCircle size={20} className="inline-block mr-2" />
                          <span>Logout</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}

              <SidebarGroup>
                <SidebarGroupContent className="p-4">
                  <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full border border-red-500 bg-red-100 hover:bg-red-200 text-red-500 cursor-pointer">
                      <span>Emergency</span>
                      <Siren className="ml-2" />
                    </Button>
                  </Link>
                  {!user && (
                    <Link
                      to="/login"
                      className="block mt-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Button className="w-full border-2 border-[#0e6efd] text-[#0E82FD] hover:bg-[#0e6efd] hover:text-white">
                        <span>Login</span>
                        <BiLogInCircle className="ml-2" />
                      </Button>
                    </Link>
                  )}
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MobileSidebar;