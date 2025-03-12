import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import {
  MdContacts,
  MdHealthAndSafety,
  MdLocalPharmacy,
  MdMedicalServices,
} from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import CareMatrixLogo from "../../assets/Images/logo-care-matrix.webp";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, toggleMenu } from "@/redux/menuSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  console.log(menuOpen);
  const dropdownRef = useRef(null);
  const user = null;

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleClickOutSide = (e) => {
    if (!e.target.closest(".dropdown")) {
      dispatch(closeMenu());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [dispatch]);

  const routes = (
    <>
      <NavLink className="flex gap-1 items-center" to="/">
        <FaHome /> <span className="font-bold">Home</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/doctors">
        <FaUserDoctor /> <span className="font-bold">Doctors</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/services">
        <MdMedicalServices /> <span className="font-bold">Services</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/contact-us">
        <MdContacts /> <span className="font-bold">Contact Us</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/pharmacy">
        <MdLocalPharmacy /> <span className="font-bold">Pharmacy</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/health-articles">
        <MdHealthAndSafety /> <span className="font-bold">Health Articles</span>
      </NavLink>
    </>
  );

  return (
    <div className="navbar border-b border-[#f3f6f9] fixed z-10 shadow-sm lg:px-24 md:px-6 px-4 bg-[#f3f6f9]">
      <div className="navbar-start">
        <div className="dropdown" ref={dropdownRef}>
          <button
            onClick={handleToggleMenu}
            tabIndex={0}
            role="button"
            className="btn btn-outline border border-sky-200 lg:hidden mr-3 shadow-sm"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            )}
          </button>
          {menuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/90 rounded-box z-[10] mt-3 w-60 p-3 shadow gap-4 mr-3"
            >
              {routes}
            </ul>
          )}
        </div>
        <div className="flex items-center">
          <img
            src={CareMatrixLogo}
            className="w-9 h-9 rounded-md"
            referrerPolicy="no-referrer"
            alt="Logo of Care Matrix"
          />
          <a
            href="/"
            className="lg:text-3xl text-xl p-2 hidden md:flex gap-0 items-center font-bold"
          >
            <span>Care</span> <span className="text-[#535ed1]">Matrix</span>
          </a>
        </div>
      </div>

      <div className="navbar-end w-full">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 mr-3 px-1">{routes}</ul>
        </div>

        {user ? (
          <div className="flex gap-2 items-center">
            <button className="btn btn-outline border-2 px-4 hover:text-white text-rose-500 hover:bg-rose-500 rounded-md font-bold flex gap-1 items-center">
              <BiLogOutCircle />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <>
            <button className="btn btn-outline border-2 text-[#0E82FD] hover:bg-sky-600 hover:text-white rounded-md md:ml-2 font-bold">
              <Link to="/login" className="flex gap-1 items-center">
                <span>Login</span>
                <BiLogInCircle className="text-base" />
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
