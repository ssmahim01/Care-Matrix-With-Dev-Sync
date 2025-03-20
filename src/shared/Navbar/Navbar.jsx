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

const Navbar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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
            } lg:hidden bg-[#e2ebee] p-4 text-center absolute top-[76px] md:top-[79px] right-0 w-full md:w-[600px] sm:w-[300px] md:rounded-bl-sm transition-all duration-300`}
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
                className="w-52 h-full rounded-md"
                referrerPolicy="no-referrer"
                alt="Logo of Care Matrix"
              />
            </Link>
          </div>
        </div>

        <div className="navbar-end w-full">
          <div className={`hidden lg:flex w-[48rem] ${user ? "pl-24" : "pl-44"}`}>
            <ul className="menu menu-horizontal w-full gap-4 mr-3 px-1">{routes}</ul>
          </div>

          {user ? (
            <div className="flex items-center gap-[15px]">
              <div
                className="flex items-center gap-[10px] cursor-pointer relative"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              >
                <div className="relative">
                  <img
                    src={user?.photoURL}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    className="md:w-16 w-12 h-12 rounded-full object-cover"
                  />
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-white"></div>
                </div>

                <h1 className="text-[1rem] font-[400] text-gray-600 sm:block w-[68%] hidden">
                  {user?.displayName}
                </h1>

                {/* Dropdown Menu */}
                <div
                  className={`${
                    accountMenuOpen
                      ? "translate-y-0 opacity-100 z-[1]"
                      : "translate-y-[10px] opacity-0 z-[-1]"
                  } bg-white w-max md:w-72 rounded-md absolute top-[60px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[7px]`}
                >
                  <NavLink
                    className="flex gap-1 items-center"
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser />{" "}
                    <span className="font-medium text-gray-600">
                      View Appointments
                    </span>
                  </NavLink>

                  <NavLink
                    className="flex gap-1 items-center"
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MdDashboard />{" "}
                    <span className="font-medium text-gray-600">Dashboard</span>
                  </NavLink>

                  {/* Logout Button */}
                  <div className="mt-2 border-t border-gray-200 pt-[5px]">
                    <button onClick={() => dispatch(logOut)} className="flex items-center gap-[5px] cursor-pointer rounded-md p-[8px] w-full pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                      <BiLogOutCircle />
                      Logout
                    </button>
                  </div>
                </div>

                {/* Arrow Icon */}
                <IoIosArrowUp
                  className={`${
                    accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                  } transition-all duration-300 text-gray-600 sm:block hidden`}
                />
              </div>
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
