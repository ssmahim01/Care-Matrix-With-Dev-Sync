import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaHome, FaInfoCircle, FaMapMarkerAlt, FaPager } from "react-icons/fa";

import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdMedicalServices,
} from "react-icons/md";

import useRole from "@/hooks/useRole";
import { logOut, useAuthLoading } from "@/redux/auth/authActions";
import { Award, BedIcon, Contact, Moon, Siren, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const loading = useAuthLoading();
  const [role, isLoading] = useRole();

  const [showImage, setShowImage] = useState(true);

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

  // All comment codes are stored in -->
  // /UnusedCodes/NavbarCodes.js

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const routes = (
    <>
      <NavLink
        className="flex gap-1 items-center"
        to="/"
        onClick={() => setIsMenuOpen(false)}
      >
        <FaHome /> <span className="font-bold">Home</span>
      </NavLink>
      <NavLink
        className="flex gap-1 items-center"
        to="/about-us"
        onClick={() => setIsMenuOpen(false)}
      >
        <FaInfoCircle /> <span className="font-bold">About Us</span>
      </NavLink>
      <NavLink
        className="flex gap-1 items-center"
        to="/contact-us"
        onClick={() => setIsMenuOpen(false)}
      >
        <Contact size={20} /> <span className="font-bold">Contact Us</span>
      </NavLink>
      <NavLink
        className="flex gap-1 items-center"
        to="/pharmacy"
        onClick={() => setIsMenuOpen(false)}
      >
        <GiMedicines size={20} />{" "}
        <span className="font-bold">Our Pharmacy</span>
      </NavLink>
    </>
  );

  return (
    <>
      <div className="fixed z-20 w-full bg-[#f3f6f9] shadow-sm border-b border-[#f3f6f9]">
        {location.pathname === "/" && (
          <div
            className={`top-0 left-1/2 z-50 transition-all duration-300 w-full ${
              showImage
                ? "opacity-100 translate-y-0 pointer-events-auto h-auto"
                : "opacity-0 -translate-y-full pointer-events-none h-0 overflow-hidden"
            }`}
          >
            <img
              src="https://zenui.net/palestine-banner.svg"
              alt="Free Palestine"
              className="w-full"
            />
          </div>
        )}
        <div className="max-w-[1700px] mx-auto w-11/12">
          <div className="navbar p-0">
            <div className="navbar-start w-fit">
              {/* mobile sidebar */}
              <aside
                className={` ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100 z-20"
                    : "translate-x-[200px] opacity-0 z-[-1]"
                } ${
                  showImage &&
                  location.pathname === "/" &&
                  "top-[84px] md:top-[101px] right-0"
                } top-[61px] md:top-[63px] right-0 lg:hidden bg-[#e2ebee] p-4 absolute w-full md:w-[600px] sm:w-[300px] md:rounded-bl-sm transition-all duration-300`}
              >
                <ul className="gap-[20px] text-[1rem] text-gray-900 flex flex-col">
                  {routes}

                  <div className="md:hidden block">
                    <Link to="/emergency">
                      <Button className="mr-2 border border-red-500 bg-red-100 hover:bg-red-200 text-red-500 cursor-pointer">
                        <span>Emergency</span>
                        <Siren className="text-base" />
                      </Button>{" "}
                    </Link>
                  </div>
                </ul>
              </aside>
              <div className="md:flex hidden items-center">
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

              <div className="md:hidden flex items-center">
                <Link to={"/"}>
                  <img
                    src={"https://i.ibb.co.com/m5ctR6v8/collapse-logo.png"}
                    className="w-12 h-12 rounded-md"
                    referrerPolicy="no-referrer"
                    alt="Logo of Care Matrix"
                  />
                </Link>
              </div>
            </div>
            <div className="navbar-end  w-full">
              <>
                <ul className="flex items-center gap-3 text-[#1b1b1b] md:mr-3 mr-1">
                  <div className="lg:flex gap-3 items-center hidden">
                    {routes}
                  </div>
                  <li
                    ref={menuRef}
                    className="transition-all duration-500 cursor-pointer hover:text-[#3B9DF8] capitalize flex items-center gap-[3px] relative"
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
                      <article className="p-6 bg-[#f3f6f9] rounded-b-lg md:w-[550px] w-[435px] absolute top-[38px] md:right-[-125px] -right-40 z-30 transition-all duration-300 border-t rounded-t-xl border-border">
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

              <div className="md:block hidden">
                <Link to="/emergency">
                  <Button className="mr-2 bg-red-100 hover:bg-red-200 tracking-tight text-red-500 cursor-pointer">
                    <span>Emergency</span>
                    <Siren className="text-base" />
                  </Button>{" "}
                </Link>
              </div>

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
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <MdDashboard className="mt-0.5" size={25} />{" "}
                        <span className="font-medium text-gray-800">
                          Dashboard
                        </span>
                      </NavLink>
                      <Separator />
                      {/* Logout Button */}
                      <div className="my-1">
                        <button
                          onClick={() => {
                            dispatch(logOut);
                            toast.success("Log out successful");
                            navigate("/");
                          }}
                          className="flex items-center gap-[5px] cursor-pointer rounded-md w-full py-1 px-2 text-[1rem] text-red-500 bg-red-50 hover:bg-red-100 duration-300"
                        >
                          <BiLogOutCircle size={25} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </ul>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-outline border-2 hover:border-[#0e6efd] text-[#0E82FD] hover:bg-[#0e6efd] duration-500 hover:text-white rounded-md md:ml-2 font-bold flex gap-1 items-center w-full">
                      <span>Login</span>
                      <BiLogInCircle className="text-base" />
                    </button>{" "}
                  </Link>
                </>
              )}

              {!isMenuOpen ? (
                <CiMenuFries
                  className="text-[1.6rem] text-[#363030] cursor-pointer lg:hidden flex ml-4"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              ) : (
                <X
                  className="ml-3 text-[#363030]"
                  onClick={() => setIsMenuOpen(false)}
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
