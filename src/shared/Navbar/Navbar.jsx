import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaHome, FaInfoCircle, FaMapMarkerAlt, FaPager } from "react-icons/fa";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdMedicalServices,
} from "react-icons/md";
import useRole from "@/hooks/useRole";
import { logOut, useAuthLoading } from "@/redux/auth/authActions";
import { Award, BedIcon, Moon, Siren, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import CartDropdown from "./CartDropdown";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const loading = useAuthLoading();
  const [role, isLoading] = useRole();
  const [showImage, setShowImage] = useState(true);

  const [collapseIsOpen, setCollapseOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setShowImage(true);
      } else {
        setShowImage(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuRef = useRef(null);

  return (
    <>
      <div className="fixed z-20 w-full bg-[#f3f6f9] shadow-sm border-b border-[#f3f6f9]">
        {location.pathname === "/" && (
          <div className="w-full h-[60px] overflow-hidden">
            <img
              src="https://zenui.net/palestine-banner.svg"
              alt="Free Palestine"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="max-w-[1700px] mx-auto w-11/12">
          <div className="navbar p-0 h-16">
            <div className="navbar-start w-fit">
              {/* Drawer for Mobile */}
              <Drawer
                open={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                direction="left"
              >
                <DrawerTrigger asChild>
                  <Menu
                    className="text-[1.6rem] text-[#363030] cursor-pointer lg:hidden flex mr-2"
                    onClick={() => setIsDrawerOpen(true)}
                  />
                </DrawerTrigger>
                <DrawerContent className="h-full w-[300px] bg-[#e2ebee] fixed top-0 left-0">
                  <DrawerHeader>
                    <DrawerTitle>
                      <div className="pt-4">
                        <h2 className="text-sky-500 font-bold text-xl border-b pb-1 border-black">
                          Menu
                        </h2>
                      </div>
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 pt-0">
                    {/* Navigation Section */}
                    <div className="mb-4">
                      {/* <h3 className="text-black font-bold mb-2">Navigation</h3> */}
                      <ul className="list-none p-0">
                        <li>
                          <NavLink
                            to="/"
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-black py-2 flex items-center"
                          >
                            <FaHome className="inline-block mr-2" />
                            Home
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/about-us"
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-black py-2 flex items-center"
                          >
                            <FaInfoCircle className="inline-block mr-2" />
                            About Us
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/pharmacy"
                            onClick={() => setIsDrawerOpen(false)}
                            className="text-black py-2 flex items-center"
                          >
                            <GiMedicines
                              size={20}
                              className="inline-block mr-2"
                            />
                            Our Pharmacy
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    {/* Pages Section with Collapsible */}
                    <div className="mb-4">
                      <Collapsible onOpenChange={setCollapseOpen}>
                        <CollapsibleTrigger
                          className="flex items-center justify-between w-full text-black font-bold mb-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Pages</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              collapseIsOpen ? "rotate-180" : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="list-none p-0 pl-4">
                            <li>
                              <NavLink
                                to="/doctors"
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-black py-2 flex items-center"
                              >
                                <FaUserDoctor
                                  size={20}
                                  className="inline-block mr-2"
                                />
                                Our Expert Doctors
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/available-beds"
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-black py-2 flex items-center"
                              >
                                <BedIcon
                                  size={20}
                                  className="inline-block mr-2"
                                />
                                Our Available Beds
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/services"
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-black py-2 flex items-center"
                              >
                                <MdMedicalServices
                                  size={20}
                                  className="inline-block mr-2"
                                />
                                Our Services
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/contact-us"
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-black py-2 flex items-center"
                              >
                                <FaMapMarkerAlt
                                  size={20}
                                  className="inline-block mr-2"
                                />
                                Hospital Location
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/patient-rewards"
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-black py-2 flex items-center"
                              >
                                <Award
                                  size={20}
                                  className="inline-block mr-2"
                                />
                                Rewards
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                to="/eid-greetings"
                                onClick={() => setIsDrawerOpen(false)}
                                className="text-black py-2 flex items-center"
                              >
                                <Moon size={20} className="inline-block mr-2" />
                                Eid Greetings
                              </NavLink>
                            </li>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>

                    {/* Buttons */}
                    <div>
                      <Link
                        to="/emergency"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <Button className="w-full border border-red-500 bg-red-100 hover:bg-red-200 text-red-500 cursor-pointer">
                          <span>Emergency</span>
                          <Siren className="ml-2" />
                        </Button>
                      </Link>
                      {!user && (
                        <Link
                          to="/login"
                          className="block mt-4"
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          <Button className="w-full border-2 border-[#0e6efd] text-[#0E82FD] hover:bg-[#0e6efd] hover:text-white">
                            <span>Login</span>
                            <BiLogInCircle className="ml-2" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>

              <div className="md:flex  items-center">
                <Link to={"/"}>
                  <img
                    src={
                      "https://i.ibb.co.com/0p51x7fq/care-matrix-logo-mainlogo.png"
                    }
                    className="w-44 h-full rounded-md"
                    referrerPolicy="no-referrer"
                    alt="Logo of Care Matrix"
                  />
                </Link>
              </div>

              {/* <div className="md:hidden flex items-center">
                <Link to={"/"}>
                  <img
                    src={"https://i.ibb.co.com/m5ctR6v8/collapse-logo.png"}
                    className="w-12 h-12 rounded-md"
                    referrerPolicy="no-referrer"
                    alt="Logo of Care Matrix"
                  />
                </Link>
              </div> */}
            </div>
            <div className="navbar-end w-full">
              <>
                <ul className="flex items-center gap-3 text-[#1b1b1b] md:mr-3 mr-1">
                  <div className="lg:flex gap-3 items-center hidden">
                    <NavLink
                      className="flex gap-1 items-center"
                      to="/"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <FaHome /> <span className="font-bold">Home</span>
                    </NavLink>
                    <NavLink
                      className="flex gap-1 items-center"
                      to="/about-us"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <FaInfoCircle />{" "}
                      <span className="font-bold">About Us</span>
                    </NavLink>
                    <NavLink
                      className="flex gap-1 items-center"
                      to="/pharmacy"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      <GiMedicines size={20} />{" "}
                      <span className="font-bold">Our Pharmacy</span>
                    </NavLink>
                  </div>
                  <li
                    ref={menuRef}
                    className="transition-all duration-500 cursor-pointer hover:text-[#3B9DF8] capitalize lg:flex items-center gap-[3px] relative hidden"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <p
                      className={`flex gap-2 items-center ${
                        isOpen ? "text-[#3B9DF8]" : ""
                      }`}
                    >
                      <FaPager />
                      <span className="font-bold">Pages</span>
                    </p>
                    <MdKeyboardArrowDown
                      className={`text-[1.5rem] text-[#424242] transition-all duration-500 ${
                        isOpen
                          ? "rotate-180 text-[#3B9DF8]"
                          : "group-hover:text-[#3B9DF8]"
                      }`}
                    />
                    {isOpen && (
                      <article className="p-6 bg-[#f3f6f9] rounded-b-lg md:w-[550px] w-[435px] absolute top-[38px] md:right-[-125px] -right-40 z-30 transition-all duration-300 rounded-t-md border-border">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                          <ul className="flex flex-col gap-4 text-gray-800">
                            <NavLink
                              to="/doctors"
                              className="flex items-start gap-3 transition-all duration-300 hover:bg-gray-200/40 rounded-lg p-2"
                            >
                              <div className="mt-1">
                                <FaUserDoctor
                                  size={20}
                                  className="text-gray-800"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  Our Expert Doctors
                                </span>
                                <p className="text-sm text-gray-600">
                                  Showcases skilled doctors with medical
                                  expertise details.
                                </p>
                              </div>
                            </NavLink>
                            <NavLink
                              to="/available-beds"
                              className="flex items-start gap-3 transition-all duration-300 hover:bg-gray-200/40 rounded-lg p-2"
                            >
                              <div className="mt-1">
                                <BedIcon size={20} className="text-gray-800" />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  Our Available Beds
                                </span>
                                <p className="text-sm text-gray-600">
                                  Explore real-time availability of beds & book
                                  bed.
                                </p>
                              </div>
                            </NavLink>
                          </ul>
                          <ul className="flex flex-col gap-4 text-gray-800">
                            <NavLink
                              to="/services"
                              className="flex items-start gap-3 transition-all duration-300 hover:bg-gray-200/40 rounded-lg p-2"
                            >
                              <div className="mt-1">
                                <MdMedicalServices
                                  size={20}
                                  className="text-gray-800"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  Our Services
                                </span>
                                <p className="text-sm text-gray-600">
                                  Highlights diverse medical services for our
                                  patient care.
                                </p>
                              </div>
                            </NavLink>
                            <NavLink
                              to="/contact-us"
                              className="flex items-start gap-3 transition-all duration-300 hover:bg-gray-200/40 rounded-lg p-2"
                            >
                              <div className="mt-1">
                                <FaMapMarkerAlt
                                  size={20}
                                  className="text-gray-800"
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  Hospital Location
                                </span>
                                <p className="text-sm text-gray-600">
                                  Displays hospital address with interactive map
                                  feature.
                                </p>
                              </div>
                            </NavLink>
                          </ul>
                          <ul className="flex flex-col gap-4 text-gray-800">
                            <NavLink
                              to="/patient-rewards"
                              className="flex items-start gap-2 transition-all duration-300 hover:bg-gray-200/40 rounded-lg p-2"
                            >
                              <div className="mt-1">
                                <Award size={20} className="text-gray-800" />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  Rewards
                                </span>
                                <p className="text-sm text-gray-600">
                                  Motivating patients to adopt healthy habits
                                  through a rewarding experience.
                                </p>
                              </div>
                            </NavLink>
                          </ul>
                          <ul className="flex flex-col gap-4 text-gray-800">
                            <NavLink
                              to="/eid-greetings"
                              className="flex items-start gap-2 transition-all duration-300 hover:bg-gray-200/40 rounded-lg p-2"
                            >
                              <div className="mt-1">
                                <Moon size={20} className="text-gray-800" />
                              </div>
                              <div>
                                <span className="font-semibold text-lg">
                                  Eid Greetings
                                </span>
                                <p className="text-sm text-gray-600">
                                  Spreading joy and heartfelt wishes through
                                  festive Eid greetings.
                                </p>
                              </div>
                            </NavLink>
                          </ul>
                        </div>
                      </article>
                    )}
                  </li>
                </ul>
              </>

              <div className="md:flex items-center gap-2 hidden">
                <Link to="/emergency">
                  <Button
                    className={`${
                      user && role === "patient" ? "" : "mr-4"
                    } bg-red-100 hover:bg-red-200 tracking-tight text-red-500 cursor-pointer`}
                  >
                    <span>Emergency</span>
                    <Siren className="text-base" />
                  </Button>
                </Link>
                
              </div>
              {user && role === "patient" && (
                  <div className="mx-4 ">
                    <CartDropdown />
                  </div>
                )}

              {loading || isLoading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner w-8 h-8 text-[#0E82FD]"></span>
                </div>
              ) : user ? (
                <div className="dropdown dropdown-end avatar-online">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost border-none btn-circle avatar w-12 h-12"
                  >
                    <img
                      src={user?.photoURL}
                      alt={user ? user?.displayName : "Guest user"}
                      className="w-full h-full border-4 border-sky-500 rounded-full hover:border-gray-300 transition-all duration-300 hover:scale-105 cursor-pointer"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-200 bg-opacity-60 rounded z-[20] mt-2 w-80 py-3 shadow-md"
                  >
                    <div className="pl-2 *:font-bold flex flex-col gap-2">
                      <div className="flex flex-col">
                        <h1 className="text-[1rem] font-semibold text-gray-800">
                          {user?.displayName}
                        </h1>
                        <p className="text-sm font-medium text-gray-800">
                          {user?.email}
                        </p>
                      </div>
                      <Separator />
                      <NavLink
                        className="flex gap-1 items-center text-lg bg-[#f1f1f1] hover:bg-[#eaeaea] transition-all duration-300 ease-in-out py-1 px-2 rounded-md mb-1"
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
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <MdDashboard className="mt-0.5" size={25} />
                        <span className="font-medium text-gray-800">
                          Dashboard
                        </span>
                      </NavLink>
                      <Separator />
                      <div className="my-1">
                        <button
                          onClick={() => {
                            dispatch(logOut);
                            toast.success("Log out successful");
                            navigate("/");
                          }}
                          className="flex items-center gap-[5px] cursor-pointer rounded-md w-full py-1 px-2 text-[1rem] text-red-500 bg-red-100/50 hover:bg-red-200/50 duration-300"
                        >
                          <BiLogOutCircle size={25} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn btn-outline border-2 hover:border-[#0e6efd] text-[#0E82FD] hover:bg-[#0e6efd] duration-500 hover:text-white rounded-md md:ml-2 font-bold flex gap-1 items-center w-full">
                    <span>Login</span>
                    <BiLogInCircle className="text-base" />
                  </button>
                </Link>
              )}

              {isDrawerOpen && (
                <X
                  className="text-[1.6rem] text-[#363030] cursor-pointer lg:hidden flex ml-4 z-50"
                  onClick={() => setIsDrawerOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
