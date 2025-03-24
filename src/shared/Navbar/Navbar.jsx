import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { MdContacts, MdDashboard, MdMedicalServices } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/auth/authActions";
import { Pill, X } from "lucide-react";
import { IoIosArrowUp } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import "./Navbar.css";
import useRole from "@/hooks/useRole";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [role] = useRole();
  // console.log(user);
  // const dispatch = useDispatch();
  // const menuOpen = useSelector((state) => state.menu.menuOpen);
  // console.log(menuOpen);
  // const dropdownRef = useRef(null);

  // const handleToggleMenu = () => {
  //   dispatch(toggleMenu());
  // };

  // const handleClickOutSide = (e) => {
  //   if (!e.target.closest(".dropdown")) {
  //     dispatch(closeMenu());
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutSide);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutSide);
  //   };
  // }, [dispatch]);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
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
        to="/doctors"
        onClick={() => setIsMenuOpen(false)}
      >
        <FaUserDoctor /> <span className="font-bold">Doctors</span>
      </NavLink>
      <NavLink
        className="flex gap-1 items-center"
        to="/services"
        onClick={() => setIsMenuOpen(false)}
      >
        <MdMedicalServices /> <span className="font-bold">Services</span>
      </NavLink>
      <NavLink
        className="flex items-center"
        to="/pharmacy"
        onClick={() => setIsMenuOpen(false)}
      >
        <Pill className=" h-[15px] font-extrabold  " />{" "}
        <span className="font-bold">Our Pharmacy</span>
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
        <MdContacts /> <span className="font-bold">Contact Us</span>
      </NavLink>
    </>
  );

  return (
    <>
      <div className="navbar border-b border-[#f3f6f9] fixed z-20 shadow-sm lg:px-24 md:px-6 px-4 bg-[#f3f6f9]">
        <div className="navbar-start w-full">
          {/* mobile sidebar */}
          <aside
            ref={menuRef}
            className={` ${
              isMenuOpen
                ? "translate-x-0 opacity-100 z-20"
                : "translate-x-[200px] opacity-0 z-[-1]"
            } lg:hidden bg-[#e2ebee] p-4 text-center absolute top-[68px] md:top-[69px] right-0 w-full md:w-[600px] sm:w-[300px] md:rounded-bl-sm transition-all duration-300`}
          >
            <ul className="gap-[20px] text-[1rem] text-gray-900 flex flex-col">
              {routes}
            </ul>
          </aside>
          <div className="flex items-center">
            <Link to={"/"}>
              <img
                src={
                  "https://i.ibb.co.com/NgjF57xt/care-matrix-logo-Copy-removebg-preview.png"
                }
                className="w-44 h-full rounded-md"
                referrerPolicy="no-referrer"
                alt="Logo of Care Matrix"
              />
            </Link>
          </div>
        </div>

        <div className="navbar-end w-full">
          <div
            className={`hidden lg:flex`}
          >
            <ul className="menu menu-horizontal gap-4 mr-3 px-1">
              {routes}
            </ul>
          </div>

          {user ? (
            <div className="dropdown dropdown-end avatar-online">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar w-12 h-12"
              >
                  <img
                    src={user?.photoURL}
                    alt={user ? user?.displayName : "Guest user"}
                    className="w-full h-full border-4 border-sky-500 rounded-full hover:border-gray-300"
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

                      <p className="text-sm font-medium text-gray-700">
                        {user?.email}
                      </p>
                    </div>

                    <NavLink
                      className="flex gap-1 items-center"
                      to="/dashboard/manage-appointments"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser />{" "}
                      <span className="font-medium text-gray-600">
                        View Appointments
                      </span>
                    </NavLink>

                    <NavLink
                      className="flex gap-1 items-center"
                      to={
                        role === "administrator"
                          ? "/dashboard/administrator-overview"
                          : role === "doctor"
                          ? "/dashboard/doctor-overview"
                          : role === "pharmacist"
                          ? "/dashboard/pharmacist-overview"
                          : role === "patient"
                          ? "/dashboard/patient-overview"
                          : "/dashboard"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <MdDashboard />{" "}
                      <span className="font-medium text-gray-600">
                        Dashboard
                      </span>
                    </NavLink>
                    {/* Logout Button */}
                    <div className="mt-2 border-t border-gray-200 pt-[5px]">
                      <button
                        onClick={() => dispatch(logOut)}
                        className="flex items-center gap-[5px] cursor-pointer rounded-md p-[8px] w-full pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50"
                      >
                        <BiLogOutCircle />
                        Logout
                      </button>
                    </div>
                  </div>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-outline border-2 hover:border-[#0e6efd] text-[#0E82FD] hover:bg-[#0e6efd] duration-500 hover:text-white rounded-md md:ml-2 font-bold flex gap-1 items-center">
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
    </>
  );
};

export default Navbar;
