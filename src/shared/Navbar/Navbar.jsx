import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { MdContacts, MdMedicalServices } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import CareMatrixLogo from "../../assets/Images/logo-care-matrix.webp";
import "./Navbar.css";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = null;
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
      <NavLink className="flex gap-1 items-center" to="/" onClick={() => setIsMenuOpen(false)}>
        <FaHome /> <span className="font-bold">Home</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/doctors" onClick={() => setIsMenuOpen(false)}>
        <FaUserDoctor /> <span className="font-bold">Doctors</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/services" onClick={() => setIsMenuOpen(false)}>
        <MdMedicalServices /> <span className="font-bold">Services</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/about-us" onClick={() => setIsMenuOpen(false)}>
        <FaInfoCircle /> <span className="font-bold">About Us</span>
      </NavLink>
      <NavLink className="flex gap-1 items-center" to="/contact-us" onClick={() => setIsMenuOpen(false)}>
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
            className={` ${isMenuOpen
              ? "translate-x-0 opacity-100 z-20"
              : "translate-x-[200px] opacity-0 z-[-1]"
              } lg:hidden bg-[#e2ebee] p-4 text-center absolute top-[60px] md:top-[64px] right-0 w-full md:w-[600px] sm:w-[300px] md:rounded-bl-sm transition-all duration-300`}
          >
            <ul className="gap-[20px] text-[1rem] text-gray-900 flex flex-col">
              {routes}
            </ul>
          </aside>
          <div className="flex items-center">
            <img
              src={CareMatrixLogo}
              className="w-9 h-9 rounded-md"
              referrerPolicy="no-referrer"
              alt="Logo of Care Matrix"
            />
            <a
              href="/"
              className="lg:text-3xl text-2xl p-2 hidden md:flex gap-0 items-center font-bold"
            >
              <span>Care</span> <span className="text-[#535ed1]">Matrix</span>
            </a>
          </div>
        </div>

        <div className="navbar-end w-full ">
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
          {!isMenuOpen ? (
            <CiMenuFries
            className="text-[1.6rem] text-[#363030] cursor-pointer lg:hidden flex ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          ) : (
            <X className="ml-3 text-[#363030]"
            onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;